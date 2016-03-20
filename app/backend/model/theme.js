"use strict";
var Theme = (function () {
    function Theme(_name, _description, 
        //List contains the creator 
        _organisatorIds, 
        //List of child theme id's
        _subThemes, 
        //Is null when private and the organisation id of an organisation when linked to one
        _organisationId, _tags) {
        this._name = _name;
        this._description = _description;
        this._organisatorIds = _organisatorIds;
        this._subThemes = _subThemes;
        this._organisationId = _organisationId;
        this._tags = _tags;
    }
    Theme.empty = function () {
        return new Theme("", "", [], [], "", []);
    };
    return Theme;
}());
exports.Theme = Theme;
