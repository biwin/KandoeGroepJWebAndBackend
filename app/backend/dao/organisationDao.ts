/// <reference path="../../../typings/mongodb/mongodb.d.ts" />

import {MongoClient, Db, MongoError, CursorResult} from "mongodb";

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

                organisation._id = result.insertedId;

                db.close();

                callback(organisation);
            });
        });
    }

    readOrganisationByName(organisationName: string, callback: (organisation: Organisation) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').find({'_name': organisationName}).limit(1).next().then((cursor: CursorResult) => {
                db.close();

                callback(cursor);
            });
        });
    }
}