var groupAPI_1 = require("./groupAPI");
var organisationManager_1 = require("../logic/organisationManager");
var OrganisationAPI = (function () {
    function OrganisationAPI() {
    }
    OrganisationAPI.create = function (organisation, res) {
        this.mgr.createOrganisation(organisation, function (o) {
            res.send(o);
        });
    };
    OrganisationAPI.find = function (organisationId, res) {
        this.mgr.getOrganisationById(organisationId, function (organisation) {
            res.send(organisation);
        });
    };
    OrganisationAPI.getGroups = function (organisationId, res) {
        groupAPI_1.GroupAPI.getGroupsOfOrganisationById(organisationId, res);
    };
    OrganisationAPI.mgr = new organisationManager_1.OrganisationManager();
    return OrganisationAPI;
})();
exports.OrganisationAPI = OrganisationAPI;
//# sourceMappingURL=organisationAPI.js.map