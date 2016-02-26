var Organisation = (function () {
    function Organisation(_name, _memberIds) {
        this._name = _name;
        this._memberIds = _memberIds;
    }
    Object.defineProperty(Organisation.prototype, "groups", {
        get: function () {
            return this._groups;
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