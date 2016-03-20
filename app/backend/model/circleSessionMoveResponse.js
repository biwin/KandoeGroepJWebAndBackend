/**
 * Class that gives a simple model to combine and action and a Cardpositions.
 * Used to send back to the frontend when a game move has been done.
 * It allows the frontend to react according to the possible action
 */
var CircleSessionMoveResponse = (function () {
    function CircleSessionMoveResponse(_error, _roundEnded, _currentPlayerId, _updatedCardPosition) {
        this._error = _error;
        this._roundEnded = _roundEnded;
        this._currentPlayerId = _currentPlayerId;
        this._updatedCardPosition = _updatedCardPosition;
    }
    return CircleSessionMoveResponse;
})();
exports.CircleSessionMoveResponse = CircleSessionMoveResponse;
//# sourceMappingURL=circleSessionMoveResponse.js.map