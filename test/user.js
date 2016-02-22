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
    var userId;
    describe('getUserByName', function () {
        it('Read existing user, should return the user', function (done) {
            userManager.getUser('Jasper', function (u) {
                try {
                    assert.equal('Jasper', u._name);
                    userId = u._id;
                    done();
                }
                catch (e) {
                    return done(e);
                }
            });
        });
    });
    describe('getUserById', function () {
        it('Read existing user, should return the user', function (done) {
            userManager.getUserById(userId, function (u) {
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
        var jasper;
        var rob;
        before(function (done) {
            this.timeout(0);
            var users = 0;
            try {
                userManager.registerUser(new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin'), function (u) {
                    jasper = u;
                    if (++users == 2)
                        done();
                });
                userManager.registerUser(new user_1.User('Rob', 'rob.hendrickx@student.kdg.be', 'password', 'admin'), function (u) {
                    rob = u;
                    if (++users == 2)
                        done();
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Create organisation, should return organisation from database', function (done) {
            this.timeout(0);
            var organisation = new organisation_1.Organisation('OrganisationName', [jasper._id, rob._id]);
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
        var jan;
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerUser(new user_1.User('Jan', 'jan.somers@student.kdg.be', 'password', 'admin'), function (u) {
                    jan = u;
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Add user to organisation, should return organisation from database', function (done) {
            this.timeout(0);
            userManager.addToOrganisation('OrganisationName', jan._id, function (o) {
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
    describe('removeUserFromOrganisation', function () {
        var michael;
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerUser(new user_1.User('Michael', 'michael.deboey@student.kdg.be', 'password', 'admin'), function (u) {
                    michael = u;
                    userManager.addToOrganisation('OrganisationName', michael._id, function () { done(); });
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Remove user from organisation, should return true since user was in organisation', function (done) {
            this.timeout(0);
            userManager.removeUserFromOrganisation('OrganisationName', michael._id, function (b) {
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
    /*  describe('removeUserFromOrganisation', () => {
          it('Remove user from organisation, should return false since user was NOT in organisation', function(done: any) {
              this.timeout(0);
              userManager.removeUserFromOrganisation('OrganisationName', 'nonExistingUserId1234', (b: boolean) => {
                  try {
                      assert.equal(b, false);
                      done();
                  } catch(e) {
                      return done(e);
                  }
              });
          });
      });*/
});
//# sourceMappingURL=user.js.map