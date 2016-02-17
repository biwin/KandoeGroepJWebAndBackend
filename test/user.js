/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var assert = require('assert');
var userManager_1 = require("../app/backend/logic/userManager");
var user_1 = require("../app/backend/model/user");
describe('UserManager', function () {
    var userManager;
    before(function () { userManager = new userManager_1.UserManager(); });
    describe('deleteUser', function () {
        it('Delete non-existing user, should return false', function (done) {
            userManager.deleteUser('Jasper', function (b) {
                try {
                    assert.equal(b, false);
                    done();
                }
                catch (e) {
                    return done(e);
                }
            });
        });
    });
    describe('createUser', function () {
        it('Register user, should return user from database', function (done) {
            this.timeout(0);
            var user = new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin');
            userManager.registerUser(user, function (u) {
                try {
                    assert.equal(u._name, user._name);
                    done();
                }
                catch (e) {
                    return done(e);
                }
            });
        });
    });
    describe('getUser', function () {
        it('Read existing user, should return the user', function (done) {
            userManager.getUser('Jasper', function (u) {
                try {
                    assert.equal('Jasper', u._name);
                    done();
                }
                catch (e) {
                    return done(e);
                }
            });
        });
    });
    describe('deleteUser', function () {
        it('Delete existing user, should return true', function (done) {
            this.timeout(0);
            userManager.deleteUser('Jasper', function (b) {
                try {
                    assert.equal(b, true);
                    done();
                }
                catch (e) {
                    return done(e);
                }
            });
        });
    });
    describe('getUser', function () {
        it('Read non-existing user, should return the null', function (done) {
            this.timeout(0);
            userManager.getUser('Jasper', function (u) {
                try {
                    assert.equal(null, u);
                    done();
                }
                catch (e) {
                    return done(e);
                }
            });
        });
    });
});
//# sourceMappingURL=user.js.map