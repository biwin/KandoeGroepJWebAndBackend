var Theme = (function () {
    function Theme(_name, _description, _organisatorIds, _tags, _subThemes) {
        this._name = _name;
        this._description = _description;
        this._organisatorIds = _organisatorIds;
        this._tags = _tags;
        this._subThemes = _subThemes;
    }
    Theme.empty = function () {
        return new Theme("", "", [], [], []);
    };
    return Theme;
})();
exports.Theme = Theme;
//# sourceMappingURL=theme.js.map