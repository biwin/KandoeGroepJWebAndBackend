"use strict";
var CircleSessionCreateWrapper = (function () {
    function CircleSessionCreateWrapper(_circleSession, _userEmailAdresses) {
        this._circleSession = _circleSession;
        this._userEmailAdresses = _userEmailAdresses;
    }
    CircleSessionCreateWrapper.empty = function () {
        return new CircleSessionCreateWrapper(null, []);
    };
    return CircleSessionCreateWrapper;
}());
exports.CircleSessionCreateWrapper = CircleSessionCreateWrapper;
//# sourceMappingURL=circleSessionCreateWrapper.js.map