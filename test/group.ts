/*
import assert = require('assert');

import {GroupManager} from "../app/backend/logic/groupManager";
import {OrganisationManager} from "../app/backend/logic/organisationManager";

import {Group} from "../app/backend/model/group";
import {Organisation} from "../app/backend/model/organisation";

var groupManager: GroupManager;
var organisationManager: OrganisationManager;

before(function(done: any) {
    groupManager = new GroupManager();
    organisationManager = new OrganisationManager();

    done();
});

describe("GroupManager", () => {
    describe("createGroup", () => {
        var group: Group;
        var organisation: Organisation;

        before(function (done: any) {
            this.timeout(0);

            organisation = new Organisation("Delhaize", []);

            organisationManager.createOrganisation(organisation, (o: Organisation) => {
                organisation = o;

                done();
            });
        });

        it("Create group, should return group from database", function(done: any) {
            this.timeout(0);

            group = new Group("Voeding", "Ploeg voeding", organisation._id, []);
            groupManager.createGroup(group, (g: Group) => {
                try {
                    groupManager.getGroupById(g._id, (newGroup: Group) => {
                        assert.equal(group._name, newGroup._name);
                        assert.equal(group._description, newGroup._description);
                        assert.equal(group._organisationId, newGroup._organisationId);

                        group = g;

                        organisationManager.getOrganisationById(organisation._id, (newOrganisation: Organisation) => {
                            assert.ok(newOrganisation._groupIds.indexOf(group._id) > -1);

                            done();
                        });
                    });
                } catch(e) {
                    done(e);
                }
            });
        });

        after(function (done: any) {
            this.timeout(0);

            try {
                groupManager.removeGroupById(group._id, () => {
                    organisationManager.removeOrganisationById(organisation._id, () => {
                        done();
                    });
                });
            } catch (e) {
                done(e);
            }
        });
    });

    describe("createGroupTwice", () => {
        var organisation: Organisation;
        var group: Group;

        before(function (done: any) {
            this.timeout(0);

            organisation = new Organisation("Delhaize", []);

            organisationManager.createOrganisation(organisation, (newOrganisation: Organisation) => {
                organisation = newOrganisation;

                groupManager.createGroup(new Group("Voeding", "Ploeg voeding", newOrganisation._id, []), (g: Group) => {
                    try {
                        group = g;

                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });

        it("Create group with the same name in the same organisation, should return null from database", function(done: any) {
            this.timeout(0);

            var group2 = new Group("Voeding", "Ploeg voeding", organisation._id, []);
            groupManager.createGroup(group2, (g: Group) => {
                try {
                    assert.equal(g, null);

                    done();
                } catch(e) {
                    done(e);
                }
            });
        });

        after(function (done: any) {
            this.timeout(0);

            try {
                groupManager.removeGroupById(group._id, () => {
                    organisationManager.removeOrganisationById(organisation._id, () => {
                        done();
                    });
                });
            } catch (e) {
                done(e);
            }
        });
    });
});*/
