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
        this._dao.getGroupByNameAndOrganisationId(groupName, organisationId, function (group) {
            callback(group != null);
        });
    };
    GroupManager.prototype.getGroupById = function (groupId, callback) {
        this._dao.getGroupById(groupId, callback);
    };
    GroupManager.prototype.removeGroupById = function (groupId, callback) {
        this._dao.deleteGroupById(groupId, callback);
    };
    GroupManager.prototype.getGroupsOfOrganisationById = function (organisationId, callback) {
        this._dao.getGroupsOfOrganisationById(organisationId, callback);
    };
    return GroupManager;
})();
exports.GroupManager = GroupManager;
//# sourceMappingURL=groupManager.js.map