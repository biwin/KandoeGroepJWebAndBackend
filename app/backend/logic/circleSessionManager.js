var circleSessionDao_1 = require("../dao/circleSessionDao");
var groupManager_1 = require("./groupManager");
var themeManager_1 = require("./themeManager");
var userManager_1 = require("./userManager");
var circleSessionCardWrapper_1 = require("../model/circleSessionCardWrapper");
var CircleSessionManager = (function () {
    function CircleSessionManager() {
        this._dao = new circleSessionDao_1.CircleSessionDao();
    }
    CircleSessionManager.prototype.createCircleSession = function (wrapper, callback) {
        var _this = this;
        var circleSession = wrapper._circleSession;
        this._dao.circleSessionExists(circleSession, function (exists) {
            if (exists) {
                callback(null);
            }
            else {
                var uMgr = new userManager_1.UserManager();
                var tMgr = new themeManager_1.ThemeManager();
                var gMgr = new groupManager_1.GroupManager();
                gMgr.getGroupById(circleSession._groupId, function (g) {
                    circleSession._name = g._name + " - ";
                    tMgr.getTheme(circleSession._themeId, function (t) {
                        circleSession._name += t._name;
                        gMgr.getUserIdsInGroup(circleSession._groupId, function (us) {
                            circleSession._userIds = us;
                            uMgr.getUserIdsByEmail(wrapper._userEmailAdresses, function (users) {
                                if (users.length == 0) {
                                    _this._dao.createCircleSession(circleSession, callback);
                                }
                                else {
                                    var counter = 0;
                                    users.forEach(function (u) {
                                        if (circleSession._userIds.indexOf(u) < 0) {
                                            circleSession._userIds.push(u);
                                        }
                                        if (++counter == users.length) {
                                            circleSession._currentPlayerId = circleSession._userIds[0];
                                            _this._dao.createCircleSession(circleSession, callback);
                                        }
                                    });
                                }
                            });
                        });
                    });
                });
            }
        });
    };
    CircleSessionManager.prototype.getAllCircleSessions = function (callback) {
        var _this = this;
        this._dao.readAllCircleSessions(function (c) {
            var arr = [];
            var i = 0;
            c.forEach(function (cs) {
                _this.checkInProgress(cs, function (s) {
                    arr.push(s == null ? cs : s);
                    if (++i == c.length) {
                        callback(arr);
                    }
                });
            });
        });
    };
    CircleSessionManager.prototype.getCircleSession = function (id, callback) {
        var _this = this;
        this._dao.readCircleSession(id, function (cs) {
            if (cs != null) {
                _this.checkInProgress(cs, callback);
            }
            else {
                callback(null);
            }
        });
    };
    CircleSessionManager.prototype.cardUp = function (sessionId, cardId, userId, callback) {
        var _this = this;
        this._dao.cardPositionExists(sessionId, cardId, function (exists) {
            if (exists) {
                _this._dao.readCircleSession(sessionId, function (c) {
                    if (c._currentPlayerId !== userId) {
                        callback(c._currentPlayerId, null, "Not your turn!");
                    }
                    else {
                        _this._dao.getCardPosition(sessionId, cardId, function (c) {
                            var newPosition = c._position + 1;
                            if (newPosition > 5) {
                                callback(userId, null, "Card already in the middle!");
                            }
                            else {
                                var lastChangedUserId = c._userId;
                                _this._dao.updateCardPosition(sessionId, cardId, userId, lastChangedUserId, newPosition, function (c) {
                                    if (c != null) {
                                        _this.nextPlayer(sessionId, function (roundEnds, newPlayerId) {
                                            callback(newPlayerId, c);
                                        });
                                    }
                                    else {
                                        callback(userId, null, "Something went wrong while updating the position");
                                    }
                                });
                            }
                        });
                    }
                });
            }
            else {
                callback(userId, null, "Card is not in the game.");
            }
        });
    };
    CircleSessionManager.prototype.getCircleSessionsOfUserById = function (userId, callback) {
        var _this = this;
        this._dao.getCircleSessionsOfUserById(userId, function (c) {
            var arr = [];
            var i = 0;
            c.forEach(function (cs) {
                _this.checkInProgress(cs, function (s) {
                    arr.push(s == null ? cs : s);
                    if (++i == c.length) {
                        callback(arr);
                    }
                });
            });
        });
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
        this.getCircleSession(circleSessionId, function (c) {
            if (c._inProgress && c._isPreGame) {
                if (c._currentPlayerId !== uId) {
                    callback(null, null, "Not your turn!");
                }
                else {
                    _this._dao.getCardPositionsForCardIds(circleSessionId, cardIds, function (cps) {
                        for (var i = 0; i < cps.length; i++) {
                            var index = cardIds.indexOf(cps[i]._id);
                            if (index > -1) {
                                cardIds.splice(index, 1);
                            }
                        }
                        if (cardIds.length > 0) {
                            _this._dao.createCardPositions(circleSessionId, cardIds, uId, function () {
                                _this.nextPlayer(circleSessionId, callback);
                            });
                        }
                        else {
                            _this.nextPlayer(circleSessionId, callback);
                        }
                    });
                }
            }
            else {
                callback(null, null, "The game is not in the pre-game phase.");
            }
        });
    };
    CircleSessionManager.prototype.deleteCircleSession = function (currentUserId, circleSessionId, callback) {
        var _this = this;
        this.getCircleSession(circleSessionId, function (c) {
            if (c._creatorId == currentUserId) {
                _this._dao.deleteCircleSessionById(circleSessionId, function (b) {
                    _this._dao.deleteCardPositionsByCircleSessionId(circleSessionId, callback);
                });
            }
        });
    };
    CircleSessionManager.prototype.checkInProgress = function (c, callback) {
        var inProgress = c._inProgress;
        if (c._startDate == null || c._startDate.length !== 16) {
            c._inProgress = true;
        }
        else {
            var now = new Date(Date.now());
            var splittedDateAndTime = c._startDate.split(' ');
            var splittedDate = splittedDateAndTime[0].split('/').map(function (i) { return parseInt(i); });
            var splittedTime = splittedDateAndTime[1].split(':').map(function (i) { return parseInt(i); });
            var startDate = new Date(Date.UTC(splittedDate[2], splittedDate[1] - 1, splittedDate[0], splittedTime[0], splittedTime[1]));
            c._inProgress = now >= startDate;
        }
        if (c._inProgress !== inProgress) {
            this._dao.updateInProgress(c._id, c._inProgress, function () {
                callback(c);
            });
        }
        else {
            callback(c);
        }
    };
    CircleSessionManager.prototype.nextPlayer = function (circleSessionId, callback) {
        var _this = this;
        this._dao.readCircleSession(circleSessionId, function (c) {
            var currentIndex = c._userIds.indexOf(c._currentPlayerId);
            var newIndex = -1;
            var roundEnded = false;
            if (currentIndex === c._userIds.length - 1) {
                newIndex = 0;
                roundEnded = true;
            }
            else {
                newIndex = currentIndex + 1;
            }
            var newPlayerId = c._userIds[newIndex];
            var preGameInProgress = c._isPreGame && !roundEnded;
            _this._dao.updateCurrentPlayer(circleSessionId, newPlayerId, preGameInProgress, function (success) {
                if (success) {
                    callback(roundEnded, newPlayerId);
                }
                else {
                    callback(null, null);
                }
            });
        });
    };
    CircleSessionManager.prototype.addUser = function (currentUserId, circleSessionId, email, callback) {
        var _this = this;
        var uMgr = new userManager_1.UserManager();
        this.getCircleSession(circleSessionId, function (c) {
            if (c._creatorId == currentUserId && !c._inProgress) {
                uMgr.getUserByEmail(email, function (u) {
                    if (c._userIds.indexOf(u._id.toString()) < 0) {
                        _this._dao.addUserToCircleSession(circleSessionId, u._id.toString(), callback);
                    }
                    else {
                        callback(false);
                    }
                });
            }
            else {
                callback(false);
            }
        });
    };
    CircleSessionManager.prototype.getCardPositions = function (circleSessionId, callback) {
        this._dao.getCardPositions(circleSessionId, callback);
    };
    return CircleSessionManager;
})();
exports.CircleSessionManager = CircleSessionManager;
//# sourceMappingURL=circleSessionManager.js.map