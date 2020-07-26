import { ApexUser, Status } from "../model/user";
import { usersPath, usersPath2 } from "./firebase-config";
const functions = require("firebase-functions");
import { Request, Response } from "express";

import * as admin from 'firebase-admin'
import { handleError } from "./controller";


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

        await admin.database().ref(usersPath + uid + "/displayed").update(toUpdate)
        return res.status(201).send({ uid })
    } catch (err) {
        return handleError(res, err)
    }
}

export async function getAllApexUser(): Promise<ApexUser[]> {
    return admin.database().ref(usersPath2).once('value').then(snapshot => mapAllToApexUsers(snapshot.val()));
}

export async function getApexUser(uid: string): Promise<ApexUser> {
    return admin.database().ref(usersPath + uid + "/displayed").once("value").then(snap => mapToApexUser(snap.val()))
        .catch(e => {
            functions.logger.log("failed  getApexUser", e);
            return new Promise<ApexUser>((i => null));
        }

        )
}

function mapAllToApexUsers(snapshot: any): ApexUser[] {
    functions.logger.log("mapAllToApexUsers", snapshot);

    const returns: ApexUser[] = Object.keys(snapshot).map(item => mapToApexUser(snapshot[item].displayed))

    return returns;
}

function mapToApexUser(snapShot: any): ApexUser {
    const apexUser = {
        uid: snapShot.uid,
        status: Status.PENDING,
        displayedName: snapShot.displayedName
    }
    return apexUser;
}

export async function saveApexUser(displayed: ApexUser) {
    admin.database().ref(usersPath + displayed.uid).set({
        displayed
    }).catch(error => error);

}