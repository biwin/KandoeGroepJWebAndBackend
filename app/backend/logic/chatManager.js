var chatDao_1 = require("../dao/chatDao");
var userManager_1 = require("./userManager");
var circleSessionManager_1 = require("./circleSessionManager");
/**
 * Class that is responsible for managing what data will be send to the database layer for chatmessages
 * Gains information from usermanager and circlesessionmanager when needed for a chatmessage.
 */
var ChatManager = (function () {
    function ChatManager() {
        this._uMgr = new userManager_1.UserManager();
        this._dao = new chatDao_1.ChatDao();
    }
    ChatManager.prototype.addMessage = function (message, callback) {
        var _this = this;
        var cMgr = new circleSessionManager_1.CircleSessionManager();
        cMgr.getCircleSession(message._circleSessionId, function (c) {
            if (!c._isStopped) {
                _this._dao.addMessage(message, function (b) {
                    _this._uMgr.getUserById(message._userId, function (u) {
                        message._userName = u._name;
                        callback(message);
                    });
                });
            }
            else {
                message._message = "Couldn't process message. Game has already been stopped...";
                message._userName = "Server";
                callback(message);
            }
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
    ChatManager.prototype.removeChatOfCircleSession = function (circleSessionId, callback) {
        this._dao.deleteChatOfCircleSession(circleSessionId, callback);
    };
    return ChatManager;
})();
exports.ChatManager = ChatManager;
//# sourceMappingURL=chatManager.js.map