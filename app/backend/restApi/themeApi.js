var themeManager_1 = require("../logic/themeManager");
var card_1 = require("../model/card");
var ThemeApi = (function () {
    function ThemeApi() {
    }
    ThemeApi.find = function (id, res) {
        ThemeApi.mgr.getTheme(id, function (t) {
            res.send(t);
        });
    };
    ThemeApi.findAll = function (res) {
        ThemeApi.mgr.getAllThemes(function (t) {
            res.send(t);
        });
    };
    ThemeApi.create = function (theme, res) {
        ThemeApi.mgr.createTheme(theme, function (t) {
            res.send(t);
        });
    };
    ThemeApi.createCard = function (card, themeId, res) {
        ThemeApi.mgr.createCard(new card_1.Card(card._name, themeId), function (c) {
            res.send(c);
        });
    };
    ThemeApi.getCards = function (themeId, res) {
        ThemeApi.mgr.getCards(themeId, function (c) {
            res.send(c);
        });
    };
    ThemeApi.mgr = new themeManager_1.ThemeManager();
    return ThemeApi;
})();
exports.ThemeApi = ThemeApi;
//# sourceMappingURL=themeApi.js.map