/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
var mongodb_1 = require("mongodb");
var daoConstants_1 = require("./daoConstants");
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
    return CircleSessionDao;
})();
exports.CircleSessionDao = CircleSessionDao;
//# sourceMappingURL=circleSessionDao.js.map