var assert = require('assert');
var groupManager_1 = require("../app/backend/logic/groupManager");
var organisationManager_1 = require("../app/backend/logic/organisationManager");
var group_1 = require("../app/backend/model/group");
var organisation_1 = require("../app/backend/model/organisation");
var groupManager;
var organisationManager;
before(function (done) {
    groupManager = new groupManager_1.GroupManager();
    organisationManager = new organisationManager_1.OrganisationManager();
    done();
});
describe("GroupManager", function () {
    describe("createGroup", function () {
        var group;
        var organisation;
        before(function (done) {
            this.timeout(0);
            organisation = new organisation_1.Organisation("Delhaize", []);
            organisationManager.createOrganisation(organisation, function (o) {
                organisation = o;
                done();
            });
        });
        it("Create group, should return group from database", function (done) {
            this.timeout(0);
            group = new group_1.Group("Voeding", "Ploeg voeding", organisation._id, []);
            groupManager.createGroup(group, function (g) {
                try {
                    groupManager.getGroupById(g._id, function (newGroup) {
                        assert.equal(group._name, newGroup._name);
                        assert.equal(group._description, newGroup._description);
                        assert.equal(group._organisationId, newGroup._organisationId);
                        group = g;
                        organisationManager.getOrganisationById(organisation._id, function (newOrganisation) {
                            assert.ok(newOrganisation._groupIds.indexOf(group._id) > -1);
                            done();
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
    describe("createGroupTwice", function () {
        var organisation;
        var group;
        before(function (done) {
            this.timeout(0);
            organisation = new organisation_1.Organisation("Delhaize", []);
            organisationManager.createOrganisation(organisation, function (newOrganisation) {
                organisation = newOrganisation;
                groupManager.createGroup(new group_1.Group("Voeding", "Ploeg voeding", newOrganisation._id, []), function (g) {
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
            this.timeout(0);
            var group2 = new group_1.Group("Voeding", "Ploeg voeding", organisation._id, []);
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
            this.timeout(0);
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
});
//# sourceMappingURL=group.js.map