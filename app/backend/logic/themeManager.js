var themeDao_1 = require("../dao/themeDao");
var ThemeManager = (function () {
    function ThemeManager() {
        this._dao = new themeDao_1.ThemeDao();
    }
    ThemeManager.prototype.clearDatabase = function (callback) {
        this._dao.clearDatabase(callback);
    };
    ThemeManager.prototype.createTheme = function (theme, callback) {
        var _this = this;
        this.themeExists(theme._name, function (exists) {
            if (exists) {
                callback(null);
            }
            else {
                _this._dao.createTheme(theme, function () {
                    _this.getTheme(theme._name, callback);
                });
            }
        });
    };
    ThemeManager.prototype.getTheme = function (id, callback) {
        this._dao.readTheme(id, callback);
    };
    ThemeManager.prototype.themeExists = function (name, callback) {
        this.getTheme(name, function (t) {
            callback(t != null);
        });
    };
    ThemeManager.prototype.createCard = function (card, callback) {
        this._dao.createCard(card, callback);
    };
    ThemeManager.prototype.getAllThemes = function (callback) {
        this._dao.readAllThemes(callback);
    };
    ThemeManager.prototype.getCards = function (themeId, callback) {
        this._dao.readCards(themeId, callback);
    };
    return ThemeManager;
})();
exports.ThemeManager = ThemeManager;
//# sourceMappingURL=themeManager.js.map