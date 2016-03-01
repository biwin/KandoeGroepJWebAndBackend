var group_1 = require("./group");
var user_1 = require("./user");
var Organisation = (function () {
    function Organisation(_name, _memberIds) {
        this._name = _name;
        this._memberIds = _memberIds;
        this._groupIds = [];
        this._organisatorIds = [];
    }
    Organisation.prototype.getGroups = function () {
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
    };
    Object.defineProperty(Organisation.prototype, "members", {
        get: function () {
            //TODO: call backend
            var members = [];
            if (this._memberIds) {
                for (var i = 0; i < this._memberIds.length; i++) {
                    var memberId = this._memberIds[i];
                    var newUser = user_1.User.empty();
                    newUser._name = memberId;
                    members.push(newUser);
                }
            }
            return members;
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