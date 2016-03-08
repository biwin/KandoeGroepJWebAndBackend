/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
var mongodb_1 = require("mongodb");
var daoConstants_1 = require("./daoConstants");
var OrganisationDao = (function () {
    function OrganisationDao() {
        this._client = new mongodb_1.MongoClient();
    }
    OrganisationDao.prototype.createOrganisation = function (organisation, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').insertOne(organisation, function (error, result) {
                if (error != null) {
                    console.log(error.message);
                }
                organisation._id = result.insertedId.toString();
                db.close();
                callback(organisation);
            });
        });
    };
    OrganisationDao.prototype.getOrganisationByName = function (organisationName, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').find({ '_name': organisationName }).limit(1).next().then(function (cursor) {
                db.close();
                callback(cursor);
            });
        });
    };
    OrganisationDao.prototype.getOrganisationById = function (organisationId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').find({ '_id': new mongodb_1.ObjectID(organisationId) }).limit(1).next().then(function (cursor) {
                db.close();
                callback(cursor);
            });
        });
    };
    OrganisationDao.prototype.deleteOrganisationById = function (organisationId, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('organisations').deleteOne({ '_id': new mongodb_1.ObjectID(organisationId) }, function (err, result) {
                db.close();
                callback(result.deletedCount == 1);
            });
        });
    };
    return OrganisationDao;
})();
exports.OrganisationDao = OrganisationDao;
//# sourceMappingURL=organisationDao.js.map