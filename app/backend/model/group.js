"use strict";
var Group = (function () {
    function Group(_name, _description, _organisationId, _memberIds) {
        this._name = _name;
        this._description = _description;
        this._organisationId = _organisationId;
        this._memberIds = _memberIds;
    }
    Group.empty = function () {
        return new Group("", "", "", []);
    };
    return Group;
}());
exports.Group = Group;
