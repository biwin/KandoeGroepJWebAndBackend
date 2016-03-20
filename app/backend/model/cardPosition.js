var CardPosition = (function () {
    function CardPosition(_sessionId, _cardId, _userId, 
        //list of userIds that have moved this card in this session
        _userHistory, 
        /* 0 is in the game but not on the board. 1-5 are the rings (5 = the inner ring = end)  */
        _position, _lastChanged) {
        this._sessionId = _sessionId;
        this._cardId = _cardId;
        this._userId = _userId;
        this._userHistory = _userHistory;
        this._position = _position;
        this._lastChanged = _lastChanged;
    }
    return CardPosition;
})();
exports.CardPosition = CardPosition;
//# sourceMappingURL=cardPosition.js.map