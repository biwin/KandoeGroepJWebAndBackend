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
            db.collection('users').deleteMany({}, () => {
                db.collection('organisations').deleteMany({}, () => {
                    db.collection('cards').deleteMany({}, () => {
                        db.collection('circlesessions').deleteMany({}, () => {
                            db.collection('groups').deleteMany({}, () => {
                                db.collection('themes').deleteMany({}, () => {
                                    callback();
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    readUser(name: string, callback: (u: User) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL).then((db: Db) => {
            return db.collection('users').find({'_name': name}).limit(1).next().then((cursor:CursorResult) => {
                callback(cursor);
            });
        });
    }

    readFacebookUser(facebookId: number, callback: (u: User) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL).then((db: Db) => {
            return db.collection('users').find({'_facebookId': facebookId}).limit(1).next().then((cursor:CursorResult) => {
                callback(cursor);
            });
        });
    }

    readGroupByName(name: string, callback: (g: Group) => any) {
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

    readUserByEmail(email: string, callback: (u: User) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL).then((db: Db) => {
            return db.collection('users').find({'_email': email}).limit(1).next().then((cursor: CursorResult) => {
                callback(cursor);
            });
        });
    }

    readUserByFacebookId(facebookId: number, callback: (u: User) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL).then((db: Db) => {
            return db.collection('users').find({'_facebookId': facebookId}).limit(1).next().then((cursor: CursorResult) => {
                callback(cursor);
            });
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
                if (error != null) {
                    console.log(error.message);
                }
                u._id = result.insertedId;
                db.close();
                callback(u);
            });
        });
    }

    createGroup(g:Group, callback: (newGroup: Group) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('groups').insertOne(g, (error: MongoError, result) => {
                if (error != null) {
                    console.log(error.message);
                }
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
                if (error != null) {
                    console.log(error.message);
                }
                o._id = result.insertedId;
                db.close();
                callback(o);
            });
        });
    }

    readOrganisationByName(name: string, callback: (o: Organisation) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').find({'_name': name}).limit(1).next().then((cursor: CursorResult) => {
                db.close();
                callback(cursor);
            })
        });
    }
    readOrganisationById(oId: string, callback: (o: Organisation) => any) {
        try {
            this.client.connect(DaoConstants.CONNECTION_URL, (err:any, db:Db) => {
                db.collection('organisations').find({'_id': oId}).limit(1).next().then((cursor:CursorResult) => {
                    db.close();
                    callback(cursor);
                })
            });
        } catch(e) {
            console.log(e);
        }
    }

    addToOrganisation(oId: string, uId: string, callback: (b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').updateOne({'_id': oId}, {$push: {'_organisators': uId}}, (error: MongoError, result) => {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    }

    deleteUserFromOrganisation(oName: string, uId: string, callback: (b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').updateOne({'_name': oName}, {$pull: {'_organisators': uId}}, (error: MongoError, result) => {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    }


    addToGroup(uId:string, gId:string, callback: (b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
           db.collection('groups').updateOne({'_id': gId}, {$push: {'_memberIds': uId}}, (error: MongoError, result) => {
               db.close();
               callback(result.modifiedCount == 1);
           });
        });
    }

    readIsUserInGroup(gId:string, uId:string, callback: (b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('groups').find( {'_id': gId, '_memberIds': {'$in': [uId]}}).limit(1).next().then((g: Group) => {
                callback(g != null);
            });
        });
    }

    deleteGroupFromOrganisation(gId:string, oId:string, callback: (b: boolean) => any ) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').updateOne({'_id': oId}, {$pull: {'_groupIds': gId}}, (error: MongoError, result) => {
                db.close();
                callback(result.modifiedCount == 1);
            })
        })
    }

    deleteGroup(_id:string, callback: (b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('groups').deleteOne({'_id': _id}, (error: MongoError, result) => {
                db.close();
                callback(result.deletedCount == 1)

            });
        });

    }

    deleteUserFromGroup(_uId:string, _gId:string, callback: (b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('groups').updateOne({'_id': _gId}, {$pull: {'_users': _uId}}, (error: MongoError, result) => {
                db.close();
                callback(result.modifiedCount == 1);
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

    addGroupToOrganisation(gId: string, oId: string, callback: () => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').updateOne({'_id': oId}, {$push: {'_groupIds': gId}}, () => {
                db.close();
                callback();
            });
        });
    }

    addOrganisatorToOrganisation(oId: string, uId: string, callback: (b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').updateOne({'_id': oId}, {$push: {'_organisators': uId}}, (err: MongoError, result) => {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    }

    addMemberToOrganisation(oId: string, uId: string, callback: (b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('organisations').updateOne({'_id': oId}, {$push: {'_memberIds': uId}}, (err: MongoError, result) => {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    }

    setUserOrganisatorOf(uId:string, oId:string, callback:(b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('users').updateOne({'_id': uId}, {$push: {'_organisatorOf': oId}}, (err: MongoError, result) => {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    }

    changeUsernameByEmail(email: string, newName: string, callback: (b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('users').updateOne({'_email': email}, {$set: {'_name': newName}}, (err: MongoError, result) => {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    }

    changeUsernameByFacebookId(facebookId: number, newName: string, callback: (b: boolean) => any) {
        this.client.connect(DaoConstants.CONNECTION_URL, (err: any, db: Db) => {
            db.collection('users').updateOne({'_facebookId': facebookId}, {$set: {'_name': newName}}, (err: MongoError, result) => {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    }
}