/// <reference path="../../../typings/mongodb/mongodb.d.ts" />

import {MongoClient, Db, MongoError, CursorResult, ObjectID} from "mongodb";

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

                group._id = result.insertedId.toString();

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

    getGroupById(groupId: string, callback: (group: Group) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('groups').find({'_id': new ObjectID(groupId)}).limit(1).next().then((cursor: CursorResult) => {
                db.close();

                callback(cursor);
            });
        });
    }

    deleteGroupById(groupId: string, callback: (deleted: boolean) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('groups').deleteOne({'_id': groupId}, (err: MongoError, result) => {
                db.close();

                callback(result.deletedCount == 1);
            });
        });
    }

    getGroupsOfOrganisationById(organisationId: string, callback:(groups: Group[]) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('groups').find({'_organisationId': organisationId}).toArray((err: MongoError, docs: Group[]) => {
                callback(docs);
            });
        });
    }

    getGroupsOfUserById(userId:string,callback:(groups: Group[]) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('groups').find({'_memberIds': { '$in': [userId]}}).toArray((err: MongoError, docs: Group[]) => {
                callback(docs);
            });
        });
    }

    getUserIdsInGroup(groupId:string, callback:(users:string[]) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db:Db) => {
            db.collection('groups').find({'_id': new ObjectID(groupId)}).project({'_memberIds': 1, '_id': 0}).limit(1).next((err:MongoError, doc: Group) => {
                callback(doc._memberIds);
            });
        });
    }
}