import {MongoClient} from "mongodb";
import {DaoConstants} from "./daoConstants";
import {Db} from "mongodb";
import {ChatMessage} from "../model/chatMessage";
import {MongoError} from "mongodb";
import {InsertOneWriteOpResult} from "mongodb";

export class ChatDao {
    private _client:MongoClient;

    constructor() {
        this._client = new MongoClient();
    }

    addMessage(message:ChatMessage, callback:(b:boolean) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) =>{
           db.collection('chatmessages').insertOne(message, (err:MongoError, res:InsertOneWriteOpResult) =>{
               db.close();
               callback(res.insertedCount == 1);
           });
        });
    }

    readMessages(sessionId:string, callback:(msgs:ChatMessage[]) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
            db.collection('chatmessages').find({_circleSessionId: sessionId}).sort({_timeStamp:1}).toArray((err:MongoError, res:ChatMessage[]) => {
                callback(res);
            });
        });
    }
}