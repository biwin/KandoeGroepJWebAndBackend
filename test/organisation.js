/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
"use strict";
var assert = require('assert');
var organisationManager_1 = require("../app/backend/logic/organisationManager");
var userManager_1 = require("../app/backend/logic/userManager");
var groupManager_1 = require("../app/backend/logic/groupManager");
var themeManager_1 = require("../app/backend/logic/themeManager");
var organisation_1 = require("../app/backend/model/organisation");
var user_1 = require("../app/backend/model/user");
var group_1 = require("../app/backend/model/group");
var theme_1 = require("../app/backend/model/theme");
var organisationManager;
var userManager;
before(function (done) {
    organisationManager = new organisationManager_1.OrganisationManager();
    userManager = new userManager_1.UserManager();
    done();
});
describe("OrganisationManager", function () {
    describe("createOrganisation", function () {
        var organisation;
        var user;
        before(function (done) {
            this.timeout(0);
            user = new user_1.User("MichaelDeBoey", "michael.deboey@student.kdg.be", "password", "test");
            userManager.registerUser(user, function (u) {
                try {
                    user = u;
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
        it("Create organisation, should return organisation from database", function (done) {
            this.timeout(0);
            organisation = new organisation_1.Organisation("Delhaize", []);
            organisation._organisatorIds.push(user._id);
            organisationManager.createOrganisation(organisation, function (o) {
                try {
                    organisationManager.getOrganisationById(o._id, function (newOrganisation) {
                        assert.equal(organisation._name, newOrganisation._name);
                        organisation = o;
                        userManager.getUserById(user._id, function (newUser) {
                            assert.ok(newUser._organisatorOf.indexOf(organisation._id) > -1);
                            done();
                        });
                        done();
                    });
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
    describe("createOrganisationTwice", function () {
        var organisation;
        before(function (done) {
            this.timeout(0);
            organisationManager.createOrganisation(new organisation_1.Organisation("Delhaize", []), function (o) {
                try {
                    organisation = o;
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
        it("Create organisation with the same name, should return null from database", function (done) {
            this.timeout(0);
            var organisation2 = new organisation_1.Organisation("Delhaize", []);
            organisationManager.createOrganisation(organisation2, function (o) {
                try {
                    assert.equal(o, null);
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
                organisationManager.removeOrganisationById(organisation._id, function () {
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
    });
    describe("removeOrganisationById", function () {
        var organisation;
        var admin;
        var member;
        var group;
        var theme;
        var groupManager = new groupManager_1.GroupManager();
        var themeManager = new themeManager_1.ThemeManager();
        before(function (done) {
            this.timeout(0);
            organisation = new organisation_1.Organisation("Delhaize", []);
            admin = new user_1.User("Michaël", "michael.deboey@student.kdg.be", "password", "test");
            member = new user_1.User("Michaël2", "michael.deboey.2@student.kdg.be", "password", "test");
            group = new group_1.Group("Voeding", "Ploeg voeding", "", []);
            theme = new theme_1.Theme("Nieuwe producten", "", []);
            userManager.deleteTestUsers(function () {
                userManager.registerUser(admin, function (u) {
                    admin = u;
                    organisation._organisatorIds.push(u._id);
                    organisationManager.createOrganisation(organisation, function (o) {
                        organisation = o;
                        group._organisationId = organisation._id;
                        theme._organisationId = organisation._id;
                        userManager.registerUser(member, function (u2) {
                            member = u2;
                            organisationManager.addUserByEmailToOrganisationById(member._email, false, organisation._id, function () {
                                groupManager.createGroup(group, function (g) {
                                    group = g;
                                    themeManager.createTheme(theme, function (t) {
                                        theme = t;
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        it("Delete organisation, should also delete all groups and delete the references from users and themes", function (done) {
            this.timeout(0);
            organisationManager.removeOrganisationById(organisation._id, function () {
                try {
                    organisationManager.getOrganisationById(organisation._id, function (o) {
                        assert.ok(o == null, "Organisation should be deleted, database should return null");
                        userManager.getUserById(admin._id, function (u) {
                            assert.ok(u._organisatorOf.indexOf(organisation._id) < 0, "Reference in _organisatorOf array User-object should be deleted");
                            userManager.getUserById(member._id, function (u2) {
                                assert.ok(u2._memberOf.indexOf(organisation._id) < 0, "Reference in _memberOf array User-object should be deleted");
                                groupManager.getGroupById(group._id, function (g) {
                                    assert.ok(g == null, "Group should be deleted, database should return null");
                                    themeManager.getTheme(theme._id, function (t) {
                                        assert.ok(t._organisationId == null, "Reference of _organisationId in Theme-object should be deleted (= null)");
                                        done();
                                    });
                                });
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
            this.timeout(0);
            try {
                userManager.removeUserById(admin._id, function () {
                    userManager.removeUserById(member._id, function () {
                        themeManager.removeThemeById(theme._id, function () {
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
    userManager.deleteTestUsers(function () {
        done();
    });
});
//# sourceMappingURL=organisation.js.map