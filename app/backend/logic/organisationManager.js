"use strict";
var organisationDao_1 = require("../dao/organisationDao");
var userManager_1 = require("./userManager");
var groupManager_1 = require("./groupManager");
var themeManager_1 = require("./themeManager");
/**
 * Class that is responsible for managing what data will be send to the database layer for organisations.
 * Gains information from usermanager, groupmanager and thememanager when needed for an organisation.
 */
var OrganisationManager = (function () {
    function OrganisationManager() {
        this._dao = new organisationDao_1.OrganisationDao();
    }
    OrganisationManager.prototype.createOrganisation = function (organisation, callback) {
        var _this = this;
        this.organisationExists(organisation._name, function (exists) {
            if (exists) {
                callback(null);
            }
            else {
                _this._dao.createOrganisation(organisation, function (newOrganisation) {
                    var userManager = new userManager_1.UserManager();
                    userManager.addOrganisationIdToUserById(newOrganisation._id, newOrganisation._organisatorIds[0], true, function () {
                        callback(newOrganisation);
                    });
                });
            }
        });
    };
    OrganisationManager.prototype.organisationExists = function (organisationName, callback) {
        this._dao.getOrganisationByName(organisationName, function (organisation) {
            callback(organisation != null);
        });
    };
    OrganisationManager.prototype.getOrganisationById = function (organisationId, callback) {
        this._dao.getOrganisationById(organisationId, callback);
    };
    OrganisationManager.prototype.removeOrganisationById = function (organisationId, callback) {
        var _this = this;
        var groupManager = new groupManager_1.GroupManager();
        var userManager = new userManager_1.UserManager();
        var themeManager = new themeManager_1.ThemeManager();
        var groupsDeleted = true;
        this.getOrganisationById(organisationId, function (organisation) {
            organisation._groupIds.forEach(function (groupId) {
                groupManager.removeGroupById(groupId, function (groupDeleted) {
                    groupsDeleted = groupsDeleted && groupDeleted;
                });
            });
        });
        userManager.removeAllUsersFromOrganisationById(organisationId, function (usersDeleted) {
            themeManager.removeAllThemesFromOrganisationById(organisationId, function (themeReferencesDeleted) {
                _this._dao.deleteOrganisationById(organisationId, function (organisationDeleted) {
                    callback(groupsDeleted && usersDeleted && themeReferencesDeleted && organisationDeleted);
                });
            });
        });
    };
    OrganisationManager.prototype.deleteMemberFromOrganisationById = function (memberId, organisationId, callback) {
        this._dao.deleteMemberFromOrganisationById(memberId, organisationId, function (deleted) {
            var userManager = new userManager_1.UserManager();
            userManager.deleteOrganisationFromUserById(organisationId, memberId, function () {
                callback(deleted);
            });
        });
    };
    OrganisationManager.prototype.deleteGroupIdFromOrganisation = function (groupId, callback) {
        this._dao.deleteGroupIdFromOrganisation(groupId, callback);
    };
    OrganisationManager.prototype.deleteThemeFromOrganisationById = function (themeId, organisationId, callback) {
        var themeManager = new themeManager_1.ThemeManager();
        themeManager.deleteOrganisationFromThemeById(themeId, callback);
    };
    OrganisationManager.prototype.addGroupIdToOrganisationById = function (groupId, organisationId, callback) {
        this._dao.addGroupIdToOrganisationById(groupId, organisationId, callback);
    };
    OrganisationManager.prototype.addUserByEmailToOrganisationById = function (newUserMail, isAdmin, organisationId, callback) {
        var _this = this;
        var userManager = new userManager_1.UserManager();
        this.getOrganisationById(organisationId, function (organisation) {
            userManager.getUserIdForUserByEmail(newUserMail, function (userId) {
                if (isAdmin && organisation._organisatorIds.indexOf(userId) < 0 || !isAdmin && organisation._memberIds.indexOf(userId) < 0) {
                    _this._dao.addUserIdToOrganisationById(userId, isAdmin, organisationId, function (userAdded) {
                        userManager.addOrganisationIdToUserById(organisationId, userId, isAdmin, function (referenceAdded) {
                            callback(userAdded && referenceAdded, userId);
                        });
                    });
                }
                else {
                    callback(false, null);
                }
            });
        });
    };
    OrganisationManager.prototype.getOrganisationOfGroupById = function (groupId, callback) {
        this._dao.getOrganisationOfGroupById(groupId, callback);
    };
    OrganisationManager.prototype.getAllOrganisationsOfUserById = function (userId, callback) {
        this._dao.getAllOrganisationsOfUserById(userId, callback);
    };
    OrganisationManager.prototype.getAllOrganisationIdsOfUserById = function (userId, callback) {
        this._dao.getAllOrganisationIdsOfUserById(userId, callback);
    };
    return OrganisationManager;
}());
exports.OrganisationManager = OrganisationManager;
//# sourceMappingURL=organisationManager.js.map