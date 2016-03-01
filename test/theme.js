var assert = require('assert');
var themeManager_1 = require("../app/backend/logic/themeManager");
var userManager_1 = require("../app/backend/logic/userManager");
var theme_1 = require("../app/backend/model/theme");
var user_1 = require("../app/backend/model/user");
var card_1 = require("../app/backend/model/card");
var themeManager;
var userManager;
before(function (done) {
    themeManager = new themeManager_1.ThemeManager();
    userManager = new userManager_1.UserManager();
    done();
});
describe('ThemeManager', function () {
    describe('createTheme', function () {
        var user;
        var theme;
        before(function (done) {
            this.timeout(0);
            userManager.registerUser(new user_1.User('Enio', 'enio.serluppens@student.kdg.be', 'password'), function (u) {
                try {
                    user = u;
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
        it('Create theme, should return theme from database', function (done) {
            this.timeout(0);
            theme = new theme_1.Theme('first', 'This is a sample theme', [user._id]);
            themeManager.createTheme(theme, function (t) {
                try {
                    assert.equal(theme._name, t._name);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
        after(function (done) {
            this.timeout(0);
            try {
                userManager.removeUserById(user._id, function () {
                    themeManager.removeThemeById(theme._id, function () {
                        done();
                    });
                });
            }
            catch (e) {
                done(e);
            }
        });
    });
    describe('AddCard', function () {
        var card;
        before(function (done) {
            card = new card_1.Card('Cafe de vissers', 't1235');
            done();
        });
        it('Card must be added to a theme', function (done) {
            this.timeout(0);
            themeManager.createCard(card, function (c) {
                assert.notEqual(c._id, null);
                done();
            });
        });
    });
});
//# sourceMappingURL=theme.js.map