var circleSessionDao_1 = require("../dao/circleSessionDao");
var groupManager_1 = require("./groupManager");
var themeManager_1 = require("./themeManager");
var CircleSessionManager = (function () {
    function CircleSessionManager() {
        this._dao = new circleSessionDao_1.CircleSessionDao();
    }
    CircleSessionManager.prototype.createCircleSession = function (circleSession, callback) {
        var _this = this;
        this._dao.circleSessionExists(circleSession, function (exists) {
            if (exists) {
                callback(null);
            }
            else {
                var tMgr = new themeManager_1.ThemeManager();
                var gMgr = new groupManager_1.GroupManager();
                gMgr.getGroupById(circleSession._groupId, function (g) {
                    circleSession._name = g._name + " - ";
                    tMgr.getTheme(circleSession._themeId, function (t) {
                        circleSession._name += t._name;
                        gMgr.getUserIdsInGroup(circleSession._groupId, function (users) {
                            var changed = 0;
                            users.forEach(function (u) {
                                circleSession._userIds.push(u);
                                if (++changed == users.length) {
                                    _this._dao.createCircleSession(circleSession, callback);
                                }
                            });
                        });
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
    return CircleSessionManager;
})();
exports.CircleSessionManager = CircleSessionManager;
//# sourceMappingURL=circleSessionManager.js.map