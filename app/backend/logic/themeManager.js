var themeDao_1 = require("../dao/themeDao");
var ThemeManager = (function () {
    function ThemeManager() {
        this._dao = new themeDao_1.ThemeDao();
    }
    ThemeManager.prototype.clearDatabase = function (callback) {
        this._dao.clearDatabase(callback);
    };
    ThemeManager.prototype.createTheme = function (theme, callback) {
        this._dao.createTheme(theme, callback);
    };
    ThemeManager.prototype.getTheme = function (id, callback) {
        this._dao.readTheme(id, callback);
    };
    ThemeManager.prototype.removeThemeById = function (themeId, callback) {
        this._dao.deleteThemeById(themeId, callback);
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
    ThemeManager.prototype.removeCardFromTheme = function (themeId, cardId, callback) {
        this._dao.clearThemeIdOfCard(themeId, cardId, callback);
    };
    ThemeManager.prototype.deleteCardsFromTheme = function (themeId, callback) {
        this._dao.removeCardsFromTheme(themeId, callback);
    };
    return ThemeManager;
})();
exports.ThemeManager = ThemeManager;
//# sourceMappingURL=themeManager.js.map