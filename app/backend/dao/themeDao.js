/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
var mongodb_1 = require("mongodb");
var daoConstants_1 = require("./daoConstants");
var ThemeDao = (function () {
    function ThemeDao() {
        this._client = new mongodb_1.MongoClient();
    }
    ThemeDao.prototype.clearDatabase = function (callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('themes').deleteMany({}, function () {
                callback();
            });
        });
    };
    ThemeDao.prototype.createTheme = function (t, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('themes').insertOne(t, function (err, result) {
                t._id = result.insertedId.toString();
                db.close();
                callback(t);
            });
        });
    };
    ThemeDao.prototype.readTheme = function (id, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('themes').find({ '_id': new mongodb_1.ObjectID(id) }).limit(1).next().then(function (cursor) {
                db.close();
                callback(cursor);
            });
        });
    };
    ThemeDao.prototype.deleteThemeById = function (themeId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('themes').deleteOne({ '_id': themeId }, function (err, result) {
                db.close();
                callback(result.deletedCount == 1);
            });
        });
    };
    ThemeDao.prototype.createCard = function (card, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('cards').insertOne(card, function (err, result) {
                card._id = result.insertedId.toString();
                db.close();
                callback(card);
            });
        });
    };
    ThemeDao.prototype.readAllThemes = function (callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('themes').find({}).toArray(function (err, docs) {
                callback(docs);
            });
        });
    };
    ThemeDao.prototype.readCards = function (themeId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('cards').find({ '_themeId': themeId }).toArray(function (err, docs) {
                callback(docs);
            });
        });
    };
    ThemeDao.prototype.clearThemeIdOfCard = function (themeId, cardId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('cards').updateOne({ '_themeId': themeId, '_id': new mongodb_1.ObjectID(cardId) }, { '_themeId': null }, function (err, res) {
                callback(res.modifiedCount == 1);
            });
        });
    };
    ThemeDao.prototype.removeCardsFromTheme = function (themeId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('cards').deleteMany({ '_themeId': themeId }, function (err, res) {
                callback(res.deletedCount);
            });
        });
    };
    return ThemeDao;
})();
exports.ThemeDao = ThemeDao;
//# sourceMappingURL=themeDao.js.map