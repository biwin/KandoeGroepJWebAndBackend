var Organisation = (function () {
    function Organisation(_name, _organisatorIds) {
        this._name = _name;
        this._organisatorIds = _organisatorIds;
    }
    Object.defineProperty(Organisation.prototype, "groups", {
        get: function () {
            return this._groups;
        },
        enumerable: true,
        configurable: true
    });
    return Organisation;
})();
exports.Organisation = Organisation;
//# sourceMappingURL=organisation.js.map