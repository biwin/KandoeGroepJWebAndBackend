var assert = require('assert');
var groupManager_1 = require("../app/backend/logic/groupManager");
var group_1 = require("../app/backend/model/group");
var groupManager;
before(function (done) {
    groupManager = new groupManager_1.GroupManager();
    done();
});
describe("GroupManager", function () {
    describe("createGroup", function () {
        var group;
        it("Create group, should return group from database", function (done) {
            this.timeout(0);
            group = new group_1.Group("Voeding", "Ploeg voeding", "Delhaize", []);
            groupManager.createGroup(group, function (g) {
                try {
                    groupManager.getGroupById(g._id, function (newGroup) {
                        assert.equal(group._name, newGroup._name);
                        assert.equal(group._description, newGroup._description);
                        assert.equal(group._organisationId, newGroup._organisationId);
                        group = g;
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
                groupManager.removeGroupById(group._id, function () {
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
    });
});
//# sourceMappingURL=group.js.map