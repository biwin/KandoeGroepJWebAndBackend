var circleSessionManager_1 = require("../logic/circleSessionManager");
var CircleSessionApi = (function () {
    function CircleSessionApi() {
    }
    CircleSessionApi.createCircleSession = function (circleSession, res) {
        CircleSessionApi.mgr.createCircleSession(circleSession, function (c) {
            res.send(c);
        });
    };
    CircleSessionApi.findAll = function (res) {
        CircleSessionApi.mgr.getAllCircleSessions(function (c) {
            res.send(c);
        });
    };
    CircleSessionApi.mgr = new circleSessionManager_1.CircleSessionManager();
    return CircleSessionApi;
})();
exports.CircleSessionApi = CircleSessionApi;
//# sourceMappingURL=circleSessionApi.js.map