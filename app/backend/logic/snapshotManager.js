"use strict";
var snaptshotDao_1 = require("../dao/snaptshotDao");
var chatManager_1 = require("./chatManager");
var themeManager_1 = require("./themeManager");
var circleSessionManager_1 = require("./circleSessionManager");
var snapshot_1 = require("../model/snapshot");
var userManager_1 = require("./userManager");
var snapshotCardWrapper_1 = require("../model/snapshotCardWrapper");
/**
 * Class that is responsible for managing what data will be send to the database layer for snapshots
 * Uses SnapshotCardWrapper to simplify the imput the frontend should provide.
 * Gains information from chatmanager, circlesessionmanager and thememanager when needed for a snapshot.
 */
var SnapshotManager = (function () {
    function SnapshotManager() {
        this._dao = new snaptshotDao_1.SnapshotDao();
        this._csManager = new circleSessionManager_1.CircleSessionManager();
        this._uManager = new userManager_1.UserManager();
        this._tManager = new themeManager_1.ThemeManager();
        this._chatManager = new chatManager_1.ChatManager();
    }
    SnapshotManager.prototype.createSnapshot = function (creatorId, circleSessionId, callback) {
        var _this = this;
        var gameName;
        var playerNames = [];
        var snapshotCards = [];
        var date = new Date();
        var timestamp = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
        this._csManager.getCircleSession(circleSessionId, function (circleSession) {
            gameName = circleSession._name;
            _this._uManager.getUsers(circleSession._userIds, function (users) {
                playerNames = users.map(function (u) { return u._name; });
                _this._csManager.getCardPositions(circleSessionId, function (cardPositions) {
                    _this._tManager.getCardsByIds(cardPositions.map(function (c) { return c._cardId; }), function (cs) {
                        var counter = 0;
                        cardPositions.forEach(function (cardPosition) {
                            var userHistoryOfPosition = users.filter(function (u) { return cardPosition._userHistory.indexOf(u._id) >= 0; }).map(function (u) { return u._name; });
                            var cardName = cs.filter(function (c) {
                                return c._id.toString() === cardPosition._cardId;
                            })[0]._name;
                            var wrapper = new snapshotCardWrapper_1.SnapshotCardWrapper(cardName, cardPosition._position, userHistoryOfPosition);
                            snapshotCards.push(wrapper);
                            if (++counter == cardPositions.length) {
                                _this._chatManager.getMessages(circleSessionId, function (chatMessages) {
                                    var newSnapshot = new snapshot_1.Snapshot(creatorId, gameName, playerNames, snapshotCards, chatMessages, timestamp);
                                    _this._dao.createSnapshot(newSnapshot, callback);
                                });
                            }
                        });
                    });
                });
            });
        });
    };
    SnapshotManager.prototype.getSnapshotsByUserId = function (userId, callback) {
        this._dao.readSnapshotsByUserId(userId, callback);
    };
    SnapshotManager.prototype.getById = function (id, callback) {
        this._dao.readSnapshotById(id, callback);
    };
    return SnapshotManager;
}());
exports.SnapshotManager = SnapshotManager;
//# sourceMappingURL=snapshotManager.js.map