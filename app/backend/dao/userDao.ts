/// <reference path="../../../typings/mongodb/mongodb.d.ts" />

import {MongoClient} from "mongodb";
import {DaoConstants} from "./daoConstants";
import {User} from "../model/user";
import {MongoCallback} from "mongodb";
import {Db} from "mongodb";
import {CursorResult} from "mongodb";
import {Organisation} from "../model/organisation";

export class UserDao {

    private client: MongoClient;

    constructor() {
        this.client = new MongoClient();
    }

    clearDatabase(callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            var completed: number = 0;
            db.collection('users').deleteMany({}, () => {
                if (++completed == 2) callback();
            });
            db.collection('organisations').deleteMany({}, () => {
                if (++completed == 2) callback();
            });
        });
    }

    readUser(name: string, callback: (u: User) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL).then((db: Db) => {
            return db.collection('users').find({'_name': name}).limit(1).next();
        }).then((cursor: CursorResult) => {
            callback(cursor);
        });
    }

    createUser(u: User, callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('users').insertOne(u).then(() => {
                db.close();
                callback();
            });
        });
    }

    deleteUser(name: string, callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('users').deleteOne({'_name': name}, () => {
                callback();
            });
        });
    }

    createOrganisation(o: Organisation, callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').insertOne(o).then(() => {
                db.close();
                callback();
            });
        });
    }

    readOrganisation(name: string, callback: (o: Organisation) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').find({'_name': name}).limit(1).next().then((cursor: CursorResult) => {
                callback(cursor);
            })
        });
    }

    addToOrganisation(organisationName: string, userName: string, callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').updateOne({'_name': organisationName}, {$push: {'_organisators': userName}}).then(() => {
                db.close();
                callback();
            });
        });
    }
}