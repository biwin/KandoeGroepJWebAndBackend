/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
import {MongoClient} from "mongodb";
import {CircleSession} from "../model/circleSession";
import {DaoConstants} from "./daoConstants";
import {Db} from "mongodb";
import {CursorResult} from "mongodb";
import {MongoError} from "mongodb";
import {InsertOneWriteOpResult} from "mongodb";
import {ObjectID} from "mongodb";
import {CardPosition} from "../model/cardPosition";
import {UpdateWriteOpResult} from "mongodb";
import {DeleteWriteOpResultObject} from "mongodb";
import {Card} from "../model/card";
import {InsertWriteOpResult} from "mongodb";


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
            }).limit(1).next((error:MongoError, cursor:CursorResult) => {
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

    readAllCircleSessions(callback:(c:CircleSession[]) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('circlesessions').find({}).toArray((err:MongoError, docs:CircleSession[]) => {
                callback(docs);
            });
        });
    }

    readCircleSession(id:string, callback:(c:CircleSession) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('circlesessions').find({'_id': new ObjectID(id)}).limit(1).next((err:MongoError, cursor:CursorResult) => {
                db.close();
                callback(cursor);
            });
        });
    }

    cardPositionExists(sessionId:string, cardId:string, callback:(exists:boolean, position:number) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('cardpositions').find({
                '_sessionId': sessionId,
                '_cardId': cardId
            }).limit(1).next((err:MongoError, cursor:CursorResult) => {
                var cp:CardPosition = cursor;
                callback(cp !== null, cp == null ? -1 : cp._position);
            });
        });
    }

    //TODO add previous userId to history
    updateCardPosition(sessionId:string, cardId:string, userId:string, position:number, callback:(cp:CardPosition) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('cardpositions').updateOne({
                '_sessionId': sessionId,
                '_cardId': cardId
            }, {
                '$set': {
                    '_lastChanged': new Date(),
                    '_userId': userId,
                    '_position': position
                }
            }, null, (err:MongoError, result:UpdateWriteOpResult) => {
                if (result.modifiedCount == 0) {
                    callback(null);
                } else {
                    this.getCardPosition(sessionId, cardId, callback);
                }
            });
        });
    }

    createCardPosition(sessionId:string, cardId:string, userId:string, callback:(cp:CardPosition) => any) {
        var cp:CardPosition = new CardPosition(sessionId, cardId, userId, [], 0, new Date());
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('cardpositions').insertOne(cp, null, (err:MongoError, result:InsertOneWriteOpResult) => {
                cp._id = result.insertedId.toString();
                db.close();
                callback(cp);
            });
        });
    }

    getCardPosition(sessionId:string, cardId:string, callback:(cp:CardPosition) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('cardpositions').find({
                '_sessionId': sessionId,
                '_cardId': cardId
            }).limit(1).next((err:MongoError, cursor:CursorResult) => {
                callback(cursor);
            });
        });
    }

    getCircleSessionsOfUserById(userId:string, callback:(circleSessions:CircleSession[]) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('circlesessions').find({'_userIds': {'$in': [userId]}}).toArray((err:MongoError, docs:CircleSession[])=> {
                callback(docs);
            });
        })
    }

    deleteCircleSessionById(circleSessionId:string, callback:(deleted:boolean)=> any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('circlesessions').deleteOne({'_id': new ObjectID(circleSessionId)}, (err:MongoError, result:DeleteWriteOpResultObject)=> {
                db.close();
                callback(result.deletedCount == 1);
            });
        });
    }

    getCardPositions(circleSessionId:string, cardIds:string[], callback:(cardPositions:CardPosition[]) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('cardpositions').find({
                '_sessionId': circleSessionId,
                '_cardId': {'$in': cardIds}
            }).toArray((err:MongoError, docs:CardPosition[]) => {
                db.close();
                callback(docs);
            });
        });
    }

    createCardPositions(circleSessionId:string, cardIds:string[], uId:string, callback:() => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            var cps:CardPosition[] = cardIds.map((ci:string) => new CardPosition(circleSessionId, ci, uId, [], 0, new Date()));
            db.collection('cardpositions').insertMany(cps, (err:MongoError, res:InsertWriteOpResult) => {
                db.close();
                callback();
            });
        });
    }

    deleteCardPositionsByCircleSessionId(circleSessionId:string, callback:(b:boolean)=> any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('cardpositions').deleteMany({'_sessionId': circleSessionId}, (err:MongoError, result:DeleteWriteOpResultObject)=> {
                db.close();
                callback(result.deletedCount == 1);
            });
        });
    }

    addUserToCircleSession(circleSessionId:string, userId:string, callback:(b:boolean) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('circlesessions').updateOne({'_id': new ObjectID(circleSessionId)}, {
                $push: {'_userIds': userId}
            }, (err:MongoError, result) => {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    }

    updateCurrentPlayer(circleSessionId:string, newPlayerId:string, preGameInProgress:boolean, callback:(success:boolean) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('circlesessions').updateOne({_id: new ObjectID(circleSessionId)}, { $set: {
                _currentPlayerId: newPlayerId,
                _isPreGame: preGameInProgress,
            }}, (err:MongoError, res:UpdateWriteOpResult) => {
                db.close();
                callback(res.modifiedCount == 1);
            });
        });
    }

    updateInProgress(circleSessionId:string, inProgress:boolean, callback:(b:boolean)=>any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('circlesessions').updateOne({_id: new ObjectID(circleSessionId)},
                {$set:{_inProgress: inProgress}}, (err:MongoError, res:UpdateWriteOpResult) => {
                    db.close();
                    callback();
                });
        });
    }
}