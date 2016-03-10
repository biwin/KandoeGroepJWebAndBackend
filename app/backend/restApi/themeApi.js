var themeManager_1 = require("../logic/themeManager");
var card_1 = require("../model/card");
var ThemeApi = (function () {
    function ThemeApi() {
    }
    ThemeApi.find = function (req, res) {
        ThemeApi.mgr.getTheme(req.params.id, function (t) {
            res.send(t);
        });
    };
    ThemeApi.findAll = function (req, res) {
        ThemeApi.mgr.getAllThemes(function (t) {
            res.send(t);
        });
    };
    ThemeApi.create = function (req, res) {
        ThemeApi.mgr.createTheme(req.body, function (t) {
            res.send(t);
        });
    };
    ThemeApi.createCard = function (req, res) {
        var card = req.body;
        var themeId = req.params.id;
        ThemeApi.mgr.createCard(new card_1.Card(card._name, themeId), function (c) {
            res.send(c);
        });
    };
    ThemeApi.getCards = function (req, res) {
        ThemeApi.mgr.getCards(req.params.id, function (c) {
            res.send(c);
        });
    };
    ThemeApi.deleteThemeWithCards = function (req, res) {
        var themeId = req.params.id;
        ThemeApi.mgr.removeThemeById(themeId, function (b) {
            if (b) {
                ThemeApi.mgr.deleteCardsFromTheme(themeId, function (amount) {
                    res.send({ 'deletedCards': amount });
                });
            }
            else {
                res.status(404).send("Theme not found");
            }
        });
    };
    /*
    * Unlink card from theme, but don't really delete it, so that it won't ghost out in an existing circlesession
    * */
    ThemeApi.deleteCardFromTheme = function (req, res) {
        var themeId = req.params.id;
        var cardId = req.params.cid;
        ThemeApi.mgr.removeCardFromTheme(themeId, cardId, function (b) {
            res.status(b ? 200 : 404).send(b);
        });
    };
    ThemeApi.mgr = new themeManager_1.ThemeManager();
    return ThemeApi;
})();
exports.ThemeApi = ThemeApi;
//# sourceMappingURL=themeApi.js.map