/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
import {MongoClient} from "mongodb";
import {Theme} from "../model/theme";
import {DaoConstants} from "./daoConstants";
import {Db} from "mongodb";
import {CursorResult} from "mongodb";

export class ThemeDao {
    private client:MongoClient;

    constructor() {
        this.client = new MongoClient();
    }

    read(name:string, callback:(t:Theme) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL).then((db:Db) => {
            return db.collection('themes').find({'_name': name}).limit(1).next();
        }).then((cursor:CursorResult) => {
            callback(cursor);
        });
    }

    create(t:Theme, callback?:()=>any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('themes').insertOne(t).then(() => {
                db.close();
                callback();
            });
        });
    }

    clearDatabase(callback:()=>any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('themes').deleteMany({}, () => {
                callback();
            });
        });
    }
}