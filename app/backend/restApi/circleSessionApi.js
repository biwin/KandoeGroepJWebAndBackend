var circleSessionManager_1 = require("../logic/circleSessionManager");
var CircleSessionApi = (function () {
    function CircleSessionApi() {
    }
    CircleSessionApi.createCircleSession = function (circleSessionCreateWrapper, res) {
        CircleSessionApi.mgr.createCircleSession(circleSessionCreateWrapper, function (c) {
            res.send(c);
        });
    };
    CircleSessionApi.findAll = function (res) {
        CircleSessionApi.mgr.getAllCircleSessions(function (c) {
            res.send(c);
        });
    };
    CircleSessionApi.find = function (id, res) {
        CircleSessionApi.mgr.getCircleSession(id, function (c) {
            res.send(c);
        });
    };
    CircleSessionApi.cardUp = function (sessionId, cardId, userId, res) {
        CircleSessionApi.mgr.cardUp(sessionId, cardId, userId, function (cp) {
            res.send(cp);
        });
    };
    CircleSessionApi.getCircleSessionsOfUserById = function (userId, res) {
        this.mgr.getCircleSessionsOfUserById(userId, function (circleSessions) {
            res.send(circleSessions);
        });
    };
    CircleSessionApi.mgr = new circleSessionManager_1.CircleSessionManager();
    return CircleSessionApi;
})();
exports.CircleSessionApi = CircleSessionApi;
//# sourceMappingURL=circleSessionApi.js.map