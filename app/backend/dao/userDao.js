/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
var mongodb_1 = require("mongodb");
var daoConstants_1 = require("./daoConstants");
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
    UserDao.prototype.createUser = function (u, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').insertOne(u).then(function () {
                db.close();
                callback();
            });
        });
    };
    UserDao.prototype.deleteUser = function (name, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('users').deleteOne({ '_name': name }, function () {
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
                callback(cursor);
            });
        });
    };
    UserDao.prototype.addToOrganisation = function (organisationName, userName, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').updateOne({ '_name': organisationName }, { $push: { '_organisators': userName } }).then(function () {
                db.close();
                callback();
            });
        });
    };
    return UserDao;
})();
exports.UserDao = UserDao;
//# sourceMappingURL=userDao.js.map