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

    read(name: string, callback: (u: User) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL).then((db: Db) => {
            return db.collection('users').find({'_name': name}).limit(1).next();
        }).then((cursor: CursorResult) => {
            callback(cursor);
        });
    }

    create(u: User, callback: () => any) {
        console.log("hello");
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            console.log("hi");
            db.collection('users').insertOne(u).then(() => {
                console.log("test");
                db.close();
                callback();
            });
        });
    }
}