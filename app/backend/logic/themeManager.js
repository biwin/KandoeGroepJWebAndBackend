var themeDao_1 = require("../dao/themeDao");
var ThemeManager = (function () {
    function ThemeManager() {
        this._dao = new themeDao_1.ThemeDao();
    }
    ThemeManager.prototype.clearDatabase = function (callback) {
        this._dao.clearDatabase(callback);
    };
    ThemeManager.prototype.get = function (name, callback) {
        this._dao.read(name, callback);
    };
    ThemeManager.prototype.add = function (t, callback) {
        this._dao.create(t, callback);
    };
    return ThemeManager;
})();
exports.ThemeManager = ThemeManager;
//# sourceMappingURL=themeManager.js.map