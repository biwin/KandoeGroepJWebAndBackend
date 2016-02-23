/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var assert = require('assert');
var userManager_1 = require("../app/backend/logic/userManager");
var user_1 = require("../app/backend/model/user");
var organisation_1 = require("../app/backend/model/organisation");
var group_1 = require("../app/backend/model/group");
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
                    userManager.addToOrganisation('OrganisationName', michael._id, function () {
                        done();
                    });
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
                    console.log('Michael id2: ' + michael._id);
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
    //Group-testen
    //todo testjes bij steken
    describe('addUserToGroup', function () {
        var jan;
        var group;
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerUser(new user_1.User('Jan', 'addusertogroup@student.kdg.be', 'password', 'admin'), function (u) {
                    jan = u;
                    var organisation = new organisation_1.Organisation('Organisation');
                    userManager.registerGroup(new group_1.Group(organisation._name, 'Group', 'Description'), function (g) {
                        group = g;
                        done();
                    });
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Add user to group', function (done) {
            this.timeout(0);
            userManager.addToGroup(jan._id, group._name, function (g) {
                try {
                    assert.equal((group._users.indexOf(jan._id) > -1), true);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    });
    describe('removeUserFromGroupById', function () {
        var jan;
        var group;
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerUser(new user_1.User('Jan', 'addusertogroup@student.kdg.be', 'password', 'admin'), function (u) {
                    jan = u;
                    userManager.registerGroup(new group_1.Group('Organisatie', 'Group', 'Description'), function (g) {
                        group = g;
                    });
                    userManager.addToGroup(jan._id, group._name, function () {
                        done();
                    });
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Add user to group', function (done) {
            this.timeout(0);
            userManager.removeUserFromGroupById(jan._id, group._id, function (g) {
                try {
                    assert.equal((group._users.indexOf(jan._id) > -1), false);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    });
    describe('getGroupByName', function () {
        var group;
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerGroup(new group_1.Group('Organisation', 'Group', 'Descript'), function (g) {
                    group = g;
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Read existing group, should return the group', function (done) {
            userManager.getGroupByName(group._name, function (g) {
                try {
                    assert.equal(group._name, g._name);
                    done();
                }
                catch (e) {
                    return done(e);
                }
            });
        });
    });
    describe('getGroupById', function () {
        var group;
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerGroup(new group_1.Group('Organisation', 'Group', 'Descript'), function (g) {
                    group = g;
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Read existing group, should return the group', function (done) {
            userManager.getGroupByName(group._id, function (g) {
                try {
                    assert.equal(group._id, g._id);
                    done();
                }
                catch (e) {
                    return done(e);
                }
            });
        });
    });
    describe('createGroupInOrganisation', function () {
        var jan;
        var organisatie;
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerUser(new user_1.User('Jan', 'jan.somers@student.kdg.be', 'password', 'admin'), function (u) {
                    jan = u;
                });
                userManager.createOrganisation(new organisation_1.Organisation('Organisatie'), function (o) {
                    organisatie = o;
                });
                userManager.addToOrganisation(organisatie._name, jan._id, function () {
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Add group to organisation of the user', function (done) {
            this.timeout(0);
            var userInOrg = organisatie._organisators.indexOf(jan._id) > -1;
            if (userInOrg) {
                var group = new group_1.Group(organisatie._name, 'Groep', 'Description');
                userManager.registerGroup(group, function (g) {
                    try {
                        assert.equal(g._name, group._name);
                        done();
                    }
                    catch (e) {
                        done(e);
                    }
                });
            }
            else {
                throw new Error('user not in organiation');
            }
        });
    });
    describe('deleteGroup', function () {
        var group;
        var organisation = new organisation_1.Organisation('Organisation');
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerGroup(new group_1.Group(organisation._name, 'Group', 'Description'), function (g) {
                    group = g;
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Remove group and reference in organisation', function (done) {
            this.timeout(0);
            userManager.removeGroup(group._id, function (b) {
                try {
                    var inOrg = organisation.groups.indexOf(group._id) > -1;
                    assert.equal(b, false);
                    assert.equal(inOrg, false);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    });
});
//# sourceMappingURL=user.js.map