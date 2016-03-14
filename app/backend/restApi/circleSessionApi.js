var circleSessionManager_1 = require("../logic/circleSessionManager");
var userApi_1 = require("./userApi");
var circleSessionMoveResponse_1 = require("../model/circleSessionMoveResponse");
var CircleSessionApi = (function () {
    function CircleSessionApi() {
    }
    CircleSessionApi.createCircleSession = function (req, res) {
        CircleSessionApi.mgr.createCircleSession(req.body, function (c) {
            res.send(c);
        });
    };
    CircleSessionApi.findAll = function (req, res) {
        CircleSessionApi.mgr.getAllCircleSessions(function (c) {
            res.send(c);
        });
    };
    CircleSessionApi.find = function (req, res) {
        CircleSessionApi.mgr.getCircleSession(req.params.id, function (c) {
            if (c == null) {
                res.status(404).send('CircleSession with id ' + req.params.id + ' not found!');
            }
            else {
                res.send(c);
            }
        });
    };
    CircleSessionApi.cardUp = function (sessionId, cardId, userId, res) {
        CircleSessionApi.mgr.cardUp(sessionId, cardId, userId, function (cp) {
            res.send(cp);
        });
    };
    CircleSessionApi.getCircleSessionCards = function (req, res) {
        CircleSessionApi.mgr.getCircleSessionCards(req.params.id, function (wrappers) {
            res.send(wrappers);
        });
    };
    CircleSessionApi.initCardsForSession = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (uId) {
            if (uId != null) {
                var circleSessionId = req.params.id;
                var cardIds = req.body;
                CircleSessionApi.mgr.initCardsForSession(uId, circleSessionId, cardIds, function (preGameEnded, currentUserId, err) {
                    if (err != undefined || err != null) {
                        res.status(400).send(new circleSessionMoveResponse_1.CircleSessionMoveResponse(err));
                    }
                    else {
                        //TODO notify active clients using WebSocket
                        res.status(200).send(new circleSessionMoveResponse_1.CircleSessionMoveResponse(null, preGameEnded, currentUserId));
                    }
                });
            }
            else {
                res.status(401).send(new circleSessionMoveResponse_1.CircleSessionMoveResponse('Unauthorized'));
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
    CircleSessionApi.getCircleSessionsOfCurrentUser = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                CircleSessionApi.mgr.getCircleSessionsOfUserById(currentUserId, function (circleSessions) {
                    res.send(circleSessions);
                });
            }
        });
    };
    CircleSessionApi.addUser = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                CircleSessionApi.mgr.addUser(currentUserId, req.params.id, req.body.email, function (b) {
                    res.status(200).send({ _response: 'Success' });
                });
            }
        });
    };
    CircleSessionApi.getCardPositions = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                CircleSessionApi.mgr.getCircleSession(req.params.id, function (c) {
                    if (c._userIds.indexOf(currentUserId) < 0) {
                        res.status(401).send({ _error: 'Unauthorized' });
                    }
                    else {
                        CircleSessionApi.mgr.getCardPositions(req.params.id, function (cps) {
                            res.send(cps);
                        });
                    }
                });
            }
            else {
                res.status(401).send({ _error: 'Unauthorized' });
            }
        });
    };
    CircleSessionApi.mgr = new circleSessionManager_1.CircleSessionManager();
    return CircleSessionApi;
})();
exports.CircleSessionApi = CircleSessionApi;
//# sourceMappingURL=circleSessionApi.js.map