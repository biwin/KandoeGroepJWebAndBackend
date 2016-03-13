var groupAPI_1 = require("./groupAPI");
var userApi_1 = require("./userApi");
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
    OrganisationAPI.getMembers = function (organisationId, res) {
        userApi_1.UserApi.getMembersOfOrganisationById(organisationId, res);
    };
    OrganisationAPI.getOrganisationOfGroupById = function (groupId, res) {
        this.mgr.getOrganisationOfGroupById(groupId, function (organisation) {
            res.send(organisation);
        });
    };
    OrganisationAPI.getAllOrganisationsOfUserById = function (userId, res) {
        this.mgr.getAllOrganisationsOfUserById(userId, function (organisations) {
            res.send(organisations);
        });
    };
    OrganisationAPI.mgr = new organisationManager_1.OrganisationManager();
    return OrganisationAPI;
})();
exports.OrganisationAPI = OrganisationAPI;
//# sourceMappingURL=organisationAPI.js.map