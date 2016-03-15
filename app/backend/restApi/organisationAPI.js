var groupAPI_1 = require("./groupAPI");
var userApi_1 = require("./userApi");
var themeApi_1 = require("./themeApi");
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
    OrganisationAPI.delete = function (organisationId, res) {
        this.mgr.removeOrganisationById(organisationId, function (deleted) {
            res.send(deleted);
        });
    };
    OrganisationAPI.getAdmins = function (organisationId, res) {
        userApi_1.UserApi.getAdminsOfOrganisationById(organisationId, res);
    };
    OrganisationAPI.getGroups = function (organisationId, res) {
        groupAPI_1.GroupAPI.getGroupsOfOrganisationById(organisationId, res);
    };
    OrganisationAPI.getMembers = function (organisationId, res) {
        userApi_1.UserApi.getMembersOfOrganisationById(organisationId, res);
    };
    OrganisationAPI.getThemes = function (organisationId, res) {
        themeApi_1.ThemeApi.getThemesOfOrganisationById(organisationId, res);
    };
    OrganisationAPI.deleteMemberById = function (organisationId, memberId, res) {
        this.mgr.deleteMemberFromOrganisationById(memberId, organisationId, function (deleted) {
            res.send(deleted);
        });
    };
    OrganisationAPI.getOrganisationOfGroupById = function (groupId, res) {
        this.mgr.getOrganisationOfGroupById(groupId, function (organisation) {
            res.send(organisation);
        });
    };
    OrganisationAPI.getAllOrganisationsOfCurrentUser = function (req, res) {
        var _this = this;
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                _this.mgr.getAllOrganisationsOfUserById(currentUserId, function (organisations) {
                    res.send(organisations);
                });
            }
        });
    };
    OrganisationAPI.mgr = new organisationManager_1.OrganisationManager();
    return OrganisationAPI;
})();
exports.OrganisationAPI = OrganisationAPI;
//# sourceMappingURL=organisationAPI.js.map