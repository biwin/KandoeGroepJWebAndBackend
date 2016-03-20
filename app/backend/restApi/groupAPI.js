"use strict";
var userApi_1 = require("./userApi");
var organisationAPI_1 = require("./organisationAPI");
var groupManager_1 = require("../logic/groupManager");
/**
 * Class that is responsible for exstracting data from the request and sending it to the groupmanager
 * Uses the organisationApi to get group information when needed
 * Uses the userApi where needed to check if the request is authorized
 */
var GroupAPI = (function () {
    function GroupAPI() {
    }
    GroupAPI.create = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var group = req.body;
                group._memberIds = [currentUserId];
                GroupAPI.mgr.createGroup(group, function (g) {
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
    GroupAPI.addUserByEmail = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var groupId = req.params.id;
                var newUserMail = req.body.email;
                GroupAPI.mgr.addUserByEmailToGroupById(newUserMail, groupId, function (added, userId) {
                    if (userId != null) {
                        res.send(userId);
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
    GroupAPI.deleteMemberById = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var memberId = req.params.memberId;
                var groupId = req.params.id;
                GroupAPI.mgr.deleteMemberFromGroupById(memberId, groupId, function (deleted) {
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