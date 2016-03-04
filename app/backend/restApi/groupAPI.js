var groupManager_1 = require("../logic/groupManager");
var GroupAPI = (function () {
    function GroupAPI() {
    }
    GroupAPI.create = function (group, res) {
        this.mgr.createGroup(group, function (g) {
            res.send(g);
        });
    };
    GroupAPI.find = function (groupId, res) {
        this.mgr.getGroupById(groupId, function (group) {
            res.send(group);
        });
    };
    GroupAPI.mgr = new groupManager_1.GroupManager();
    return GroupAPI;
})();
exports.GroupAPI = GroupAPI;
//# sourceMappingURL=groupAPI.js.map