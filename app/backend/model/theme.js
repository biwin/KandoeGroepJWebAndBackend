var Theme = (function () {
    function Theme(name, description, tags) {
        this._name = name;
        this.description = description;
        this.tags = tags;
    }
    Object.defineProperty(Theme.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return Theme;
})();
exports.Theme = Theme;
//# sourceMappingURL=theme.js.map