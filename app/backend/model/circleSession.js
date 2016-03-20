"use strict";
var CircleSession = (function () {
    function CircleSession(_groupId, _userIds, _themeId, 
        /* _name format: "GroupName - ThemeName" */
        _name, _creatorId, 
        /* _startDate format: yyyy-mm-dd hh:mm */
        _startDate, _realTime, _isPreGame, 
        //amount of rounds untill the session will stop. When null the game is endless and needs to be stopped manualy
        _endPoint, 
        //true when comments are allowed on cards in the pregame
        _allowComment, 
        //true when the game has been started (current date is pas startdate)
        _inProgress, 
        //true when the game has been stopped manualy or by reaching the endpoint
        _isStopped, 
        //Time a turn can last for one player
        _turnTimeMin, _currentPlayerId) {
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
        this._isStopped = _isStopped;
        this._turnTimeMin = _turnTimeMin;
        this._currentPlayerId = _currentPlayerId;
    }
    CircleSession.empty = function () {
        return new CircleSession("", [], "", "", "", "", false, true, null, true, false, false);
    };
    return CircleSession;
}());
exports.CircleSession = CircleSession;
//# sourceMappingURL=circleSession.js.map