var group_1 = require("./group");
var Organisation = (function () {
    function Organisation(_name, _memberIds) {
        this._name = _name;
        this._memberIds = _memberIds;
        this._groupIds = [];
        this._organisatorIds = [];
    }
    Object.defineProperty(Organisation.prototype, "groups", {
        get: function () {
            //TODO: call backend
            var groups = [];
            if (this._groupIds) {
                for (var i = 0; i < this._groupIds.length; i++) {
                    var groupId = this._groupIds[i];
                    var newGroup = group_1.Group.empty();
                    newGroup._name = groupId;
                    newGroup._organisationId = this._id;
                    groups.push(newGroup);
                }
            }
            return groups;
        },
        enumerable: true,
        configurable: true
    });
    Organisation.empty = function () {
        return new Organisation("", []);
    };
    return Organisation;
})();
exports.Organisation = Organisation;
//# sourceMappingURL=organisation.js.map