/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
"use strict";
var assert = require('assert');
var circleSession_1 = require("../app/backend/model/circleSession");
var circleSessionManager_1 = require("../app/backend/logic/circleSessionManager");
var themeManager_1 = require("../app/backend/logic/themeManager");
var userManager_1 = require("../app/backend/logic/userManager");
var theme_1 = require("../app/backend/model/theme");
var group_1 = require("../app/backend/model/group");
var user_1 = require("../app/backend/model/user");
var groupManager_1 = require("../app/backend/logic/groupManager");
var circleSessionCreateWrapper_1 = require("../app/backend/model/circleSessionCreateWrapper");
var circleSessionManager;
var themeManager;
var userManager;
var groupManager;
before(function (done) {
    circleSessionManager = new circleSessionManager_1.CircleSessionManager();
    themeManager = new themeManager_1.ThemeManager();
    userManager = new userManager_1.UserManager();
    groupManager = new groupManager_1.GroupManager();
    done();
});
describe('CircleSessionManager', function () {
    describe('createCircleSession', function () {
        var theme = new theme_1.Theme("test theme", "dit is een thema om te testen", [], [], []);
        var userOne = new user_1.User("stef", "email@test.com", "test", "web");
        var userTwo = new user_1.User("andre", "email@test.be", "test", "web");
        var group = new group_1.Group("test group", "test group", "Albert Hein", []);
        var circleSession;
        before(function (done) {
            this.timeout(0);
            themeManager.createTheme(theme, function (t) {
                theme = t;
                userManager.registerUser(userOne, function (u) {
                    userOne = u;
                    userManager.registerUser(userTwo, function (u2) {
                        userTwo = u2;
                        try {
                            group._memberIds.push(userOne._id);
                            group._memberIds.push(userTwo._id);
                        }
                        catch (e) {
                            done(e);
                        }
                        //FIXME group doesn't have real organisationid yet
                        groupManager.createGroup(group, function (g) {
                            group = g;
                            done();
                        });
                    });
                });
            });
        });
        it('Created circlesession should contain the users from the group', function (done) {
            this.timeout(0);
            circleSession = new circleSession_1.CircleSession(group._id, [], theme._id, "", "", "", false, false, 0, false, false, false);
            var circleSessionWrapper = new circleSessionCreateWrapper_1.CircleSessionCreateWrapper(circleSession, []);
            circleSessionManager.createCircleSession(circleSessionWrapper, function (c) {
                circleSession = c;
                assert.equal(c._userIds.length, group._memberIds.length);
                assert.deepEqual(c._userIds, group._memberIds);
                done();
            });
        });
        after(function (done) {
            this.timeout(0);
            circleSessionManager.removeCircleSessionById(circleSession._id, function (bc) {
                groupManager.removeGroupById(group._id, function (bg) {
                    userManager.removeUserById(userOne._id, function (bu1) {
                        userManager.removeUserById(userTwo._id, function (bu2) {
                            themeManager.removeThemeById(theme._id, function (bt) {
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=circleSession.js.map