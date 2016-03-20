"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("angular2/core");
var httpWrapperService_1 = require("./httpWrapperService");
/**
 * Class that is responsible for a link between the frontend and the backend for organisations.
 * Uses the organisation routes in the server.js file
 */
var OrganisationService = (function () {
    function OrganisationService(http, path) {
        this.http = null;
        this.path = path;
        this.http = http;
    }
    OrganisationService.prototype.createOrganisation = function (organisation) {
        return this.http.post(this.path + "organisations", JSON.stringify(organisation), true, true, true);
    };
    OrganisationService.prototype.getOrganisationById = function (organisationId) {
        return this.http.get(this.path + "organisations/" + organisationId, false, true, true);
    };
    OrganisationService.prototype.deleteOrganisationById = function (organisationId) {
        return this.http.delete(this.path + "organisations/" + organisationId, false, false, true);
    };
    OrganisationService.prototype.getAdminsOfOrganisationById = function (organisationId) {
        return this.http.get(this.path + "organisations/" + organisationId + "/admins", false, true, true);
    };
    OrganisationService.prototype.getGroupsOfOrganisationById = function (organisationId) {
        return this.http.get(this.path + "organisations/" + organisationId + "/groups", false, true, true);
    };
    OrganisationService.prototype.getMembersOfOrganisationById = function (organisationId) {
        return this.http.get(this.path + "organisations/" + organisationId + "/members", false, true, true);
    };
    OrganisationService.prototype.getThemesOfOrganisationById = function (organisationId) {
        return this.http.get(this.path + "organisations/" + organisationId + "/themes", false, true, true);
    };
    OrganisationService.prototype.deleteMemberFromOrganisationById = function (userId, organisationId) {
        return this.http.delete(this.path + "organisations/" + organisationId + "/members/" + userId, false, false, true);
    };
    OrganisationService.prototype.deleteGroupFromOrganisationById = function (groupId, organisationId) {
        return this.http.delete(this.path + "organisations/" + organisationId + "/groups/" + groupId, false, false, true);
    };
    OrganisationService.prototype.deleteThemeFromOrganisationById = function (themeId, organisationId) {
        return this.http.delete(this.path + "organisations/" + organisationId + "/themes/" + themeId, false, false, true);
    };
    OrganisationService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject("App.BackendPath")), 
        __metadata('design:paramtypes', [httpWrapperService_1.HttpWrapperService, String])
    ], OrganisationService);
    return OrganisationService;
}());
exports.OrganisationService = OrganisationService;
//# sourceMappingURL=organisationService.js.map