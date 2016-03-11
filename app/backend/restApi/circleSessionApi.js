var circleSessionManager_1 = require("../logic/circleSessionManager");
var userApi_1 = require("./userApi");
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
        CircleSessionApi.mgr.getCircleSessionsOfUserById(userId, function (circleSessions) {
            res.send(circleSessions);
        });
    };
    CircleSessionApi.getCircleSessionCards = function (circleSessionId, res) {
        CircleSessionApi.mgr.getCircleSessionCards(circleSessionId, function (wrappers) {
            res.send(wrappers);
        });
    };
    CircleSessionApi.initCardsForSession = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (uId) {
            if (uId != null) {
                var circleSessionId = req.params.id;
                var cardIds = req.body;
                CircleSessionApi.mgr.initCardsForSession(uId, circleSessionId, cardIds, function () {
                    res.status(200).send('Success');
                });
            }
            else {
                res.status(401).send('Unauthorized');
            }
        });
    };
    CircleSessionApi.deleteCircleSession = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var circleSessionId = req.params.id;
                CircleSessionApi.mgr.deleteCircleSession(currentUserId, circleSessionId, function () {
                    res.status(204).send('Deleted');
                });
            }
            else {
                res.status(401).send('Unauthorized');
            }
        });
    };
    CircleSessionApi.mgr = new circleSessionManager_1.CircleSessionManager();
    return CircleSessionApi;
})();
exports.CircleSessionApi = CircleSessionApi;
//# sourceMappingURL=circleSessionApi.js.map