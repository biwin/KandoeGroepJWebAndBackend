"use strict";
var userApi_1 = require("./userApi");
var organisationAPI_1 = require("./organisationAPI");
var groupManager_1 = require("../logic/groupManager");
var GroupAPI = (function () {
    function GroupAPI() {
    }
    GroupAPI.create = function (req, res) {
        GroupAPI.mgr.createGroup(req.body, function (g) {
            res.send(g);
        });
    };
    GroupAPI.find = function (req, res) {
        GroupAPI.mgr.getGroupById(req.params.id, function (group) {
            res.send(group);
        });
    };
    GroupAPI.getMembers = function (req, res) {
        userApi_1.UserApi.getMembersOfGroupById(req, res);
    };
    GroupAPI.getOrganisation = function (req, res) {
        organisationAPI_1.OrganisationAPI.getOrganisationOfGroupById(req, res);
    };
    GroupAPI.getGroupsOfOrganisationById = function (req, res) {
        GroupAPI.mgr.getGroupsOfOrganisationById(req.params.id, function (groups) {
            res.send(groups);
        });
    };
    GroupAPI.getGroupsOfUserById = function (req, res) {
        GroupAPI.mgr.getGroupsOfUserById(req.params.id, function (groups) {
            res.send(groups);
        });
    };
    GroupAPI.mgr = new groupManager_1.GroupManager();
    return GroupAPI;
}());
exports.GroupAPI = GroupAPI;
//# sourceMappingURL=groupAPI.js.map