/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var assert = require('assert');
var themeManager_1 = require("../app/backend/logic/themeManager");
var theme_1 = require("../app/backend/model/theme");
var userManager_1 = require("../app/backend/logic/userManager");
var user_1 = require("../app/backend/model/user");
var themeManager;
var userManager;
before(function (done) {
    themeManager = new themeManager_1.ThemeManager();
    userManager = new userManager_1.UserManager();
    var completion = 0;
    themeManager.clearDatabase(function () {
        if (++completion == 2)
            done();
    });
    userManager.clearDatabase(function () {
        if (++completion == 2)
            done();
    });
});
describe('ThemeManager', function () {
    describe('createTheme', function () {
        var user;
        before(function (done) {
            this.timeout(0);
            userManager.registerUser(new user_1.User('Enio', 'enio.serluppens@student.kdg.be', 'password', 'admin'), function (u) {
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
            var theme = new theme_1.Theme('First', 'This is a sample theme', [user._id]);
            themeManager.createTheme(theme, function (t) {
                try {
                    assert.equal(theme._name, t._name);
                    done();
                }
                catch (e) {
                    return done(e);
                }
            });
        });
    });
});
//# sourceMappingURL=theme.js.map