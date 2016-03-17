"use strict";
var Theme = (function () {
    function Theme(_name, _description, _organisatorIds, _subThemes, _organisationId, _tags) {
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
//# sourceMappingURL=theme.js.map