var CircleSession = (function () {
    function CircleSession(_groupId, _userIds, _themeId, 
        /* _name format: "GroupName - ThemeName" */
        _name, _creatorId, 
        /* _startDate format: dd/mm/yyyy hh:mm */
        _startDate, _realTime, _isPreGame, _endPoint, _allowComment, _inProgress, _turnTimeMin, _currentPlayerId) {
        this._groupId = _groupId;
        this._userIds = _userIds;
        this._themeId = _themeId;
        this._name = _name;
        this._creatorId = _creatorId;
        this._startDate = _startDate;
        this._realTime = _realTime;
        this._isPreGame = _isPreGame;
        this._endPoint = _endPoint;
        this._allowComment = _allowComment;
        this._inProgress = _inProgress;
        this._turnTimeMin = _turnTimeMin;
        this._currentPlayerId = _currentPlayerId;
    }
    CircleSession.empty = function () {
        return new CircleSession("", [], "", "", "", "", false, true, null, true, false);
    };
    return CircleSession;
})();
exports.CircleSession = CircleSession;
//# sourceMappingURL=circleSession.js.map