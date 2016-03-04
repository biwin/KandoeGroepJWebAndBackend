var CircleSession = (function () {
    function CircleSession(_groupId, _userIds, _themeId, _creatorId, 
        /* _startDate format: dd/mm/yyyy hh:mm */
        _startDate, _inProgress, _realTime, _endPoint, _allowComment, _turnTimeMin) {
        this._groupId = _groupId;
        this._userIds = _userIds;
        this._themeId = _themeId;
        this._creatorId = _creatorId;
        this._startDate = _startDate;
        this._inProgress = _inProgress;
        this._realTime = _realTime;
        this._endPoint = _endPoint;
        this._allowComment = _allowComment;
        this._turnTimeMin = _turnTimeMin;
    }
    CircleSession.empty = function () {
        return new CircleSession("", [], "", "", "", false, false, null, true, null);
    };
    return CircleSession;
})();
exports.CircleSession = CircleSession;
//# sourceMappingURL=circleSession.js.map