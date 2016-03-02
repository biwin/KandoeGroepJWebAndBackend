var organisationManager_1 = require("../logic/organisationManager");
var OrganisationAPI = (function () {
    function OrganisationAPI() {
    }
    OrganisationAPI.find = function (organisationId, res) {
        this.mgr.getOrganisationById(organisationId, function (organisation) {
            res.send(organisation);
        });
    };
    OrganisationAPI.create = function (organisation, res) {
        this.mgr.createOrganisation(organisation, function (o) {
            res.send(o);
        });
    };
    OrganisationAPI.mgr = new organisationManager_1.OrganisationManager();
    return OrganisationAPI;
})();
exports.OrganisationAPI = OrganisationAPI;
//# sourceMappingURL=organisationAPI.js.map