var CircleSession = (function () {
    function CircleSession(_groupId, _themeId, _creatorId, _startDate, _inProgress, _realTime, _endPoint, _turnTimeMin) {
        this._groupId = _groupId;
        this._themeId = _themeId;
        this._creatorId = _creatorId;
        this._startDate = _startDate;
        this._inProgress = _inProgress;
        this._realTime = _realTime;
        this._endPoint = _endPoint;
        this._turnTimeMin = _turnTimeMin;
    }
    CircleSession.empty = function () {
        return new CircleSession("", "", "", "", false, false, null, null);
    };
    return CircleSession;
})();
exports.CircleSession = CircleSession;
//# sourceMappingURL=circleSession.js.map