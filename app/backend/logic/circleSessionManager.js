var circleSessionDao_1 = require("../dao/circleSessionDao");
var groupManager_1 = require("./groupManager");
var themeManager_1 = require("./themeManager");
var userManager_1 = require("./userManager");
var circleSessionCardWrapper_1 = require("../model/circleSessionCardWrapper");
var CircleSessionManager = (function () {
    function CircleSessionManager() {
        this._dao = new circleSessionDao_1.CircleSessionDao();
    }
    CircleSessionManager.prototype.createCircleSession = function (circleSessionCreateWrapper, callback) {
        var _this = this;
        var circleSession = circleSessionCreateWrapper._circleSession;
        this._dao.circleSessionExists(circleSession, function (exists) {
            if (exists) {
                callback(null);
            }
            else {
                var uMgr = new userManager_1.UserManager();
                var tMgr = new themeManager_1.ThemeManager();
                var gMgr = new groupManager_1.GroupManager();
                uMgr.getUserIdsByEmail(circleSessionCreateWrapper._userEmailAdresses, function (users) {
                    var done = 0;
                    users.forEach(function (u) {
                        circleSession._userIds.push(u);
                        if (++done == users.length) {
                            gMgr.getGroupById(circleSession._groupId, function (g) {
                                circleSession._name = g._name + " - ";
                                tMgr.getTheme(circleSession._themeId, function (t) {
                                    circleSession._name += t._name;
                                    gMgr.getUserIdsInGroup(circleSession._groupId, function (us) {
                                        var changed = 0;
                                        us.forEach(function (u) {
                                            if (circleSession._userIds.indexOf(u) < 0) {
                                                circleSession._userIds.push(u);
                                            }
                                            if (++changed == us.length) {
                                                _this._dao.createCircleSession(circleSession, callback);
                                            }
                                        });
                                    });
                                });
                            });
                        }
                    });
                });
            }
        });
    };
    CircleSessionManager.prototype.getAllCircleSessions = function (callback) {
        this._dao.readAllCircleSessions(callback);
    };
    CircleSessionManager.prototype.getCircleSession = function (id, callback) {
        this._dao.readCircleSession(id, callback);
    };
    CircleSessionManager.prototype.cardUp = function (sessionId, cardId, userId, callback) {
        /*
         * kijken of een cardposition voor gegeven data bestaat
         * indien ja: updaten
         * indien nee: nieuwe maken
         *
         * altijd: timestamp op huidige tijd
         *
         * cardposition teruggeven
         * */
        var _this = this;
        this._dao.cardPositionExists(sessionId, cardId, function (exists, position) {
            if (exists) {
                if (position < 5) {
                    _this._dao.updateCardPosition(sessionId, cardId, userId, position++, callback);
                }
                else {
                    _this._dao.getCardPosition(sessionId, cardId, callback);
                }
            }
            else {
                _this._dao.createCardPosition(sessionId, cardId, userId, callback);
            }
        });
    };
    CircleSessionManager.prototype.getCircleSessionsOfUserById = function (userId, callback) {
        this._dao.getCircleSessionsOfUserById(userId, callback);
    };
    CircleSessionManager.prototype.removeCircleSessionById = function (circleSessionId, callback) {
        this._dao.deleteCircleSessionById(circleSessionId, callback);
    };
    CircleSessionManager.prototype.getCircleSessionCards = function (circleSessionId, callback) {
        var _this = this;
        var tMgr = new themeManager_1.ThemeManager();
        var circleSessionCardWrappers = [];
        this._dao.readCircleSession(circleSessionId, function (c) {
            tMgr.getCards(c._themeId, function (cards) {
                var a = 0;
                cards.forEach(function (c) {
                    _this._dao.cardPositionExists(circleSessionId, c._id, function (b) {
                        circleSessionCardWrappers.push(new circleSessionCardWrapper_1.CircleSessionCardWrapper(c, b));
                        if (++a == cards.length) {
                            callback(circleSessionCardWrappers);
                        }
                    });
                });
            });
        });
    };
    CircleSessionManager.prototype.initCardsForSession = function (uId, circleSessionId, cardIds, callback) {
        var _this = this;
        this._dao.getCardPositions(circleSessionId, cardIds, function (cps) {
            for (var i = 0; i < cps.length; i++) {
                var index = cardIds.indexOf(cps[i]._id);
                if (index > -1) {
                    cardIds.splice(index, 1);
                }
            }
            var callsMade = 0;
            _this._dao.createCardPositions(circleSessionId, cardIds, uId, callback);
        });
    };
    CircleSessionManager.prototype.deleteCircleSession = function (currentUserId, circleSessionId, callback) {
        var _this = this;
        this.getCircleSession(circleSessionId, function (c) {
            console.log('current user: ' + currentUserId);
            console.log('creator: ' + c._creatorId);
            if (c._creatorId == currentUserId) {
                _this._dao.deleteCircleSessionById(circleSessionId, function (b) {
                    _this._dao.deleteCardPositionsByCircleSessionId(circleSessionId, callback);
                });
            }
        });
    };
    return CircleSessionManager;
})();
exports.CircleSessionManager = CircleSessionManager;
//# sourceMappingURL=circleSessionManager.js.map