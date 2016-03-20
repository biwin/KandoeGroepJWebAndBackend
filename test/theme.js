"use strict";
var assert = require('assert');
var themeManager_1 = require("../app/backend/logic/themeManager");
var userManager_1 = require("../app/backend/logic/userManager");
var theme_1 = require("../app/backend/model/theme");
var card_1 = require("../app/backend/model/card");
var user_1 = require("../app/backend/model/user");
var themeManager;
var userManager;
var user;
before(function (done) {
    this.timeout(0);
    themeManager = new themeManager_1.ThemeManager();
    userManager = new userManager_1.UserManager();
    userManager.deleteTestUsers(function () {
        userManager.registerUser(new user_1.User('Enio', 'test@robhendrickx.be', 'password', "test"), function (u) {
            try {
                user = u;
                done();
            }
            catch (e) {
                done(e);
            }
        });
    });
});
describe('ThemeManager', function () {
    describe('createTheme', function () {
        var theme;
        it('Create theme, should return theme from database', function (done) {
            this.timeout(0);
            theme = new theme_1.Theme('first', 'This is a sample theme', [user._id]);
            themeManager.createTheme(theme, function (t) {
                themeManager.getTheme(t._id, function (themeGet) {
                    try {
                        assert.equal(t._id, themeGet._id);
                        assert.equal(theme._name, themeGet._name);
                        assert.deepEqual(theme._organisatorIds, themeGet._organisatorIds);
                        assert.equal(theme._description, themeGet._description);
                        done();
                    }
                    catch (e) {
                        done(e);
                    }
                });
            });
        });
        after(function (done) {
            this.timeout(0);
            try {
                themeManager.removeThemeById(theme._id, function () {
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
    });
    describe('AddCard', function () {
        var card;
        var theme;
        before(function (done) {
            try {
                theme = new theme_1.Theme('Cafes', 'thema van cafes', [user._id]);
                themeManager.createTheme(theme, function (t) {
                    theme = t;
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Card must be added to a theme', function (done) {
            this.timeout(0);
            card = new card_1.Card('cafe de vissers', theme._id);
            themeManager.getTheme(theme._id, function (getTheme) {
                themeManager.createCard(card, function (c) {
                    assert.notEqual(c._id, null);
                    assert.equal(c._themeId, getTheme._id);
                    assert.equal(c._name, card._name);
                    done();
                });
            });
        });
        after(function (done) {
            this.timeout(0);
            try {
                themeManager.removeThemeById(theme._id, function () {
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
    });
});
after(function (done) {
    userManager.deleteTestUsers(function () {
        done();
    });
});
//# sourceMappingURL=theme.js.map