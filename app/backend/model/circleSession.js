var CircleSession = (function () {
    function CircleSession(_groupId, _userIds, _themeId, 
        /* _name format: "GroupName - ThemeName" */
        _name, _creatorId, 
        /* _startDate format: dd/mm/yyyy hh:mm */
        _startDate, _realTime, _endPoint, _allowComment, _turnTimeMin) {
        this._groupId = _groupId;
        this._userIds = _userIds;
        this._themeId = _themeId;
        this._name = _name;
        this._creatorId = _creatorId;
        this._startDate = _startDate;
        this._realTime = _realTime;
        this._endPoint = _endPoint;
        this._allowComment = _allowComment;
        this._turnTimeMin = _turnTimeMin;
    }
    CircleSession.empty = function () {
        return new CircleSession("", [], "", "", "", "", false, null, true);
    };
    Object.defineProperty(CircleSession.prototype, "_inProgress", {
        get: function () {
            if (this._startDate == null || this._startDate.length !== 16) {
                return true;
            }
            var now = new Date(Date.now());
            var splittedDateAndTime = this._startDate.split(' ');
            var splittedDate = splittedDateAndTime[0].split('/').map(parseInt);
            var splittedTime = splittedDateAndTime[1].split(':').map(parseInt);
            var startDate = new Date(Date.UTC(splittedDate[2], splittedDate[1] - 1, splittedDate[0], splittedTime[0], splittedTime[1]));
            return now >= startDate;
        },
        enumerable: true,
        configurable: true
    });
    return CircleSession;
})();
exports.CircleSession = CircleSession;
//# sourceMappingURL=circleSession.js.map