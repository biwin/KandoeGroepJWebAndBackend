/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
var mongodb_1 = require("mongodb");
var daoConstants_1 = require("./daoConstants");
var mongodb_2 = require("mongodb");
var UserDao = (function () {
    function UserDao() {
        this.client = new mongodb_1.MongoClient();
    }
    UserDao.prototype.clearDatabase = function (callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL).then(function (db) {
            db.collection('users').deleteMany({}, function () {
                db.collection('organisations').deleteMany({}, function () {
                    db.collection('cards').deleteMany({}, function () {
                        db.collection('circlesessions').deleteMany({}, function () {
                            db.collection('groups').deleteMany({}, function () {
                                db.collection('themes').deleteMany({}, function () {
                                    callback();
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    UserDao.prototype.readUser = function (name, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL).then(function (db) {
            return db.collection('users').find({ '_name': name }).limit(1).next().then(function (cursor) {
                callback(cursor);
            });
        });
    };
    UserDao.prototype.readFacebookUser = function (facebookId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL).then(function (db) {
            return db.collection('users').find({ '_facebookId': facebookId }).limit(1).next().then(function (cursor) {
                callback(cursor);
            });
        });
    };
    UserDao.prototype.readGroupByName = function (name, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL).then(function (db) {
            return db.collection('groups').find({ '_name': name }).limit(1).next();
        }).then(function (cursor) {
            callback(cursor);
        });
    };
    UserDao.prototype.readUserById = function (userId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').find({ '_id': new mongodb_2.ObjectID(userId) }).limit(1).next().then(function (cursor) {
                db.close();
                callback(cursor);
            });
        });
    };
    UserDao.prototype.readUserByEmail = function (email, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL).then(function (db) {
            return db.collection('users').find({ '_email': email }).limit(1).next().then(function (cursor) {
                callback(cursor);
            });
        });
    };
    UserDao.prototype.readUserIdsByEmail = function (_userEmailAdresses, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL).then(function (db) {
            return db.collection('users').find({ '_email': { '$in': _userEmailAdresses } }).project({ '_id': 1 }).toArray(function (err, result) {
                var ids = result.map(function (u) { return u._id.toString(); });
                db.close();
                callback(ids);
            });
        });
    };
    UserDao.prototype.readUserByFacebookId = function (facebookId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL).then(function (db) {
            return db.collection('users').find({ '_facebookId': facebookId }).limit(1).next().then(function (cursor) {
                callback(cursor);
            });
        });
    };
    UserDao.prototype.readGroupById = function (id, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL).then(function (db) {
            return db.collection('groups').find({ '_id': new mongodb_2.ObjectID(id) }).limit(1).next();
        }).then(function (cursor) {
            callback(cursor);
        });
    };
    UserDao.prototype.createUser = function (user, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').insertOne(user, function (error, result) {
                if (error != null) {
                    console.log(error.message);
                }
                user._id = result.insertedId.toString();
                db.close();
                callback(user);
            });
        });
    };
    UserDao.prototype.createGroup = function (g, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').insertOne(g, function (error, result) {
                if (error != null) {
                    console.log(error.message);
                }
                g._id = result.insertedId;
                db.close();
                callback(g);
            });
        });
    };
    UserDao.prototype.deleteUser = function (name, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').deleteOne({ '_name': name }, function (err, result) {
                db.close();
                callback(result.deletedCount == 1);
            });
        });
    };
    UserDao.prototype.deleteUserById = function (userId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').deleteOne({ '_id': new mongodb_2.ObjectID(userId) }, function (err, result) {
                db.close();
                callback(result.deletedCount == 1);
            });
        });
    };
    UserDao.prototype.createOrganisation = function (o, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').insertOne(o, function (error, result) {
                if (error != null) {
                    console.log(error.message);
                }
                o._id = result.insertedId;
                db.close();
                callback(o);
            });
        });
    };
    UserDao.prototype.readOrganisationByName = function (name, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').find({ '_name': name }).limit(1).next().then(function (cursor) {
                db.close();
                callback(cursor);
            });
        });
    };
    UserDao.prototype.readOrganisationById = function (oId, callback) {
        try {
            this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
                db.collection('organisations').find({ '_id': oId }).limit(1).next().then(function (cursor) {
                    db.close();
                    callback(cursor);
                });
            });
        }
        catch (e) {
            console.log(e);
        }
    };
    UserDao.prototype.addToOrganisation = function (oId, uId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').updateOne({ '_id': oId }, { $push: { '_organisators': uId } }, function (error, result) {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    };
    UserDao.prototype.deleteUserFromOrganisation = function (oName, uId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').updateOne({ '_name': oName }, { $pull: { '_organisators': uId } }, function (error, result) {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    };
    UserDao.prototype.addToGroup = function (uId, gId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').updateOne({ '_id': gId }, { $push: { '_memberIds': uId } }, function (error, result) {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    };
    UserDao.prototype.readIsUserInGroup = function (gId, uId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').find({ '_id': gId, '_memberIds': { '$in': [uId] } }).limit(1).next().then(function (g) {
                callback(g != null);
            });
        });
    };
    UserDao.prototype.deleteGroupFromOrganisation = function (gId, oId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').updateOne({ '_id': oId }, { $pull: { '_groupIds': gId } }, function (error, result) {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    };
    UserDao.prototype.deleteGroup = function (_id, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').deleteOne({ '_id': _id }, function (error, result) {
                db.close();
                callback(result.deletedCount == 1);
            });
        });
    };
    UserDao.prototype.deleteUserFromGroup = function (_uId, _gId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').updateOne({ '_id': _gId }, { $pull: { '_users': _uId } }, function (error, result) {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    };
    UserDao.prototype.readAllUsers = function (callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').find({}).toArray(function (err, documents) {
                callback(documents);
            });
        });
    };
    UserDao.prototype.deleteOrganisationById = function (id, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').deleteOne({ '_id': id }, function (err, result) {
                db.close();
                callback(result.deletedCount == 1);
            });
        });
    };
    UserDao.prototype.addGroupToOrganisation = function (gId, oId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').updateOne({ '_id': oId }, { $push: { '_groupIds': gId } }, function () {
                db.close();
                callback();
            });
        });
    };
    UserDao.prototype.addOrganisatorToOrganisation = function (oId, uId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').updateOne({ '_id': oId }, { $push: { '_organisators': uId } }, function (err, result) {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    };
    UserDao.prototype.addMemberToOrganisation = function (oId, uId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').updateOne({ '_id': oId }, { $push: { '_memberIds': uId } }, function (err, result) {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    };
    UserDao.prototype.setUserOrganisatorOf = function (uId, oId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').updateOne({ '_id': uId }, { $push: { '_organisatorOf': oId } }, function (err, result) {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    };
    UserDao.prototype.changeProfileByEmail = function (email, newName, newSmallPicture, newLargePicture, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').updateOne({ '_email': email }, { $set: { '_name': newName, '_pictureSmall': newSmallPicture, '_pictureLarge': newLargePicture } }, function (err, result) {
                db.close();
                callback(result.modifiedCount >= 1);
            });
        });
    };
    UserDao.prototype.changeProfileByFacebookId = function (facebookId, newName, newSmallPicture, newLargePicture, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').updateOne({ '_facebookId': facebookId }, { $set: { '_name': newName, '_pictureSmall': newSmallPicture, '_pictureLarge': newLargePicture } }, function (err, result) {
                db.close();
                callback(result.modifiedCount >= 1);
            });
        });
    };
    UserDao.prototype.readUsers = function (ids, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').find({ '_id': { '$in': ids } }).toArray(function (err, result) {
                db.close();
                callback(result);
            });
        });
    };
    UserDao.prototype.getMembersOfOrganisationById = function (organisationId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').find({ '_memberOf': { '$in': [organisationId] } }).toArray(function (err, docs) {
                callback(docs);
            });
        });
    };
    UserDao.prototype.getMembersOfGroupById = function (groupId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').find({ '_memberOfGroupIds': { '$in': [groupId] } }).toArray(function (err, docs) {
                callback(docs);
            });
        });
    };
    UserDao.prototype.addGroupIdToUserById = function (groupId, userId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').updateOne({ '_id': new mongodb_2.ObjectID(userId) }, { $push: { '_memberOfGroupIds': groupId } }, function (error, result) {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    };
    UserDao.prototype.addOrganisationIdToUserById = function (groupId, userId, isOrganisator, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            if (isOrganisator) {
                db.collection('users').updateOne({ '_id': new mongodb_2.ObjectID(userId) }, { $push: { '_organisatorOf': groupId } }, function (error, result) {
                    db.close();
                    callback(result.modifiedCount == 1);
                });
            }
            else {
                db.collection('users').updateOne({ '_id': new mongodb_2.ObjectID(userId) }, { $push: { '_memberOf': groupId } }, function (error, result) {
                    db.close();
                    callback(result.modifiedCount == 1);
                });
            }
        });
    };
    UserDao.prototype.deleteOrganisationFromUserById = function (organisationId, userId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').updateOne({ '_id': new mongodb_2.ObjectID(userId) }, { $pull: { '_memberOf': organisationId } }, function (error, result) {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    };
    return UserDao;
})();
exports.UserDao = UserDao;
//# sourceMappingURL=userDao.js.map