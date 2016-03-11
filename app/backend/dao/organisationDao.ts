/// <reference path="../../../typings/mongodb/mongodb.d.ts" />

import {MongoClient, Db, MongoError, ObjectID, CursorResult} from "mongodb";

import {DaoConstants} from "./daoConstants";

import {Organisation} from "../model/organisation";

export class OrganisationDao {
    private _client: MongoClient;

    constructor() {
        this._client = new MongoClient();
    }

    createOrganisation(organisation: Organisation, callback: (newOrganisation: Organisation) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').insertOne(organisation, (error: MongoError, result) => {
                if (error != null) {
                    console.log(error.message);
                }

                organisation._id = result.insertedId.toString();

                db.close();

                callback(organisation);
            });
        });
    }

    getOrganisationByName(organisationName: string, callback: (organisation: Organisation) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').find({'_name': organisationName}).limit(1).next().then((cursor: CursorResult) => {
                db.close();

                callback(cursor);
            });
        });
    }

    getOrganisationById(organisationId: string, callback: (organisation: Organisation) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').find({'_id': new ObjectID(organisationId)}).limit(1).next().then((cursor: CursorResult) => {
                db.close();

                callback(cursor);
            });
        });
    }

    deleteOrganisationById(organisationId: string, callback: (deleted: boolean) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').deleteOne({'_id': new ObjectID(organisationId)}, (err: MongoError, result) => {
                db.close();

                callback(result.deletedCount == 1);
            });
        });
    }

    addGroupIdToOrganisationById(groupId: string, organisationId: string, callback: (added: boolean) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').updateOne({'_id': new ObjectID(organisationId)}, {$push: {'_groupIds': groupId}}, (error: MongoError, result) => {
                db.close();

                callback(result.modifiedCount == 1);
            })
        })
    }

    getAllOrganisationsOfUserById(userId: string, callback: (organisations: Organisation[]) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').find({'$or': [{'_organisatorIds': {'$in': [userId]}}, {'_memberIds': {'$in': [userId]}}]}).toArray((err: MongoError, docs: Organisation[]) => {
                db.close();

                callback(docs);
            });
        });
    }
}