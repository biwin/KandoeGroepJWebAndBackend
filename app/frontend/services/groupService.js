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
var http_1 = require("angular2/http");
var GroupService = (function () {
    function GroupService(http, path) {
        this.http = null;
        this.path = path;
        this.http = http;
    }
    GroupService.prototype.createGroup = function (group) {
        var header = new http_1.Headers();
        header.append("Content-Type", "application/json");
        return this.http.post(this.path + "groups/", JSON.stringify(group), { headers: header }).map(function (res) { return res.json(); });
    };
    GroupService.prototype.getGroupById = function (groupId) {
        var header = new http_1.Headers();
        header.append("Content-Type", "application/json");
        return this.http.get(this.path + "groups/" + groupId).map(function (res) { return res.json(); });
    };
    GroupService.prototype.getMembersOfGroupById = function (groupId) {
        var header = new http_1.Headers();
        header.append("Content-Type", "application/json");
        return this.http.get(this.path + "groups/" + groupId + "/members").map(function (res) { return res.json(); });
    };
    GroupService.prototype.getOrganisationOfGroupById = function (groupId) {
        var header = new http_1.Headers();
        header.append("Content-Type", "application/json");
        return this.http.get(this.path + "groups/" + groupId + "/organisation").map(function (res) { return res.json(); });
    };
    GroupService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject("App.BackendPath")), 
        __metadata('design:paramtypes', [http_1.Http, String])
    ], GroupService);
    return GroupService;
}());
exports.GroupService = GroupService;
//# sourceMappingURL=groupService.js.map