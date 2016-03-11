var groupManager_1 = require("../logic/groupManager");
var GroupAPI = (function () {
    function GroupAPI() {
    }
    GroupAPI.create = function (group, res) {
        GroupAPI.mgr.createGroup(group, function (g) {
            res.send(g);
        });
    };
    GroupAPI.find = function (groupId, res) {
        GroupAPI.mgr.getGroupById(groupId, function (group) {
            res.send(group);
        });
    };
    GroupAPI.getGroupsOfOrganisationById = function (organisationId, res) {
        GroupAPI.mgr.getGroupsOfOrganisationById(organisationId, function (groups) {
            res.send(groups);
        });
    };
    GroupAPI.getGroupsOfUserById = function (req, res) {
        GroupAPI.mgr.getGroupsOfUserById(req.params.id, function (groups) {
            res.send(groups);
        });
    };
    GroupAPI.mgr = new groupManager_1.GroupManager();
    return GroupAPI;
})();
exports.GroupAPI = GroupAPI;
//# sourceMappingURL=groupAPI.js.map