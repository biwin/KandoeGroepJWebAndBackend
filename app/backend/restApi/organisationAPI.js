"use strict";
var groupAPI_1 = require("./groupAPI");
var userApi_1 = require("./userApi");
var themeApi_1 = require("./themeApi");
var organisationManager_1 = require("../logic/organisationManager");
var OrganisationAPI = (function () {
    function OrganisationAPI() {
    }
    OrganisationAPI.create = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var organisation = req.body;
                organisation._organisatorIds = [currentUserId];
                OrganisationAPI.mgr.createOrganisation(req.body, function (o) {
                    res.send(o);
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    OrganisationAPI.find = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var organisationId = req.params.id;
                OrganisationAPI.mgr.getOrganisationById(organisationId, function (organisation) {
                    res.send(organisation);
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    OrganisationAPI.delete = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var organisationId = req.params.id;
                OrganisationAPI.mgr.removeOrganisationById(organisationId, function (deleted) {
                    if (deleted) {
                        res.send(deleted);
                    }
                    else {
                        res.status(404).send("Organisation not found");
                    }
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
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
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var memberId = req.params.memberId;
                var organisationId = req.params.id;
                OrganisationAPI.mgr.deleteMemberFromOrganisationById(memberId, organisationId, function (deleted) {
                    if (deleted) {
                        res.send(deleted);
                    }
                    else {
                        res.status(404).send("Organisation not found");
                    }
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    OrganisationAPI.deleteGroupById = function (req, res) {
        req.params.id = req.params.groupId;
        groupAPI_1.GroupAPI.delete(req, res);
    };
    OrganisationAPI.deleteThemeById = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var themeId = req.params.themeId;
                var organisationId = req.params.id;
                OrganisationAPI.mgr.deleteThemeFromOrganisationById(themeId, organisationId, function (deleted) {
                    if (deleted) {
                        res.send(deleted);
                    }
                    else {
                        res.status(404).send("Organisation not found");
                    }
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    OrganisationAPI.getOrganisationOfGroupById = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                var groupId = req.params.id;
                OrganisationAPI.mgr.getOrganisationOfGroupById(groupId, function (organisation) {
                    res.send(organisation);
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    OrganisationAPI.getAllOrganisationsOfCurrentUser = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                OrganisationAPI.mgr.getAllOrganisationsOfUserById(currentUserId, function (organisations) {
                    res.send(organisations);
                });
            }
            else {
                res.status(401).send({ error: 'Unauthorized' });
            }
        });
    };
    OrganisationAPI.mgr = new organisationManager_1.OrganisationManager();
    return OrganisationAPI;
}());
exports.OrganisationAPI = OrganisationAPI;
//# sourceMappingURL=organisationAPI.js.map