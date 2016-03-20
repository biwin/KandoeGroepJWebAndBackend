"use strict";
var groupDao_1 = require("../dao/groupDao");
var userManager_1 = require("./userManager");
var organisationManager_1 = require("./organisationManager");
/**
 * Class that is responsible for managing what data will be send to the database layer for groups.
 * Gains information from usermanager and organisationmanager when needed for a group.
 */
var GroupManager = (function () {
    function GroupManager() {
        this._dao = new groupDao_1.GroupDao();
    }
    GroupManager.prototype.createGroup = function (group, callback) {
        var _this = this;
        this.groupExists(group._name, group._organisationId, function (exists) {
            if (exists) {
                callback(null);
            }
            else {
                _this._dao.createGroup(group, function (newGroup) {
                    var organisationManager = new organisationManager_1.OrganisationManager();
                    var userManager = new userManager_1.UserManager();
                    organisationManager.addGroupIdToOrganisationById(newGroup._id, newGroup._organisationId, function () {
                        userManager.addGroupIdToUserById(newGroup._id, newGroup._memberIds[0], function () {
                            callback(newGroup);
                        });
                    });
                });
            }
        });
    };
    GroupManager.prototype.groupExists = function (groupName, organisationId, callback) {
        this._dao.getGroupByNameAndOrganisationId(groupName, organisationId, function (group) {
            callback(group != null);
        });
    };
    GroupManager.prototype.getGroupById = function (groupId, callback) {
        this._dao.getGroupById(groupId, callback);
    };
    GroupManager.prototype.removeGroupById = function (groupId, callback) {
        var _this = this;
        var userManager = new userManager_1.UserManager();
        var organisationManager = new organisationManager_1.OrganisationManager();
        userManager.removeAllMembersFromGroupById(groupId, function (membersDeleted) {
            organisationManager.deleteGroupIdFromOrganisation(groupId, function (referencesDeleted) {
                _this._dao.deleteGroupById(groupId, function (groupDeleted) {
                    callback(membersDeleted && referencesDeleted && groupDeleted);
                });
            });
        });
    };
    GroupManager.prototype.getGroupsOfOrganisationById = function (organisationId, callback) {
        this._dao.getGroupsOfOrganisationById(organisationId, callback);
    };
    GroupManager.prototype.getGroupsOfUserById = function (userId, callback) {
        this._dao.getGroupsOfUserById(userId, callback);
    };
    GroupManager.prototype.getUserIdsInGroup = function (groupId, callback) {
        this._dao.getUserIdsInGroup(groupId, callback);
    };
    return GroupManager;
}());
exports.GroupManager = GroupManager;
//# sourceMappingURL=groupManager.js.map