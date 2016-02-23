/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
var mongodb_1 = require("mongodb");
var daoConstants_1 = require("./daoConstants");
var mongodb_2 = require("mongodb");
var UserDao = (function () {
    function UserDao() {
        this.client = new mongodb_1.MongoClient();
    }
    UserDao.prototype.clearDatabase = function (callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            var completed = 0;
            db.collection('users').deleteMany({}, function () {
                if (++completed == 2)
                    callback();
            });
            db.collection('organisations').deleteMany({}, function () {
                if (++completed == 2)
                    callback();
            });
        });
    };
    UserDao.prototype.readUser = function (name, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL).then(function (db) {
            return db.collection('users').find({ '_name': name }).limit(1).next();
        }).then(function (cursor) {
            callback(cursor);
        });
    };
    UserDao.prototype.readGroupByName = function (gName, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL).then(function (db) {
            return db.collection('users').find({ '_name': name }).limit(1).next();
        }).then(function (cursor) {
            callback(cursor);
        });
    };
    UserDao.prototype.readUserById = function (id, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL).then(function (db) {
            return db.collection('users').find({ '_id': new mongodb_2.ObjectID(id) }).limit(1).next();
        }).then(function (cursor) {
            callback(cursor);
        });
    };
    UserDao.prototype.readGroupById = function (id, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL).then(function (db) {
            return db.collection('groups').find({ '_id': new mongodb_2.ObjectID(id) }).limit(1).next();
        }).then(function (cursor) {
            callback(cursor);
        });
    };
    UserDao.prototype.createUser = function (u, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').insertOne(u).then(function () {
                db.close();
                callback();
            });
        });
    };
    UserDao.prototype.createGroup = function (g, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').insertOne(g).then(function () {
                db.close();
                callback();
            });
        });
    };
    UserDao.prototype.deleteUser = function (name, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').deleteOne({ '_name': name }, function () {
                db.close();
                callback();
            });
        });
    };
    UserDao.prototype.createOrganisation = function (o, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').insertOne(o).then(function () {
                db.close();
                callback();
            });
        });
    };
    UserDao.prototype.readOrganisation = function (name, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').find({ '_name': name }).limit(1).next().then(function (cursor) {
                db.close();
                callback(cursor);
            });
        });
    };
    UserDao.prototype.addToOrganisation = function (oName, uId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').updateOne({ '_name': oName }, { $push: { '_organisators': uId } }).then(function () {
                db.close();
                callback();
            });
        });
    };
    UserDao.prototype.deleteUserFromOrganisation = function (oName, uId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').updateOne({ '_name': oName }, { $pull: { '_organisators': uId } }).then(function () {
                db.close();
                callback();
            });
        });
    };
    UserDao.prototype.addToGroup = function (uId, gName, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').updateOne({ '_name': gName }, { $push: { '_users': uId } }).then(function () {
                db.close();
                callback();
            });
        });
    };
    UserDao.prototype.readIsUserInGroup = function (gName, uId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').find({ '_name': gName, '_users': { '$in': [uId] } }).limit(1).next().then(function (g) {
                callback(g != null);
            });
        });
    };
    UserDao.prototype.deleteGroupFromOrganisation = function (gId, oId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').updateOne({ '_id': oId }, { $pull: { '_groups': gId } }).then(function () {
                db.close();
                callback;
            });
        });
    };
    UserDao.prototype.deleteGroup = function (_id, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').deleteOne({ '_id': _id }, function () {
                db.close();
                callback(true); //todo Drivers OK & N
            });
        });
    };
    UserDao.prototype.deleteUserFromGroup = function (_uId, _gId, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').updateOne({ '_id': _gId }, { $pull: { '_users': _uId } }).then(function () {
                db.close();
                callback();
            });
        });
    };
    return UserDao;
})();
exports.UserDao = UserDao;
//# sourceMappingURL=userDao.js.map