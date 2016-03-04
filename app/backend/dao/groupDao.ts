/// <reference path="../../../typings/mongodb/mongodb.d.ts" />

import {MongoClient, Db, MongoError, CursorResult} from "mongodb";

import {DaoConstants} from "./daoConstants";

import {Group} from "../model/group";

export class GroupDao {
    private _client: MongoClient;

    constructor() {
        this._client = new MongoClient();
    }

    createGroup(group: Group, callback: (newGroup: Group) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('groups').insertOne(group, (error: MongoError, result) => {
                if (error != null) {
                    console.log(error.message);
                }

                group._id = result.insertedId;

                db.close();

                callback(group);
            });
        });
    }

    getGroupByNameAndOrganisationId(groupName: string, organisationId: string, callback: (group: Group) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('groups').find({'_name': groupName,'_organisationId': organisationId}).limit(1).next().then((cursor: CursorResult) => {
                db.close();

                callback(cursor);
            });
        });
    }
}