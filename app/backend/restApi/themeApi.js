var themeManager_1 = require("../logic/themeManager");
var card_1 = require("../model/card");
var userApi_1 = require("./userApi");
var ThemeApi = (function () {
    function ThemeApi() {
    }
    ThemeApi.find = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                ThemeApi.mgr.getTheme(req.params.id, function (t) {
                    res.status(200).send({ result: 'success' });
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    ThemeApi.findAll = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                ThemeApi.mgr.getAllThemes(function (t) {
                    res.status(200).send({ result: 'success' });
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    ThemeApi.create = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                ThemeApi.mgr.createTheme(req.body, function (t) {
                    res.status(200).send({ result: 'success' });
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    ThemeApi.createCard = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var card = req.body;
                var themeId = req.params.id;
                ThemeApi.mgr.createCard(new card_1.Card(card._name, themeId), function (c) {
                    res.status(200).send({ result: 'success' });
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    ThemeApi.getCards = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                ThemeApi.mgr.getCards(req.params.id, function (c) {
                    res.status(200).send({ result: 'success' });
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    ThemeApi.deleteThemeWithCards = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
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
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    /*
     * Unlink card from theme, but don't really delete it, so that it won't ghost out in an existing circlesession
     * */
    ThemeApi.deleteCardFromTheme = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var themeId = req.params.id;
                var cardId = req.params.cid;
                ThemeApi.mgr.removeCardFromTheme(themeId, cardId, function (b) {
                    res.status(b ? 200 : 404).send(b);
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    ThemeApi.mgr = new themeManager_1.ThemeManager();
    return ThemeApi;
})();
exports.ThemeApi = ThemeApi;
//# sourceMappingURL=themeApi.js.map