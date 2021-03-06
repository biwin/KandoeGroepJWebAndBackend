/// <reference path="../../../typings/mongodb/mongodb.d.ts" />

import {MongoClient, Db, MongoError, ObjectID, CursorResult, InsertOneWriteOpResult, UpdateWriteOpResult, DeleteWriteOpResultObject} from "mongodb";

import {DaoConstants} from "./daoConstants";

import {Theme} from "../model/theme";
import {Card} from "../model/card";

/**
 * Class that is responsible for the connection with the dbb for themes and cards
 */
export class ThemeDao {
    private _client: MongoClient;

    constructor() {
        this._client = new MongoClient();
    }

    clearDatabase(callback: () => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('themes').deleteMany({}, (err: MongoError, res: DeleteWriteOpResultObject) => {
                callback();
            });
        });
    }

    createTheme(t: Theme, callback: (theme: Theme) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('themes').insertOne(t, (err: MongoError, result: InsertOneWriteOpResult) => {
                t._id = result.insertedId.toString();

                db.close();

                callback(t);
            });
        });
    }

    readTheme(id: string, callback: (t: Theme) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('themes').find({'_id': new ObjectID(id)}).limit(1).next((err: MongoError, cursor: CursorResult) => {
                db.close();

                callback(cursor);
            });
        });
    }

    deleteThemeById(themeId: string, callback: (deleted: boolean) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('themes').deleteOne({'_id': new ObjectID(themeId)}, (err: MongoError, result: DeleteWriteOpResultObject) => {
                db.close();

                callback(result.deletedCount == 1);
            });
        });
    }

    createCard(card: Card, callback: (c: Card) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('cards').insertOne(card, (err: MongoError, result: InsertOneWriteOpResult) => {
                card._id = result.insertedId.toString();

                db.close();

                callback(card);
            });
        });
    }

    readAllThemes(userId: string, callback: (t: Theme[]) => any): void {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('themes').find({'_organisatorIds': {'$in': [userId]}}).toArray((err: MongoError, docs: Theme[]) => {
                callback(docs);
            });
        });
    }

    readAllThemesByOrganisationId(organisationId: string, callback:(themes: Theme[]) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('themes').find({'_organisationId': organisationId}).toArray((err: MongoError, docs: Theme[]) => {
                callback(docs);
            });
        });
    }

    readCards(themeId:string, callback:(c:Card[]) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('cards').find({'_themeId': themeId}).toArray((err: MongoError, docs: Card[]) => {
                var nDocs: Card[] = docs.map(d => {
                    d._id = d._id.toString();

                    return d;
                });
                callback(nDocs);
            });
        });
    }

    clearThemeIdOfCard(themeId: string, cardId:string, callback:  (b: boolean) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('cards').updateOne({'_themeId': themeId, '_id': new ObjectID(cardId)}, {$set: {'_themeId': null}}, (err: MongoError, res: UpdateWriteOpResult) => {
                callback(res.modifiedCount == 1);
            });
        });
    }

    removeCardsFromTheme(themeId: string, callback: (amount: number) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('cards').deleteMany({'_themeId': themeId}, (err: MongoError, res: DeleteWriteOpResultObject) => {
                callback(res.deletedCount);
            });
        });
    }

    addSubThemeToTheme(parentThemeId: string, childId: string, callback:(b: boolean) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('themes').updateOne({'_id': new ObjectID(parentThemeId)}, {
                $push: {'_subThemes': childId}
            }, (err:MongoError, result) => {
                db.close();

                callback(result.modifiedCount == 1);
            });
        });
    }

    readCardsByIds(cardIds: string[], callback: (cs: Card[]) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('cards').find({
                '_id': {'$in': cardIds.map((i: string) => new ObjectID(i))}
            }).toArray((err: MongoError, docs :Card[]) => {
                callback(docs);
            });
        });
    }

    getThemesOfOrganisationById(organisationId: string, callback:(themes: Theme[]) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('themes').find({'_organisationId': organisationId}).toArray((err: MongoError, docs: Theme[]) => {
                callback(docs);
            });
        });
    }

    removeAllThemesFromOrganisationById(organisationId: string, callback: (removed: boolean) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('themes').updateMany({'_organisationId': organisationId}, {$set: {'_organisationId': null}}, (error: MongoError, result: UpdateWriteOpResult) => {
                db.close();

                callback(result.modifiedCount == result.matchedCount);
            });
        });
    }

    deleteOrganisationFromThemeById(themeId: string, callback: (deleted: boolean) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('themes').updateOne({'_id': new ObjectID(themeId)}, {$set: {'_organisationId': null}}, (error: MongoError, result: UpdateWriteOpResult) => {
                db.close();

                callback(result.modifiedCount == 1);
            });
        });
    }
}