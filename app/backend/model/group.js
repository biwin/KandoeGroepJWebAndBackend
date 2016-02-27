var user_1 = require("./user");
var organisation_1 = require("./organisation");
var Group = (function () {
    function Group(_name, _description, _organisationId, _memberIds) {
        this._name = _name;
        this._description = _description;
        this._organisationId = _organisationId;
        this._memberIds = _memberIds;
    }
    Object.defineProperty(Group.prototype, "members", {
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
    Object.defineProperty(Group.prototype, "organisation", {
        get: function () {
            //TODO: call backend
            var organisation = organisation_1.Organisation.empty();
            organisation._name = this._organisationId;
            return organisation;
        },
        enumerable: true,
        configurable: true
    });
    Group.empty = function () {
        return new Group("", "", "", []);
    };
    return Group;
})();
exports.Group = Group;
//# sourceMappingURL=group.js.map