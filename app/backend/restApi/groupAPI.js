"use strict";
var userApi_1 = require("./userApi");
var organisationAPI_1 = require("./organisationAPI");
var groupManager_1 = require("../logic/groupManager");
var GroupAPI = (function () {
    function GroupAPI() {
    }
    GroupAPI.create = function (group, res) {
        GroupAPI.mgr.createGroup(group, function (g) {
            res.send(g);
        });
    };
    GroupAPI.find = function (groupId, res) {
        GroupAPI.mgr.getGroupById(groupId, function (group) {
            res.send(group);
        });
    };
    GroupAPI.getMembers = function (groupId, res) {
        userApi_1.UserApi.getMembersOfGroupById(groupId, res);
    };
    GroupAPI.getOrganisation = function (groupId, res) {
        organisationAPI_1.OrganisationAPI.getOrganisationOfGroupById(groupId, res);
    };
    GroupAPI.getGroupsOfOrganisationById = function (organisationId, res) {
        GroupAPI.mgr.getGroupsOfOrganisationById(organisationId, function (groups) {
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