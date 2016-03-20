/**
 * Class that gives a simple model to combine a circlesession and a list of emails.
 * When creating a team a list of emails can be provided.
 * These will be transformed into userIds in the circlesessionmanager and added to the circleSession in the wrapper
 */
var CircleSessionCreateWrapper = (function () {
    function CircleSessionCreateWrapper(_circleSession, _userEmailAdresses) {
        this._circleSession = _circleSession;
        this._userEmailAdresses = _userEmailAdresses;
    }
    CircleSessionCreateWrapper.empty = function () {
        return new CircleSessionCreateWrapper(null, []);
    };
    return CircleSessionCreateWrapper;
})();
exports.CircleSessionCreateWrapper = CircleSessionCreateWrapper;
//# sourceMappingURL=circleSessionCreateWrapper.js.map