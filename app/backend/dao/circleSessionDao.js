/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
var mongodb_1 = require("mongodb");
var daoConstants_1 = require("./daoConstants");
var mongodb_2 = require("mongodb");
var cardPosition_1 = require("../model/cardPosition");
var CircleSessionDao = (function () {
    function CircleSessionDao() {
        this._client = new mongodb_1.MongoClient();
    }
    CircleSessionDao.prototype.circleSessionExists = function (circleSession, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('circlesessions').find({
                '_groupId': circleSession._groupId,
                '_themeId': circleSession._themeId,
                '_startDate': circleSession._startDate
            }).limit(1).next(function (cursor) {
                db.close();
                callback(cursor != null);
            });
        });
    };
    CircleSessionDao.prototype.createCircleSession = function (circleSession, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('circlesessions').insertOne(circleSession, function (err, res) {
                circleSession._id = res.insertedId.toString();
                db.close();
                callback(circleSession);
            });
        });
    };
    CircleSessionDao.prototype.readAllCircleSessions = function (callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('circlesessions').find({}).toArray(function (err, docs) {
                callback(docs);
            });
        });
    };
    CircleSessionDao.prototype.readCircleSession = function (id, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('circlesessions').find({ '_id': new mongodb_2.ObjectID(id) }).limit(1).next().then(function (cursor) {
                db.close();
                callback(cursor);
            });
        });
    };
    CircleSessionDao.prototype.cardPositionExists = function (sessionId, cardId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('cardpositions').find({
                '_sessionId': sessionId,
                '_cardId': cardId
            }).limit(1).next(function (cursor) {
                db.close();
                var cp = cursor;
                callback(cp != null, cp._position);
            });
        });
    };
    CircleSessionDao.prototype.updateCardPosition = function (sessionId, cardId, userId, position, callback) {
        var _this = this;
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('cardpositions').updateOne({
                '_sessionId': sessionId,
                '_cardId': cardId
            }, {
                '$set': {
                    '_lastChanged': new Date(),
                    '_userId': userId,
                    '_position': position
                }
            }, null, function (err, result) {
                if (result.modifiedCount == 0) {
                    callback(null);
                }
                else {
                    _this.getCardPosition(sessionId, cardId, callback);
                }
            });
        });
    };
    CircleSessionDao.prototype.createCardPosition = function (sessionId, cardId, userId, callback) {
        var cp = new cardPosition_1.CardPosition(sessionId, cardId, userId, 0, new Date());
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('cardpositions').insertOne(cp, null, function (err, result) {
                cp._id = result.insertedId.toString();
                db.close();
                callback(cp);
            });
        });
    };
    CircleSessionDao.prototype.getCardPosition = function (sessionId, cardId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('cardpositions').find({
                '_sessionId': sessionId,
                '_cardId': cardId
            }).limit(1).next(function (cursor) {
                callback(cursor);
            });
        });
    };
    CircleSessionDao.prototype.getCircleSessionsOfUserById = function (userId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('circlesessions').find({ '_userIds': { '$in': [userId] } }).toArray(function (err, docs) {
                callback(docs);
            });
        });
    };
    CircleSessionDao.prototype.deleteCircleSessionById = function (circleSessionId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('circlesessions').deleteOne({ '_id': circleSessionId }, function (err, result) {
                db.close();
                callback(result.deletedCount == 1);
            });
        });
    };
    return CircleSessionDao;
})();
exports.CircleSessionDao = CircleSessionDao;
//# sourceMappingURL=circleSessionDao.js.map