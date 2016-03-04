var groupDao_1 = require("../dao/groupDao");
var GroupManager = (function () {
    function GroupManager() {
        this._dao = new groupDao_1.GroupDao();
    }
    GroupManager.prototype.createGroup = function (group, callback) {
        var _this = this;
        this.groupExists(group._name, group._organisationId, function (exists) {
            if (exists) {
                callback(null);
            }
            else {
                _this._dao.createGroup(group, callback);
            }
        });
    };
    GroupManager.prototype.groupExists = function (groupName, organisationId, callback) {
    };
    GroupManager.prototype.getGroupById = function (groupId, callback) {
    };
    GroupManager.prototype.removeGroupById = function (groupId, callback) {
    };
    return GroupManager;
})();
exports.GroupManager = GroupManager;
//# sourceMappingURL=groupManager.js.map