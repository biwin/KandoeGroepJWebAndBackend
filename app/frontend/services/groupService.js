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
 * Class that is responsible for a link between the frontend and the backend for groups.
 * Uses the group routes in the server.js file
 */
var GroupService = (function () {
    function GroupService(http, path) {
        this.http = null;
        this.path = path;
        this.http = http;
    }
    GroupService.prototype.createGroup = function (group) {
        return this.http.post(this.path + "groups/", JSON.stringify(group), true, true, true);
    };
    GroupService.prototype.getGroupById = function (groupId) {
        return this.http.get(this.path + "groups/" + groupId, false, true, true);
    };
    GroupService.prototype.deleteGroupById = function (organisationId) {
        return this.http.delete(this.path + "group/" + organisationId, false, false, true);
    };
    GroupService.prototype.addMemberByEmailToGroupById = function (newUserMail, organisationId) {
        return this.http.post(this.path + 'organisations/' + organisationId, JSON.stringify({ 'email': newUserMail, 'isAdmin': isAdmin }), true, false, true);
    };
    GroupService.prototype.getMembersOfGroupById = function (groupId) {
        return this.http.get(this.path + "groups/" + groupId + "/members", false, true, true);
    };
    GroupService.prototype.getOrganisationOfGroupById = function (groupId) {
        return this.http.get(this.path + "groups/" + groupId + "/organisation", false, true, true);
    };
    GroupService.prototype.deleteMemberFromGroupById = function (userId, groupId) {
        return this.http.delete(this.path + "organisations/" + groupId + "/members/" + userId, false, false, true);
    };
    GroupService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject("App.BackendPath")), 
        __metadata('design:paramtypes', [httpWrapperService_1.HttpWrapperService, String])
    ], GroupService);
    return GroupService;
}());
exports.GroupService = GroupService;
//# sourceMappingURL=groupService.js.map