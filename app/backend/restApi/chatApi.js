"use strict";
var chatManager_1 = require("../logic/chatManager");
/**
 * Class that is responsible for exstracting data from the request and sending it to the chatmanager
 */
var ChatApi = (function () {
    function ChatApi() {
    }
    ChatApi.addMessage = function (message, callback) {
        var messageObject = JSON.parse(message);
        ChatApi.mgr.addMessage(messageObject, callback);
    };
    ChatApi.getMessages = function (req, res) {
        var sessionId = req.params.id;
        ChatApi.mgr.getMessages(sessionId, function (msgs) {
            res.send(msgs);
        });
    };
    ChatApi.mgr = new chatManager_1.ChatManager();
    return ChatApi;
}());
exports.ChatApi = ChatApi;
//# sourceMappingURL=chatApi.js.map