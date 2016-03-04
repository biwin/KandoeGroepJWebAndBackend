import assert = require('assert');

import {GroupManager} from "../app/backend/logic/groupManager";

import {Group} from "../app/backend/model/group";

var groupManager: GroupManager;

before(function(done: any) {
    groupManager = new GroupManager();

    done();
});

describe("GroupManager", () => {
    describe("createGroup", () => {
        var group: Group;

        it("Create group, should return group from database", function(done: any) {
            this.timeout(0);

            group = new Group("Voeding", "Ploeg voeding", "Delhaize", []);
            groupManager.createGroup(group, (g: Group) => {
                try {
                    groupManager.getGroupById(g._id, (newGroup: Group) => {
                        assert.equal(group._name, newGroup._name);
                        assert.equal(group._description, newGroup._description);
                        assert.equal(group._organisationId, newGroup._organisationId);

                        group = g;

                        done();
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
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
    });
});