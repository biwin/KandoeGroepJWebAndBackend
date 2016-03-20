var ChatMessage = (function () {
    function ChatMessage(_userId, _message, _circleSessionId, _timestamp, 
        //optional userName to show in frontend
        _userName) {
        this._userId = _userId;
        this._message = _message;
        this._circleSessionId = _circleSessionId;
        this._timestamp = _timestamp;
        this._userName = _userName;
    }
    return ChatMessage;
})();
exports.ChatMessage = ChatMessage;
//# sourceMappingURL=chatMessage.js.map