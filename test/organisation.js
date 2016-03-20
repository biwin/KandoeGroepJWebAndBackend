/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
"use strict";
var assert = require('assert');
var organisationManager_1 = require("../app/backend/logic/organisationManager");
var userManager_1 = require("../app/backend/logic/userManager");
var organisation_1 = require("../app/backend/model/organisation");
var user_1 = require("../app/backend/model/user");
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
});
//# sourceMappingURL=organisation.js.map