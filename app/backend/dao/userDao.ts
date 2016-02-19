/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
import {MongoClient} from "mongodb";
import {DaoConstants} from "./daoConstants";
import {User} from "../model/user";
import {MongoCallback} from "mongodb";
import {Db} from "mongodb";
import {CursorResult} from "mongodb";
import {Organisation} from "../model/organisation";
import {ObjectID} from "mongodb";

export class UserDao {

    private client: MongoClient;

    constructor() {
        this.client = new MongoClient();
    }

    clearDatabase(callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            var completed: number = 0;
            db.collection('users').deleteMany({}, () => {
                if (++completed == 2) callback();
            });
            db.collection('organisations').deleteMany({}, () => {
                if (++completed == 2) callback();
            });
        });
    }

    readUser(name: string, callback: (u: User) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL).then((db: Db) => {
            return db.collection('users').find({'_name': name}).limit(1).next();
        }).then((cursor: CursorResult) => {
            callback(cursor);
        });
    }

    readUserById(id: string, callback: (u: User) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL).then((db: Db) => {
            return db.collection('users').find({'_id': new ObjectID(id)}).limit(1).next();
        }).then((cursor: CursorResult) => {
            callback(cursor);
        });
    }

    createUser(u: User, callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('users').insertOne(u).then(() => {
                db.close();
                callback();
            });
        });
    }

    deleteUser(name: string, callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('users').deleteOne({'_name': name}, () => {
                callback();
            });
        });
    }

    createOrganisation(o: Organisation, callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').insertOne(o).then(() => {
                db.close();
                callback();
            });
        });
    }

    readOrganisation(name: string, callback: (o: Organisation) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').find({'_name': name}).limit(1).next().then((cursor: CursorResult) => {
                db.close();
                callback(cursor);
            })
        });
    }

    addToOrganisation(oName: string, uId: string, callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').updateOne({'_name': oName}, {$push: {'_organisators': uId}}).then(() => {
                db.close();
                callback();
            });
        });
    }

    deleteUserFromOrganisation(oName: string, uId: string, callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').updateOne({'_name': oName}, {$pull: {'_organisators': uId}}).then(() => {
                db.close();
                callback();
            });
        });
    }
}