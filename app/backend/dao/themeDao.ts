/// <reference path="../../../typings/mongodb/mongodb.d.ts" />

import {MongoClient, Db, MongoError, CursorResult, InsertOneWriteOpResult, ObjectID, DeleteWriteOpResultObject, UpdateWriteOpResult} from "mongodb";
import {DaoConstants} from "./daoConstants";
import {Theme} from "../model/theme";
import {Card} from "../model/card";

export class ThemeDao {
    private _client: MongoClient;

    constructor() {
        this._client = new MongoClient();
    }

    clearDatabase(callback: () => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('themes').deleteMany({}, () => {
                callback();
            });
        });
    }

    createTheme(t: Theme, callback: (theme:Theme) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('themes').insertOne(t, (err:MongoError, result:InsertOneWriteOpResult) => {
                t._id = result.insertedId.toString();
                db.close();
                callback(t);
            });
        });
    }

    readTheme(id: string, callback: (t: Theme) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('themes').find({'_id': new ObjectID(id)}).limit(1).next().then((cursor:CursorResult) => {
                db.close();
                callback(cursor);
            });
        });
    }

    deleteThemeById(themeId: string, callback: (deleted: boolean) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('themes').deleteOne({'_id': new ObjectID(themeId)}, (err: MongoError, result:DeleteWriteOpResultObject) => {
                db.close();
                callback(result.deletedCount == 1);
            });
        });
    }

    createCard(card:Card, callback:(c:Card) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('cards').insertOne(card, (err:MongoError, result:InsertOneWriteOpResult) => {
                card._id = result.insertedId.toString();
                db.close();
                callback(card);
            });
        });
    }

    readAllThemes(callback:(t:Theme[]) => any):void {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('themes').find({}).toArray((err:MongoError, docs:Theme[]) => {
                callback(docs);
            });
        });
    }

    readCards(themeId:string, callback:(c:Card[]) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('cards').find({'_themeId': themeId}).toArray((err:MongoError, docs:Card[]) => {
                callback(docs);
            });
        });
    }

    clearThemeIdOfCard(themeId:string, cardId:string, callback:(b:boolean) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('cards').updateOne({'_themeId': themeId, '_id': new ObjectID(cardId)}, {'_themeId': null}, (err:MongoError, res:UpdateWriteOpResult) => {
                callback(res.modifiedCount == 1);
            });
        });
    }

    removeCardsFromTheme(themeId:string, callback:(amount:number) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('cards').deleteMany({'_themeId': themeId}, (err:MongoError, res:DeleteWriteOpResultObject) => {
                callback(res.deletedCount);
            });
        });
    }
}