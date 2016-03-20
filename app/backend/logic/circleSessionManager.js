"use strict";
var circleSessionDao_1 = require("../dao/circleSessionDao");
var chatManager_1 = require("./chatManager");
var userManager_1 = require("./userManager");
var themeManager_1 = require("./themeManager");
var groupManager_1 = require("./groupManager");
var snapshotManager_1 = require("./snapshotManager");
var circleSessionCardWrapper_1 = require("../model/circleSessionCardWrapper");
/**
 * Class that is responsible for managing what data will be send to the database layer for circlesession.
 * Uses circlesessionCardWrapper and createwrapper to simplify the imput the frontend should provide.
 * Gains information from chatmanager, usermanager, thememanager, snapshotmanager and groupmanager when needed for an circlesession.
 */
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
                        if (c._isStopped) {
                            callback(userId, null, "Game is over");
                        }
                        else {
                            _this._dao.getCardPosition(sessionId, cardId, function (c) {
                                var newPosition = c._position + 1;
                                if (newPosition > 5) {
                                    callback(userId, null, "Card already in the middle!");
                                }
                                else {
                                    _this._dao.updateCardPosition(sessionId, cardId, userId, c._userId, newPosition, function (c) {
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
            if (c.length == 0) {
                callback(arr);
            }
            else {
                c.forEach(function (cs) {
                    _this.checkInProgress(cs, function (s) {
                        arr.push(s == null ? cs : s);
                        if (++i == c.length) {
                            callback(arr);
                        }
                    });
                });
            }
        });
    };
    CircleSessionManager.prototype.getCircleSessionCards = function (circleSessionId, callback) {
        var _this = this;
        var tMgr = new themeManager_1.ThemeManager();
        var circleSessionCardWrappers = [];
        this._dao.readCircleSession(circleSessionId, function (c) {
            tMgr.getCards(c._themeId, function (cards) {
                var a = 0;
                if (cards.length > 0) {
                    cards.forEach(function (c) {
                        _this._dao.cardPositionExists(circleSessionId, c._id, function (b) {
                            circleSessionCardWrappers.push(new circleSessionCardWrapper_1.CircleSessionCardWrapper(c, b));
                            if (++a == cards.length) {
                                callback(circleSessionCardWrappers);
                            }
                        });
                    });
                }
                else {
                    callback(circleSessionCardWrappers);
                }
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
                    if (c._isStopped) {
                        callback(null, null, "Game is over");
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
                    _this._dao.deleteCardPositionsByCircleSessionId(circleSessionId, function (b) {
                        var chatMgr = new chatManager_1.ChatManager();
                        chatMgr.removeChatOfCircleSession(circleSessionId, callback);
                    });
                });
            }
        });
    };
    CircleSessionManager.prototype.checkInProgress = function (c, callback) {
        var inProgress = c._inProgress;
        if (c._inProgress !== true) {
            if (c._startDate == null || c._startDate.length !== 16) {
                c._inProgress = true;
            }
            else {
                var now = new Date(Date.now());
                var startDate = new Date(Date.parse(c._startDate));
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
                    if (c._endPoint != null && roundEnded && !c._isPreGame) {
                        var newRoundsLeft = c._endPoint - 1;
                        var gameStopped = newRoundsLeft <= 0;
                        _this._dao.updateRounds(circleSessionId, newRoundsLeft, gameStopped, function () {
                            callback(roundEnded, newPlayerId);
                        });
                    }
                    else {
                        callback(roundEnded, newPlayerId);
                    }
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
    CircleSessionManager.prototype.stopGame = function (sessionId, userId, callback) {
        var _this = this;
        this.getCircleSession(sessionId, function (c) {
            if (c._creatorId !== userId) {
                callback(false, "You're not the owner of this session!");
            }
            else {
                var snapshotManager = new snapshotManager_1.SnapshotManager();
                snapshotManager.createSnapshot(c._creatorId, sessionId, function (snapshot) {
                    _this._dao.stopGame(sessionId, callback);
                });
            }
        });
    };
    return CircleSessionManager;
}());
exports.CircleSessionManager = CircleSessionManager;
//# sourceMappingURL=circleSessionManager.js.map