/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
var mongodb_1 = require("mongodb");
var daoConstants_1 = require("./daoConstants");
var ThemeDao = (function () {
    function ThemeDao() {
        this.client = new mongodb_1.MongoClient();
    }
    ThemeDao.prototype.read = function (name, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL).then(function (db) {
            return db.collection('themes').find({ '_name': name }).limit(1).next();
        }).then(function (cursor) {
            callback(cursor);
        });
    };
    ThemeDao.prototype.create = function (t, callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('themes').insertOne(t).then(function () {
                db.close();
                callback();
            });
        });
    };
    ThemeDao.prototype.clearDatabase = function (callback) {
        this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('themes').deleteMany({}, function () {
                callback();
            });
        });
    };
    return ThemeDao;
})();
exports.ThemeDao = ThemeDao;
//# sourceMappingURL=themeDao.js.map