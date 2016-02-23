/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
import {MongoClient} from "mongodb";
import {CircleSession} from "../model/circleSession";
import {DaoConstants} from "./daoConstants";
import {Db} from "mongodb";
import {CursorResult} from "mongodb";
import {MongoError} from "mongodb";
import {InsertOneWriteOpResult} from "mongodb";

export class CircleSessionDao {
    private _client:MongoClient;

    constructor() {
        this._client = new MongoClient();
    }

    circleSessionExists(circleSession:CircleSession, callback:(exists:boolean) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('circlesessions').find({
                '_groupId': circleSession._groupId,
                '_themeId': circleSession._themeId,
                '_startDate': circleSession._startDate
            }).limit(1).next((cursor:CursorResult) => {
                db.close();
                callback(cursor != null);
            });
        });
    }

    createCircleSession(circleSession:CircleSession, callback:(circleSession:CircleSession) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('circlesessions').insertOne(circleSession, (err:MongoError, res:InsertOneWriteOpResult) => {
                circleSession._id = res.insertedId.toString();
                db.close();
                callback(circleSession);
            });
        });
    }
}