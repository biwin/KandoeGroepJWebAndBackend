/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var assert = require('assert');
var userManager_1 = require("../app/backend/logic/userManager");
var user_1 = require("../app/backend/model/user");
var organisation_1 = require("../app/backend/model/organisation");
var userManager;
before(function (done) {
    userManager = new userManager_1.UserManager();
    userManager.clearDatabase(function () {
        done();
    });
});
describe('UserManager', function () {
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
    describe('createOrganisation', function () {
        before(function (done) {
            var users = 0;
            userManager.registerUser(new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin'), function () { if (++users == 2)
                done(); });
            userManager.registerUser(new user_1.User('Rob', 'rob.hendrickx@student.kdg.be', 'password', 'admin'), function () { if (++users == 2)
                done(); });
        });
        it('Create organisation, should return organisation from database', function (done) {
            this.timeout(0);
            var organisation = new organisation_1.Organisation('OrganisationName', ['Jasper', 'Rob']);
            userManager.createOrganisation(organisation, function (o) {
                try {
                    assert.equal(organisation._name, o._name);
                    done();
                }
                catch (e) {
                    return done(e);
                }
            });
        });
    });
    describe('addUserToOrganisation', function () {
        before(function (done) {
            userManager.registerUser(new user_1.User('Jan', 'jan.somers@student.kdg.be', 'password', 'admin'), function () { done(); });
        });
        it('Add user to organisation, should return organisation from database', function (done) {
            this.timeout(0);
            userManager.addToOrganisation('OrganisationName', 'Jan', function (o) {
                try {
                    assert.equal(o._organisators.length, 3);
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