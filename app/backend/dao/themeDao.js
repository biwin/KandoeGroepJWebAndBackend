/// <reference path="../../../typings/mongoose/mongoose.d.ts" />
var daoConstants_1 = require("./daoConstants");
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var mongoose_3 = require("mongoose");
var ThemeDao = (function () {
    function ThemeDao() {
        this._db = new mongoose_1.Mongoose().connect(daoConstants_1.DaoConstants.CONNECTION_URL);
        this._themeScheme = new mongoose_2.Schema({
            _id: Number,
            _creatorId: Number,
            _name: String,
            _description: String,
            _tags: []
        });
        this._themeModel = mongoose_3.model('Theme', this._themeScheme);
    }
    ThemeDao.prototype.read = function (name) {
        var theme;
        this._themeModel.find({}).where('name').equals(name).exec(function (err, t) {
            theme = t;
        });
        return theme;
    };
    ThemeDao.prototype.create = function (theme) {
    };
    return ThemeDao;
})();
exports.ThemeDao = ThemeDao;
//# sourceMappingURL=themeDao.js.map