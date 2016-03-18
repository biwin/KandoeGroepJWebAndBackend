"use strict";
var mongodb_1 = require("mongodb");
var daoConstants_1 = require("./daoConstants");
var SnapshotDao = (function () {
    function SnapshotDao() {
        this._client = new mongodb_1.MongoClient();
    }
    SnapshotDao.prototype.createSnapshot = function (snapshot, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('snapshots').insertOne(snapshot, function (error, result) {
                snapshot._id = result.insertedId.toHexString();
                db.close();
                callback(snapshot);
            });
        });
    };
    SnapshotDao.prototype.readSnapshotsByUserId = function (userId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('snapshots').find({ '_creatorId': userId }).toArray(function (err, docs) {
                db.close();
                callback(docs);
            });
        });
    };
    return SnapshotDao;
}());
exports.SnapshotDao = SnapshotDao;
//# sourceMappingURL=snaptshotDao.js.map