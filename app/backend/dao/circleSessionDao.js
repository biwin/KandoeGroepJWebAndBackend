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
            }).limit(1).next(function (error, cursor) {
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
            db.collection('circlesessions').find({ '_id': new mongodb_2.ObjectID(id) }).limit(1).next(function (err, cursor) {
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
            }).limit(1).next(function (err, cursor) {
                callback(cursor !== null);
            });
        });
    };
    CircleSessionDao.prototype.updateCardPosition = function (sessionId, cardId, userId, previousUserId, position, callback) {
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
                }, '$push': {
                    '_userHistory': previousUserId
                }
            }, function (err, result) {
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
        var cp = new cardPosition_1.CardPosition(sessionId, cardId, userId, [], 0, new Date());
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
            }).limit(1).next(function (err, cursor) {
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
            db.collection('circlesessions').deleteOne({ '_id': new mongodb_2.ObjectID(circleSessionId) }, function (err, result) {
                db.close();
                callback(result.deletedCount == 1);
            });
        });
    };
    CircleSessionDao.prototype.getCardPositionsForCardIds = function (circleSessionId, cardIds, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('cardpositions').find({
                '_sessionId': circleSessionId,
                '_cardId': { '$in': cardIds }
            }).toArray(function (err, docs) {
                db.close();
                callback(docs);
            });
        });
    };
    CircleSessionDao.prototype.createCardPositions = function (circleSessionId, cardIds, uId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            var cps = cardIds.map(function (ci) { return new cardPosition_1.CardPosition(circleSessionId, ci, uId, [], 0, new Date()); });
            db.collection('cardpositions').insertMany(cps, function (err, res) {
                db.close();
                callback();
            });
        });
    };
    CircleSessionDao.prototype.deleteCardPositionsByCircleSessionId = function (circleSessionId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('cardpositions').deleteMany({ '_sessionId': circleSessionId }, function (err, result) {
                db.close();
                callback(result.deletedCount == 1);
            });
        });
    };
    CircleSessionDao.prototype.addUserToCircleSession = function (circleSessionId, userId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('circlesessions').updateOne({ '_id': new mongodb_2.ObjectID(circleSessionId) }, {
                $push: { '_userIds': userId }
            }, function (err, result) {
                db.close();
                callback(result.modifiedCount == 1);
            });
        });
    };
    CircleSessionDao.prototype.updateCurrentPlayer = function (circleSessionId, newPlayerId, preGameInProgress, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('circlesessions').updateOne({ _id: new mongodb_2.ObjectID(circleSessionId) }, { $set: {
                    _currentPlayerId: newPlayerId,
                    _isPreGame: preGameInProgress,
                } }, function (err, res) {
                db.close();
                callback(res.modifiedCount == 1);
            });
        });
    };
    CircleSessionDao.prototype.updateInProgress = function (circleSessionId, inProgress, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('circlesessions').updateOne({ _id: new mongodb_2.ObjectID(circleSessionId) }, { $set: { _inProgress: inProgress } }, function (err, res) {
                db.close();
                callback();
            });
        });
    };
    CircleSessionDao.prototype.getCardPositions = function (circleSessionId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('cardpositions').find({ '_sessionId': circleSessionId }).toArray(function (err, docs) {
                callback(docs);
            });
        });
    };
    CircleSessionDao.prototype.stopGame = function (sessionId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('circlesessions').updateOne({ _id: new mongodb_2.ObjectID(sessionId) }, { $set: { _isStopped: true } }, function (err, res) {
                callback(res.modifiedCount == 1);
            });
        });
    };
    return CircleSessionDao;
})();
exports.CircleSessionDao = CircleSessionDao;
//# sourceMappingURL=circleSessionDao.js.map