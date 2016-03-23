/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
"use strict";
var assert = require('assert');
var groupManager_1 = require("../app/backend/logic/groupManager");
var organisationManager_1 = require("../app/backend/logic/organisationManager");
var userManager_1 = require("../app/backend/logic/userManager");
var group_1 = require("../app/backend/model/group");
var organisation_1 = require("../app/backend/model/organisation");
var user_1 = require("../app/backend/model/user");
var groupManager;
var organisationManager;
var userManager;
before(function (done) {
    groupManager = new groupManager_1.GroupManager();
    organisationManager = new organisationManager_1.OrganisationManager();
    userManager = new userManager_1.UserManager();
    done();
});
describe("GroupManager", function () {
    describe("createGroup", function () {
        var group;
        var organisation;
        var user;
        before(function (done) {
            this.timeout(100000);
            user = new user_1.User("Michaël", "test@GroupTesting.com", "password", "test");
            userManager.deleteTestUsers(function () {
                userManager.registerUser(user, function (u) {
                    user = u;
                    organisation = new organisation_1.Organisation("createGroupTestOrg", []);
                    organisation._organisatorIds.push(u._id);
                    organisationManager.createOrganisation(organisation, function (o) {
                        organisation = o;
                        done();
                    });
                });
            });
        });
        it("Create group, should return group from database", function (done) {
            this.timeout(100000);
            group = new group_1.Group("Voeding", "Ploeg voeding", organisation._id, [user._id]);
            groupManager.createGroup(group, function (g) {
                try {
                    assert.notEqual(g, null);
                    groupManager.getGroupById(g._id, function (newGroup) {
                        assert.equal(group._name, newGroup._name);
                        assert.equal(group._description, newGroup._description);
                        assert.equal(group._organisationId, newGroup._organisationId);
                        group = g;
                        organisationManager.getOrganisationById(organisation._id, function (newOrganisation) {
                            assert.ok(newOrganisation._groupIds.indexOf(group._id) > -1);
                            userManager.getUserById(user._id, function (newUser) {
                                assert.ok(newUser._memberOfGroupIds.indexOf(group._id) > -1);
                                done();
                            });
                        });
                    });
                }
                catch (e) {
                    done(e);
                }
            });
        });
        after(function (done) {
            this.timeout(100000);
            try {
                userManager.removeUserById(user._id, function () {
                    groupManager.removeGroupById(group._id, function () {
                        organisationManager.removeOrganisationById(organisation._id, function () {
                            done();
                        });
                    });
                });
            }
            catch (e) {
                done(e);
            }
        });
    });
    describe("createGroupTwice", function () {
        var organisation;
        var group;
        before(function (done) {
            this.timeout(100000);
            organisation = new organisation_1.Organisation("CreateGroupTwiceOrganisation", []);
            organisationManager.createOrganisation(organisation, function (newOrganisation) {
                organisation = newOrganisation;
                groupManager.createGroup(new group_1.Group("CreateGroupTwiceGroup", "Ploeg voeding", newOrganisation._id, []), function (g) {
                    try {
                        group = g;
                        done();
                    }
                    catch (e) {
                        done(e);
                    }
                });
            });
        });
        it("Create group with the same name in the same organisation, should return null from database", function (done) {
            this.timeout(100000);
            var group2 = new group_1.Group("CreateGroupTwiceGroup", "Ploeg voeding", organisation._id, []);
            groupManager.createGroup(group2, function (g) {
                try {
                    assert.equal(g, null);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
        after(function (done) {
            this.timeout(100000);
            try {
                groupManager.removeGroupById(group._id, function () {
                    organisationManager.removeOrganisationById(organisation._id, function () {
                        done();
                    });
                });
            }
            catch (e) {
                done(e);
            }
        });
    });
    describe("removeGroupById", function () {
        var organisation;
        var group;
        var member1;
        var member2;
        before(function (done) {
            this.timeout(100000);
            organisation = new organisation_1.Organisation("RemoveGroupByIdOrg", []);
            group = new group_1.Group("Voeding", "Ploeg voeding", "", []);
            member1 = new user_1.User("Michaël", "removeGroupTests@tests.be", "password", "test");
            member2 = new user_1.User("Michaël2", "removeGroupTests@tests.com", "password", "test");
            userManager.deleteTestUsers(function () {
                userManager.registerUser(member1, function (u1) {
                    member1 = u1;
                    userManager.registerUser(member2, function (u2) {
                        member2 = u2;
                        organisationManager.createOrganisation(organisation, function (o) {
                            organisation = o;
                            try {
                                group._organisationId = o._id;
                            }
                            catch (e) {
                                done(e);
                            }
                            groupManager.createGroup(group, function (g) {
                                group = g;
                                groupManager.addUserByEmailToGroupById(member1._email, group._id, function () {
                                    groupManager.addUserByEmailToGroupById(member2._email, group._id, function () {
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        it("Delete group, should also the references from users", function (done) {
            this.timeout(100000);
            groupManager.removeGroupById(group._id, function () {
                try {
                    groupManager.getGroupById(group._id, function (g) {
                        assert.ok(g == null, "Group should be deleted, database should return null");
                        userManager.getUserById(member1._id, function (u1) {
                            assert.ok(u1._memberOfGroupIds.indexOf(group._id) < 0, "Reference in _memberOfGroupIds array of User-object should be deleted");
                            userManager.getUserById(member2._id, function (u2) {
                                assert.ok(u2._memberOfGroupIds.indexOf(group._id) < 0, "Reference in _memberOfGroupIds array of User-object should be deleted");
                                done();
                            });
                        });
                    });
                }
                catch (e) {
                    done(e);
                }
            });
        });
        after(function (done) {
            this.timeout(100000);
            try {
                organisationManager.removeOrganisationById(organisation._id, function (b) {
                    userManager.removeUserById(member1._id, function () {
                        userManager.removeUserById(member2._id, function () {
                            done();
                        });
                    });
                });
            }
            catch (e) {
                done(e);
            }
        });
    });
});
after(function (done) {
    this.timeout(100000);
    userManager.deleteTestUsers(function () {
        done();
    });
});
//# sourceMappingURL=group.js.map