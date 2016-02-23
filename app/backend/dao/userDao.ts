/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
import {MongoClient} from "mongodb";
import {DaoConstants} from "./daoConstants";
import {User} from "../model/user";
import {MongoCallback} from "mongodb";
import {Db} from "mongodb";
import {CursorResult} from "mongodb";
import {Organisation} from "../model/organisation";
import {ObjectID} from "mongodb";
import {Group} from "../model/group";
import {MongoError} from "mongodb";
import {Collection} from "mongodb";

export class UserDao {

    private client: MongoClient;

    constructor() {
        this.client = new MongoClient();
    }

    clearDatabase(callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL).then((db: Db) => {
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

    readGroupByName(gName:string, callback: (g: Group) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL).then((db: Db) => {
            return db.collection('groups').find({'_name': name}).limit(1).next();
        }).then((cursor:CursorResult) => {
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

    readGroupById(id:string, callback: (g: Group) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL).then((db: Db) => {
            return db.collection('groups').find({'_id': new ObjectID(id)}).limit(1).next();
        }).then((cursor: CursorResult) => {
            callback(cursor);
        });
    }


    createUser(u: User, callback: (u: User) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('users').insertOne(u, (error: MongoError, result) => {
                u._id = result.insertedId;
                db.close();
                callback(u);
            });
        });
    }

    createGroup(g:Group, callback: (newGroup: Group) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('groups').insertOne(g, (error: MongoError, result) => {
                g._id = result.insertedId;
                db.close();
                callback(g);
            });
        });

    }

    deleteUser(name: string, callback: (b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('users').deleteOne({'_name': name}, (err: MongoError, result) => {
                db.close();
                callback(result.deletedCount == 1);
            });
        });
    }

    deleteUserById(id: string, callback: (b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('users').deleteOne({'_id': id}, (err: MongoError, result) => {
                db.close();
                callback(result.deletedCount == 1);
            });
        });
    }

    createOrganisation(o: Organisation, callback: (organisation: Organisation) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').insertOne(o, (error: MongoError, result) => {
                o._id = result.insertedId;
                db.close();
                callback(o);
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

    deleteUserFromOrganisation(oName: string, uId: string, callback: (b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').updateOne({'_name': oName}, {$pull: {'_organisators': uId}}).then((error: MongoError, result) => {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    }


    addToGroup(uId:string, gName:string, callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
           db.collection('groups').updateOne({'_name': gName}, {$push: {'_users': uId}}).then(() => {
               db.close();
               callback();
           })
        });

    }

    readIsUserInGroup(gId:string, uId:string, callback: (b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('groups').find( {'_id': gId, '_users': {'$in': [uId]}}).limit(1).next().then((g: Group) => {
                callback(g != null);
            });
        });
    }

    deleteGroupFromOrganisation(gId:string, oId:string, callback: () => any ) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').updateOne({'_id': oId}, {$pull: {'_groups': gId}}).then(() => {
                db.close();
                callback();
            })
        })
    }

    deleteGroup(_id:string, callback: (b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('groups').deleteOne({'_id': _id}, () => {
                db.close();
                callback(true); //todo Drivers OK & N

            });
        });

    }

    deleteUserFromGroup(_uId:string, _gId:string, callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('groups').updateOne({'_id': _gId}, {$pull: {'_users': _uId}}).then(() => {
                db.close();
                callback();
            });
        });

    }

    readAllUsers(callback: (users:User[]) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('users').find({}).toArray((err, documents) => {
                callback(documents);
            });
        });
    }

    deleteOrganisationById(id: String, callback: (b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').deleteOne({'_id': id}, (err: MongoError, result) => {
                db.close();
                callback(result.deletedCount == 1);
            });
        });
    }

    addGroupToOrganisation(gId: string,oId: string, callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').updateOne({'_id': oId}, {$push: {'_groups': gId}},(err: MongoError, result) => {
               db.close();
                callback();
            });
        });
    }
}