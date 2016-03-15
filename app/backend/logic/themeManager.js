var themeDao_1 = require("../dao/themeDao");
var organisationManager_1 = require("./organisationManager");
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
    ThemeManager.prototype.getAllThemes = function (userId, callback) {
        var _this = this;
        var oMgr = new organisationManager_1.OrganisationManager();
        var myAccesableThemes = [];
        this._dao.readAllThemes(userId, function (themes) {
            myAccesableThemes = themes;
            oMgr.getAllOrganisationIdsOfUserById(userId, function (organisationIds) {
                var counter = 0;
                organisationIds.forEach(function (organisationId) {
                    _this._dao.readAllThemesByOrganisationId(organisationId, function (organisationThemes) {
                        organisationThemes.forEach(function (theme) {
                            if (JSON.stringify(myAccesableThemes).indexOf(JSON.stringify(theme)) < 0) {
                                myAccesableThemes.push(theme);
                            }
                        });
                        if (++counter == organisationIds.length) {
                            callback(myAccesableThemes);
                        }
                    });
                });
            });
        });
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
    ThemeManager.prototype.createSubTheme = function (theme, parentThemeId, callback) {
        var _this = this;
        this.createTheme(theme, function (theme) {
            if (parentThemeId != "") {
                _this._dao.addSubThemeToTheme(parentThemeId, theme._id, function (b) {
                    if (b)
                        callback(theme);
                    else
                        callback(null);
                });
            }
        });
    };
    ThemeManager.prototype.getCardsByIds = function (cardIds, callback) {
        this._dao.readCardsByIds(cardIds, callback);
    };
    ThemeManager.prototype.getThemesOfOrganisationById = function (organisationId, callback) {
        this._dao.getThemesOfOrganisationById(organisationId, callback);
    };
    return ThemeManager;
})();
exports.ThemeManager = ThemeManager;
//# sourceMappingURL=themeManager.js.map