"use strict";
var chatDao_1 = require("../dao/chatDao");
var userManager_1 = require("./userManager");
var ChatManager = (function () {
    function ChatManager() {
        this._uMgr = new userManager_1.UserManager();
        this._dao = new chatDao_1.ChatDao();
    }
    ChatManager.prototype.addMessage = function (message, callback) {
        var _this = this;
        this._dao.addMessage(message, function (b) {
            _this._uMgr.getUserById(message._userId, function (u) {
                message._userName = u._name;
                callback(b, message);
            });
        });
    };
    ChatManager.prototype.getMessages = function (sessionId, callback) {
        var _this = this;
        this._dao.readMessages(sessionId, function (msgs) {
            var userIds = msgs.map(function (msg) { return msg._userId; });
            _this._uMgr.getUsers(userIds, function (us) {
                var ms = msgs.map(function (msg) {
                    var a = us.filter(function (u) {
                        return msg._userId === u._id.toString();
                    })[0];
                    if (a != undefined)
                        msg._userName = a._name;
                    return msg;
                });
                callback(ms);
            });
        });
    };
    return ChatManager;
}());
exports.ChatManager = ChatManager;
//# sourceMappingURL=chatManager.js.map