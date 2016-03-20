"use strict";
var mongodb_1 = require("mongodb");
var daoConstants_1 = require("./daoConstants");
/**
 * Class that is responsible for the connection with the db for chatmessages
 */
var ChatDao = (function () {
    function ChatDao() {
        this._client = new mongodb_1.MongoClient();
    }
    ChatDao.prototype.addMessage = function (message, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('chatmessages').insertOne(message, function (err, res) {
                db.close();
                callback(res.insertedCount == 1);
            });
        });
    };
    ChatDao.prototype.readMessages = function (sessionId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('chatmessages').find({ _circleSessionId: sessionId }).sort({ _timeStamp: 1 }).toArray(function (err, res) {
                callback(res);
            });
        });
    };
    ChatDao.prototype.deleteChatOfCircleSession = function (circleSessionId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('chatmessages').deleteMany({ _circleSessionId: circleSessionId }, function () {
                callback();
            });
        });
    };
    return ChatDao;
}());
exports.ChatDao = ChatDao;
//# sourceMappingURL=chatDao.js.map