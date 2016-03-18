"use strict";
var organisationDao_1 = require("../dao/organisationDao");
var userManager_1 = require("./userManager");
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
                    userManager.addOrganisationIdToUserById(newOrganisation._id, newOrganisation._memberIds[0], true, function () {
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
        this._dao.deleteOrganisationById(organisationId, callback);
    };
    OrganisationManager.prototype.deleteMemberFromOrganisationById = function (memberId, organisationId, callback) {
        this._dao.deleteMemberFromOrganisationById(memberId, organisationId, function (deleted) {
            var userManager = new userManager_1.UserManager();
            userManager.deleteOrganisationFromUserById(organisationId, memberId, function () {
                callback(deleted);
            });
        });
    };
    OrganisationManager.prototype.addGroupIdToOrganisationById = function (groupId, organisationId, callback) {
        this._dao.addGroupIdToOrganisationById(groupId, organisationId, callback);
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