"use strict";
var userApi_1 = require("./userApi");
var organisationAPI_1 = require("./organisationAPI");
var groupManager_1 = require("../logic/groupManager");
var GroupAPI = (function () {
    function GroupAPI() {
    }
    GroupAPI.create = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var group = req.body;
                group._memberIds = [currentUserId];
                GroupAPI.mgr.createGroup(req.body, function (g) {
                    res.send(g);
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    GroupAPI.find = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var groupId = req.params.id;
                GroupAPI.mgr.getGroupById(groupId, function (group) {
                    res.send(group);
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    GroupAPI.delete = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var groupId = req.params.id;
                GroupAPI.mgr.removeGroupById(groupId, function (deleted) {
                    if (deleted) {
                        res.send(deleted);
                    }
                    else {
                        res.status(404).send("Group not found");
                    }
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    GroupAPI.getMembers = function (req, res) {
        userApi_1.UserApi.getMembersOfGroupById(req, res);
    };
    GroupAPI.getOrganisation = function (req, res) {
        organisationAPI_1.OrganisationAPI.getOrganisationOfGroupById(req, res);
    };
    GroupAPI.getGroupsOfOrganisationById = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var groupId = req.params.id;
                GroupAPI.mgr.getGroupsOfOrganisationById(groupId, function (groups) {
                    res.send(groups);
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    GroupAPI.getGroupsOfUserById = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var groupId = req.params.id;
                GroupAPI.mgr.getGroupsOfUserById(groupId, function (groups) {
                    res.send(groups);
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    GroupAPI.mgr = new groupManager_1.GroupManager();
    return GroupAPI;
}());
exports.GroupAPI = GroupAPI;
//# sourceMappingURL=groupAPI.js.map