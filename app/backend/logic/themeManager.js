"use strict";
var themeDao_1 = require("../dao/themeDao");
var organisationManager_1 = require("./organisationManager");
/**
 * Class that is responsible for managing what data will be send to the database layer for snapshots
 * Gains information from organisationmanager when needed for a theme.
 */
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
        var myAccessibleThemes = [];
        this._dao.readAllThemes(userId, function (themes) {
            myAccessibleThemes = themes;
            oMgr.getAllOrganisationIdsOfUserById(userId, function (organisationIds) {
                var counter = 0;
                if (organisationIds.length == 0) {
                    callback(myAccessibleThemes);
                }
                else {
                    organisationIds.forEach(function (organisationId) {
                        _this._dao.readAllThemesByOrganisationId(organisationId, function (organisationThemes) {
                            organisationThemes.forEach(function (theme) {
                                if (JSON.stringify(myAccessibleThemes).indexOf(JSON.stringify(theme)) < 0) {
                                    myAccessibleThemes.push(theme);
                                }
                            });
                            if (++counter == organisationIds.length) {
                                callback(myAccessibleThemes);
                            }
                        });
                    });
                }
            });
        });
    };
    ThemeManager.prototype.getCards = function (themeId, callback) {
        var _this = this;
        this.getTheme(themeId, function (theme) {
            _this._dao.readCards(themeId, function (cards) {
                if (theme._subThemes.length > 0) {
                    var counter = 0;
                    theme._subThemes.forEach(function (subThemeId) {
                        _this.getCards(subThemeId, function (subCards) {
                            cards = cards.concat(subCards);
                            if (++counter == theme._subThemes.length) {
                                callback(cards);
                            }
                        });
                    });
                }
                else {
                    callback(cards);
                }
            });
        });
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
    ThemeManager.prototype.removeAllThemesFromOrganisationById = function (organisationId, callback) {
        this._dao.removeAllThemesFromOrganisationById(organisationId, callback);
    };
    ThemeManager.prototype.deleteOrganisationFromThemeById = function (themeId, callback) {
        this._dao.deleteOrganisationFromThemeById(themeId, callback);
    };
    return ThemeManager;
}());
exports.ThemeManager = ThemeManager;
