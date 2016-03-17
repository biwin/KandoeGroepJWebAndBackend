"use strict";
var groupAPI_1 = require("./groupAPI");
var userApi_1 = require("./userApi");
var themeApi_1 = require("./themeApi");
var organisationManager_1 = require("../logic/organisationManager");
var OrganisationAPI = (function () {
    function OrganisationAPI() {
    }
    OrganisationAPI.create = function (req, res) {
        OrganisationAPI.mgr.createOrganisation(req.body, function (o) {
            res.send(o);
        });
    };
    OrganisationAPI.find = function (req, res) {
        OrganisationAPI.mgr.getOrganisationById(req.params.id, function (organisation) {
            res.send(organisation);
        });
    };
    OrganisationAPI.delete = function (req, res) {
        OrganisationAPI.mgr.removeOrganisationById(req.params.id, function (deleted) {
            res.send(deleted);
        });
    };
    OrganisationAPI.getAdmins = function (req, res) {
        userApi_1.UserApi.getAdminsOfOrganisationById(req, res);
    };
    OrganisationAPI.getGroups = function (req, res) {
        groupAPI_1.GroupAPI.getGroupsOfOrganisationById(req, res);
    };
    OrganisationAPI.getMembers = function (req, res) {
        userApi_1.UserApi.getMembersOfOrganisationById(req, res);
    };
    OrganisationAPI.getThemes = function (req, res) {
        themeApi_1.ThemeApi.getThemesOfOrganisationById(req, res);
    };
    OrganisationAPI.deleteMemberById = function (req, res) {
        OrganisationAPI.mgr.deleteMemberFromOrganisationById(req.params.memberId, req.params.id, function (deleted) {
            res.send(deleted);
        });
    };
    OrganisationAPI.getOrganisationOfGroupById = function (req, res) {
        OrganisationAPI.mgr.getOrganisationOfGroupById(req.params.id, function (organisation) {
            res.send(organisation);
        });
    };
    OrganisationAPI.getAllOrganisationsOfCurrentUser = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                OrganisationAPI.mgr.getAllOrganisationsOfUserById(currentUserId, function (organisations) {
                    res.send(organisations);
                });
            }
        });
    };
    OrganisationAPI.mgr = new organisationManager_1.OrganisationManager();
    return OrganisationAPI;
}());
exports.OrganisationAPI = OrganisationAPI;
//# sourceMappingURL=organisationAPI.js.map