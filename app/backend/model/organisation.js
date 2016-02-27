var Organisation = (function () {
    function Organisation(_name, _members) {
        this._name = _name;
        this._members = _members;
        this._groups = [];
        this._organisators = [];
    }
    Organisation.empty = function () {
        return new Organisation("", []);
    };
    return Organisation;
})();
exports.Organisation = Organisation;
//# sourceMappingURL=organisation.js.map