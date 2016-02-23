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
    //region user-tests
    describe('createUser', function () {
        var user = new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin');
        it('Register user, should return user from database', function (done) {
            this.timeout(0);
            userManager.registerUser(user, function (u) {
                try {
                    assert.equal(u._name, user._name);
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
                userManager.deleteUser(user._name, function () { done(); });
            }
            catch (e) {
                done();
            }
        });
    }); //check
    describe('getUserByName', function () {
        it('Read non-existing user, should return the null', function (done) {
            this.timeout(0);
            userManager.getUser('Jasper', function (u) {
                try {
                    assert.equal(null, u);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    }); //check
    describe('getUserByName', function () {
        var user = new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin');
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerUser(user, function (u) {
                    user = u;
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Read existing user, should return the user', function (done) {
            userManager.getUser(user._name, function (u) {
                try {
                    assert.equal(user._name, u._name);
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
                userManager.deleteUser(user._name, function () { done(); });
            }
            catch (e) {
                done();
            }
        });
    }); //check
    describe('getAllUsers', function () {
        var users = [new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin'),
            new user_1.User('Jan', 'jasper.catthoor@student.kdg.be', 'password', 'admin'),
            new user_1.User('Enio', 'jasper.catthoor@student.kdg.be', 'password', 'admin')];
        before(function (done) {
            this.timeout(0);
            try {
                var amountOfUsersRegistered = 0;
                for (var index in users) {
                    userManager.registerUser(users[index], function (u) {
                        users[index] = u;
                        if (++amountOfUsersRegistered == 3)
                            done();
                    });
                }
            }
            catch (e) {
                done(e);
            }
        });
        it('Read all existing users', function (done) {
            try {
                userManager.getAllUsers(function (userArray) {
                    assert.equal(userArray.length == users.length, true);
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
        after(function (done) {
            this.timeout(0);
            try {
                var amountOfUsersDeleted = 0;
                for (var index in users) {
                    userManager.deleteUserById(users[index]._id, function () {
                        if (++amountOfUsersDeleted == 3)
                            done();
                    });
                }
            }
            catch (e) {
                done();
            }
        });
    }); //check
    describe('getUserById', function () {
        var user = new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin');
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerUser(user, function (u) {
                    user = u;
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Read existing user, should return the user', function (done) {
            userManager.getUserById(user._id, function (u) {
                try {
                    assert.equal('Jasper', u._name);
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
                userManager.deleteUser(user._name, function () { done(); });
            }
            catch (e) {
                done();
            }
        });
    }); //check
    describe('deleteUser', function () {
        it('Delete non-existing user, should return false', function (done) {
            userManager.deleteUser('Jasper', function (b) {
                try {
                    assert.equal(b, false);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    }); //check
    describe('deleteUser', function () {
        var user = new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin');
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerUser(user, function (u) {
                    user = u;
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Delete existing user, should return true', function (done) {
            this.timeout(0);
            userManager.deleteUser(user._name, function (b) {
                try {
                    assert.equal(b, true);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    }); //check
    //endregion
    //region organisation-test
    describe('createOrganisation', function () {
        var jasper = new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin');
        var rob = new user_1.User('Rob', 'rob.hendrickx@student.kdg.be', 'password', 'admin');
        var users = [jasper._id, rob._id];
        var organisation = new organisation_1.Organisation('OrganisationName', users);
        before(function (done) {
            this.timeout(0);
            var users = 0;
            try {
                userManager.registerUser(jasper, function (u) {
                    jasper = u;
                    if (++users == 2)
                        done();
                });
                userManager.registerUser(rob, function (u) {
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
            userManager.createOrganisation(organisation, function (o) {
                try {
                    organisation = o;
                    assert.equal(organisation._name, o._name);
                    assert.equal(organisation._organisators.length, users.length);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
        after(function (done) {
            var steps = 0;
            try {
                userManager.deleteUserById(jasper._id, function () {
                    if (++steps == 3)
                        done();
                });
                userManager.deleteUserById(rob._id, function () {
                    if (++steps == 3)
                        done();
                });
                userManager.removeOrganisationById(organisation._id, function () {
                    if (++steps == 3)
                        done();
                });
            }
            catch (e) {
                done(e);
            }
        });
    }); //check
    describe('addUserToOrganisation', function () {
        var jan = new user_1.User('Jan', 'jan.somers@student.kdg.be', 'password', 'admin');
        var organisation = new organisation_1.Organisation('OrganisationName', []);
        before(function (done) {
            this.timeout(0);
            try {
                var steps = 0;
                userManager.registerUser(jan, function (u) {
                    jan = u;
                    if (++steps == 2)
                        done();
                });
                userManager.createOrganisation(organisation, function (o) {
                    organisation = o;
                    if (++steps == 2)
                        done();
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Add user to organisation, should return organisation from database', function (done) {
            this.timeout(0);
            userManager.addToOrganisation(organisation._name, jan._id, function (o) {
                try {
                    assert.equal(o._organisators.length, 1);
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
                var steps = 0;
                userManager.deleteUserById(jan._id, function () {
                    if (++steps == 2)
                        done();
                });
                userManager.removeOrganisationById(organisation._id, function () {
                    if (++steps == 2)
                        done();
                });
            }
            catch (e) {
                done(e);
            }
        });
    }); //check
    describe('removeUserFromOrganisation', function () {
        var user = new user_1.User('Michael', 'michael.deboey@student.kdg.be', 'password', 'admin');
        var organisation = new organisation_1.Organisation('Organisation', [user._id]);
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerUser(user, function (u) {
                    user = u;
                    userManager.createOrganisation(organisation, function (o) {
                        organisation = o;
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
            userManager.removeUserFromOrganisationById(organisation._id, user._id, function (b) {
                try {
                    assert.equal(b, true);
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
                userManager.removeOrganisationById(organisation._id, function () {
                    userManager.deleteUserById(user._id, function () {
                        done();
                    });
                });
            }
            catch (e) {
                done(e);
            }
        });
    }); //check
    describe('addUserToGroup', function () {
        var jan = new user_1.User('Jan', 'addusertogroup@student.kdg.be', 'password', 'admin');
        var organisation = new organisation_1.Organisation('Organisation', [jan._id]);
        var group = new group_1.Group(organisation._name, 'Group', 'Description');
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerUser(jan, function (u) {
                    jan = u;
                    userManager.createOrganisation(organisation, function (o) {
                        organisation = o;
                        userManager.registerGroup(group, function (g) {
                            group = g;
                            done();
                        });
                    });
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Add user to group', function (done) {
            this.timeout(0);
            userManager.addToGroupById(jan._id, group._id, function (g) {
                try {
                    assert.equal((group._users.indexOf(jan._id) > -1), true);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
        after(function (done) {
            userManager.deleteUserById(jan._id, function () {
                userManager.removeGroupById(group._id, function () {
                    userManager.removeOrganisationById(organisation._id, function () {
                        done();
                    });
                });
            });
        });
    }); // check
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
                    userManager.addToGroupById(jan._id, group._name, function () {
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
                    done(e);
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
                    done(e);
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
            userManager.removeGroupById(group._id, function (b) {
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
    //endregion
});
//# sourceMappingURL=user.js.map