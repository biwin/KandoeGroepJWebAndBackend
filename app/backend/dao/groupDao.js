/// <reference path="../../../typings/mongodb/mongodb.d.ts" />
var mongodb_1 = require("mongodb");
var daoConstants_1 = require("./daoConstants");
var GroupDao = (function () {
    function GroupDao() {
        this._client = new mongodb_1.MongoClient();
    }
    GroupDao.prototype.createGroup = function (group, callback) {
        this._client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
            db.collection('groups').insertOne(group, function (error, result) {
                if (error != null) {
                    console.log(error.message);
                }
                group._id = result.insertedId;
                db.close();
                callback(group);
            });
        });
    };
    GroupDao.prototype.getGroupByNameAndOrganisationId = function (groupName, organisationId, callback) {
    };
    return GroupDao;
})();
exports.GroupDao = GroupDao;
//# sourceMappingURL=groupDao.js.map