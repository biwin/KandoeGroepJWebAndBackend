var Organisation = (function () {
    function Organisation(_name, _organisators) {
        this._name = _name;
        this._organisators = _organisators;
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