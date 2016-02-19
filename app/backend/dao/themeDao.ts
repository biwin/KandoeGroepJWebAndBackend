/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
import {MongoClient} from "mongodb";
import {DaoConstants} from "./daoConstants";
<<<<<<< HEAD
import {User} from "../model/user";
import {MongoCallback} from "mongodb";
=======
>>>>>>> e405ab9b5b66cf6cab3f1576b13adddc8e3de3e5
import {Db} from "mongodb";
import {CursorResult} from "mongodb";
import {Organisation} from "../model/organisation";
import {Theme} from "../model/theme";

export class ThemeDao {

    private client:MongoClient;

    constructor() {
        this.client = new MongoClient();
    }

    clearDatabase(callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('themes').deleteMany({}, () => {
                callback();
            });
        });
    }

    createTheme(t: Theme, callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('themes').insertOne(t).then(() => {
                db.close();
                callback();
            });
        });
    }

<<<<<<< HEAD
    readTheme(name: string, callback: (t: Theme) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('themes').find({'_name': name}).limit(1).next().then((cursor:CursorResult) => {
                db.close();
                callback(cursor);
            })
=======
    clearDatabase(callback:()=>any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('themes').deleteMany({}, () => {
                callback();
            });
>>>>>>> e405ab9b5b66cf6cab3f1576b13adddc8e3de3e5
        });
    }
}