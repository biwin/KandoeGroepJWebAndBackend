"use strict";
var mongodb_1 = require("mongodb");
var daoConstants_1 = require("./daoConstants");
/**
 * Class that is responsible for the connection with the dbb for snapshots
 */
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
    SnapshotDao.prototype.readSnapshotById = function (id, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('snapshots').find({ '_id': new mongodb_1.ObjectID(id) }).limit(1).next(function (err, doc) {
                db.close();
                callback(doc);
            });
        });
    };
    return SnapshotDao;
}());
exports.SnapshotDao = SnapshotDao;
//# sourceMappingURL=snaptshotDao.js.map