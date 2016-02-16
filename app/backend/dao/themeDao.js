/// <reference path="../../../typings/mongoose/mongoose.d.ts" />
var daoConstants_1 = require("./daoConstants");
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var mongoose_3 = require("mongoose");
var ThemeDao = (function () {
    function ThemeDao() {
        this.db = new mongoose_1.Mongoose().connect(daoConstants_1.DaoConstants.CONNECTION_URL);
        this.themeScheme = new mongoose_2.Schema({
            id: Number,
            creatorId: Number,
            _name: String,
            description: String,
            tags: []
        });
        this.themeModel = mongoose_3.model('Theme', this.themeScheme);
    }
    return ThemeDao;
})();
exports.ThemeDao = ThemeDao;
//# sourceMappingURL=themeDao.js.map