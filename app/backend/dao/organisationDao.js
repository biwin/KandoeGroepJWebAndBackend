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
                organisation._id = result.insertedId;
                db.close();
                callback(organisation);
            });
        });
    };
    OrganisationDao.prototype.readOrganisationByName = function (organisationName, callback) {
    };
    return OrganisationDao;
})();
exports.OrganisationDao = OrganisationDao;
//# sourceMappingURL=organisationDao.js.map