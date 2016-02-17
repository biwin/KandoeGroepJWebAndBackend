/// <reference path="../../../typings/mongodb/mongodb.d.ts" />

import {MongoClient} from "mongodb";
import {DaoConstants} from "./daoConstants";
import {User} from "../model/user";
import {MongoCallback} from "mongodb";
import {Db} from "mongodb";
import {CursorResult} from "mongodb";

export class UserDao {

    private client: MongoClient;

    constructor() {
        this.client = new MongoClient();
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
            db.collection('users').deleteOne({'_name': name}, (err: any, results: any) => {
                callback();
            });
        });
    }
}