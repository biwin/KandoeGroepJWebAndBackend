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
        this._dao.readOrganisationByName(organisationName, function (organisation) {
            callback(organisation != null);
        });
    };
    OrganisationManager.prototype.getOrganisationById = function (organisationId, callback) {
    };
    OrganisationManager.prototype.removeOrganisationById = function (organisationId, callback) {
    };
    return OrganisationManager;
})();
exports.OrganisationManager = OrganisationManager;
//# sourceMappingURL=organisationManager.js.map