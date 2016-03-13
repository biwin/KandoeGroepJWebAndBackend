var organisationDao_1 = require("../dao/organisationDao");
var OrganisationManager = (function () {
    function OrganisationManager() {
        this._dao = new organisationDao_1.OrganisationDao();
    }
    OrganisationManager.prototype.createOrganisation = function (organisation, callback) {
        var _this = this;
        this.organisationExists(organisation._name, function (exists) {
            if (exists) {
                callback(null);
            }
            else {
                _this._dao.createOrganisation(organisation, callback);
            }
        });
    };
    OrganisationManager.prototype.organisationExists = function (organisationName, callback) {
        this._dao.getOrganisationByName(organisationName, function (organisation) {
            callback(organisation != null);
        });
    };
    OrganisationManager.prototype.getOrganisationById = function (organisationId, callback) {
        this._dao.getOrganisationById(organisationId, callback);
    };
    OrganisationManager.prototype.removeOrganisationById = function (organisationId, callback) {
        this._dao.deleteOrganisationById(organisationId, callback);
    };
    OrganisationManager.prototype.addGroupIdToOrganisationById = function (groupId, organisationId, callback) {
        this._dao.addGroupIdToOrganisationById(groupId, organisationId, callback);
    };
    OrganisationManager.prototype.getOrganisationOfGroupById = function (groupId, callback) {
        this._dao.getOrganisationOfGroupById(groupId, callback);
    };
    OrganisationManager.prototype.getAllOrganisationsOfUserById = function (userId, callback) {
        this._dao.getAllOrganisationsOfUserById(userId, callback);
    };
    return OrganisationManager;
})();
exports.OrganisationManager = OrganisationManager;
//# sourceMappingURL=organisationManager.js.map