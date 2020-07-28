import { Request, Response } from "express";
import * as admin from 'firebase-admin'
import { GoogleUser, ApexUser, ApiUser } from "../model/user";
import { getAllApexUser, getApexUser } from "./apex-user";
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


export async function all(req: Request, res: Response) {
    try {
        const listGoogleUsers = await admin.auth().listUsers();
        const users = listGoogleUsers.users.map(mapUser)
        functions.logger.log(" all", users);

        const listApexUsers = await getAllApexUser()
        functions.logger.log(" all listApexUsers", listApexUsers);

        //  return res.status(200).send(users)
        return res.status(200).send({ users: getApiUsers(users, listApexUsers) })
    } catch (err) {
        functions.logger.log("failed  all", err);
        return handleError(res, err)
    }
}

function getApiUsers(googleUsers: GoogleUser[], apexUsers: ApexUser[]): ApiUser[] {
    const returns: ApiUser[] = [];
    googleUsers.forEach(item => {
        apexUsers.forEach(apexUser => {
            if (item.uid === apexUser.uid) {
                returns.push({ googleUser: item, apexUser: apexUser });
            }
        })
    });
    return returns;
}

function mapUser(user: admin.auth.UserRecord): GoogleUser {
    const customClaims = (user.customClaims || { role: '' }) as { role?: string }
    const role = customClaims.role ? customClaims.role : ''
    return {
        uid: user.uid,
        email: user.email || '',
        role: role,
        photoURL: user.photoURL,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime
    }

}

export async function get(req: Request, res: Response) {
    try {
        const { id } = req.params
        const user = await admin.auth().getUser(id)
        const googleUser = mapUser(user);
        const apexUser = await getApexUser(id);
        return res.status(200).send({ user: { googleUser: googleUser, apexUser: apexUser } })
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

        return res.status(204).send({ uid: id })
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

export function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}
