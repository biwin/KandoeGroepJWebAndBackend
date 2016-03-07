/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
var mongodb_1 = require("mongodb");
var daoConstants_1 = require("./daoConstants");
var GroupDao = (function () {
    function GroupDao() {
        this._client = new mongodb_1.MongoClient();
    }
    GroupDao.prototype.createGroup = function (group, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').insertOne(group, function (error, result) {
                if (error != null) {
                    console.log(error.message);
                }
                group._id = result.insertedId;
                db.close();
                callback(group);
            });
        });
    };
    GroupDao.prototype.getGroupByNameAndOrganisationId = function (groupName, organisationId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').find({ '_name': groupName, '_organisationId': organisationId }).limit(1).next().then(function (cursor) {
                db.close();
                callback(cursor);
            });
        });
    };
    GroupDao.prototype.getGroupById = function (groupId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').find({ '_id': new mongodb_1.ObjectID(groupId) }).limit(1).next().then(function (cursor) {
                db.close();
                callback(cursor);
            });
        });
    };
    GroupDao.prototype.deleteGroupById = function (groupId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').deleteOne({ '_id': groupId }, function (err, result) {
                db.close();
                callback(result.deletedCount == 1);
            });
        });
    };
    GroupDao.prototype.getGroupsOfOrganisationById = function (organisationId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').find({ '_organisationId': organisationId }).toArray(function (err, docs) {
                callback(docs);
            });
        });
    };
    GroupDao.prototype.getGroupsOfUserById = function (userId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').find({ '_memberIds': { '$in': [userId] } }).toArray(function (err, docs) {
                callback(docs);
            });
        });
    };
    GroupDao.prototype.getUserIdsInGroup = function (groupId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').find({ '_id': new mongodb_1.ObjectID(groupId) }).project({ '_memberIds': 1, '_id': 0 }).limit(1).next(function (err, doc) {
                callback(doc._memberIds);
            });
        });
    };
    return GroupDao;
})();
exports.GroupDao = GroupDao;
//# sourceMappingURL=groupDao.js.map