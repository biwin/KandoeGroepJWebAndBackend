var user_1 = require("./user");
var Organisation = (function () {
    function Organisation(_name, _memberIds) {
        this._name = _name;
        this._memberIds = _memberIds;
        this._groups = [];
        this._members = [];
        for (var i = 0; i < this._memberIds.length; i++) {
            var organisatorId = this._memberIds[i];
            var newUser = user_1.User.empty();
            newUser._name = organisatorId;
            this._members.push(newUser);
        }
    }
    Object.defineProperty(Organisation.prototype, "groups", {
        get: function () {
            return this._groups;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Organisation.prototype, "members", {
        get: function () {
            return this._members;
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