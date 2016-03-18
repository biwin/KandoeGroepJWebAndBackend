import {MongoClient} from "mongodb";
import {Snapshot} from "../model/snapshot";
import {DaoConstants} from "./daoConstants";
import {Db} from "mongodb";
import {MongoError} from "mongodb";
import {InsertOneWriteOpResult} from "mongodb";
import {ObjectID} from "mongodb";
import {CursorResult} from "mongodb";

export class SnapshotDao {
    private _client: MongoClient;

    constructor() {
        this._client = new MongoClient();
    }

    createSnapshot(snapshot: Snapshot, callback: (newSnapshot:Snapshot) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('snapshots').insertOne(snapshot, (error: MongoError, result:InsertOneWriteOpResult) => {
                snapshot._id = result.insertedId.toHexString();
                db.close();
                callback(snapshot);
            });
        });
    }

    readSnapshotsByUserId(userId:string, callback:(snapshots:Snapshot[]) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db:Db) => {
           db.collection('snapshots').find({'_creatorId': userId}).toArray((err:MongoError, docs:Snapshot[])=>{
                db.close();
                callback(docs);
           });
        });
    }

    readSnapshotById(id:string, callback:(snapshots:Snapshot) => any) {
        this._client.connect(DaoConstants.CONNECTION_URL, (err: any, db:Db) => {
            db.collection('snapshots').find({'_id': new ObjectID(id)}).limit(1).next((err:MongoError, doc:CursorResult)=>{
                db.close();
                callback(doc);
            });
        });
    }
}