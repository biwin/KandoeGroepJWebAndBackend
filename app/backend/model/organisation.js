"use strict";
var Organisation = (function () {
    function Organisation(_name, _memberIds) {
        this._name = _name;
        this._memberIds = _memberIds;
        this._groupIds = [];
        this._organisatorIds = [];
    }
    Organisation.empty = function () {
        return new Organisation("", []);
    };
    return Organisation;
}());
exports.Organisation = Organisation;
