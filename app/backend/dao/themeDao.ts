/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
import {MongoClient} from "mongodb";
import {DaoConstants} from "./daoConstants";
import {User} from "../model/user";
import {MongoCallback} from "mongodb";
import {Db} from "mongodb";
import {CursorResult} from "mongodb";
import {Organisation} from "../model/organisation";
import {Theme} from "../model/theme";
import {Card} from "../model/card";
import {MongoError} from "mongodb";
import {InsertOneWriteOpResult} from "mongodb";

export class ThemeDao {

    private client: MongoClient;

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

    readTheme(name: string, callback: (t: Theme) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('themes').find({'_name': name}).limit(1).next().then((cursor:CursorResult) => {
                db.close();
                callback(cursor);
            });
        });
    }

    createCard(card:Card, callback:(c:Card) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('cards').insertOne(card, (err:MongoError, result:InsertOneWriteOpResult) => {
                card._id = result.insertedId.toString();
                db.close();
                callback(card);
            });
        });
    }

    readAllThemes(callback:(t:Theme[]) => any):void {
        this.client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('themes').find({}).toArray((err:MongoError, docs:Theme[]) => {
                callback(docs);
            });
        });
    }

    readCards(themeId:string, callback:(c:Card[]) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('cards').find({'_themeId': themeId}).toArray((err:MongoError, docs:Card[]) => {
                callback(docs);
            });
        });
    }
}