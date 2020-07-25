import { Request, Response } from "express";
import * as admin from 'firebase-admin'
import { ApexUser, Status } from "../model/user";

const path = `/users/`;
const functions = require("firebase-functions");

export async function create(req: Request, res: Response) {
    try {
        const { displayName, password, email, role } = req.body

        if (!displayName || !password || !email || !role) {
            return res.status(400).send({ message: 'Missing fields' })
        }

        const { uid } = await admin.auth().createUser({
            displayName,
            password,
            email
        })
        await admin.auth().setCustomUserClaims(uid, { role })

        return res.status(201).send({ uid })
    } catch (err) {
        return handleError(res, err)
    }
}

export async function createApexUser(req: Request, res: Response) {
    try {
        const { uid, displayedName } = req.body;

        if (!uid) {
            return res.status(400).send({ message: 'Missing fields' })
        }

        await admin.auth().setCustomUserClaims(uid, { role: 'user' })
        await saveApexUser({ uid: uid, status: Status.PENDING, displayedName: displayedName })

        return res.status(201).send({ uid })
    } catch (err) {
        return handleError(res, err)
    }
}

export async function updateApexUser(req: Request, res: Response) {
    try {
        const { uid, displayedName, status } = req.body;

        if (!uid && !(displayedName || status)) {
            return res.status(400).send({ message: 'Missing fields' })
        }

        const toUpdate: any = {}
        if (displayedName) {
            toUpdate.displayedName = displayedName;
        }
        if (status) {
            toUpdate.status = status;
        }

        await admin.database().ref(path + uid + "/displayed").update(toUpdate)
        return res.status(201).send({ uid })
    } catch (err) {
        return handleError(res, err)
    }
}

async function saveApexUser(displayed: ApexUser) {
    admin.database().ref(path + displayed.uid).set({
        displayed
    }).catch(error => error);

}

export async function all(req: Request, res: Response) {
    try {
        const listUsers = await admin.auth().listUsers()
        const users = listUsers.users.map(mapUser)
        return res.status(200).send({ users })
    } catch (err) {
        return handleError(res, err)
    }
}

function mapUser(user: admin.auth.UserRecord) {
    const customClaims = (user.customClaims || { role: '' }) as { role?: string }
    const role = customClaims.role ? customClaims.role : ''
    const googleUser = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        role,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime
    }

    admin.database().ref(path + user.uid ).on("value", function (nameSnapshot) {
        functions.logger.log("fetch user :" + user.uid  + JSON.stringify(nameSnapshot.val()), nameSnapshot.val());
        return { googleUser: googleUser, apexUser: nameSnapshot.val() };

    }, function (errorObject) {
        functions.logger.log("error fetch user :" + user.uid, errorObject);
        return { googleUser, apexUser: null };

    });

}


export async function get(req: Request, res: Response) {
    try {
        const { id } = req.params
        const user = await admin.auth().getUser(id)
        return res.status(200).send({ user: mapUser(user) })
    } catch (err) {
        return handleError(res, err)
    }
}

export async function patch(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { displayName, password, email, role } = req.body

        if (!id || !displayName || !password || !email || !role) {
            return res.status(400).send({ message: 'Missing fields' })
        }

        await admin.auth().updateUser(id, { displayName, password, email })
        await admin.auth().setCustomUserClaims(id, { role })
        const user = await admin.auth().getUser(id)

        return res.status(204).send({ user: mapUser(user) })
    } catch (err) {
        return handleError(res, err)
    }
}

export async function remove(req: Request, res: Response) {
    try {
        const { id } = req.params
        await admin.auth().deleteUser(id)
        return res.status(204).send({})
    } catch (err) {
        return handleError(res, err)
    }
}

function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}
