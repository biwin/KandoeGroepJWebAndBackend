/// <reference path="../../../../../typings/jquery/jquery.d.ts" />
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
var core_1 = require("angular2/core");
var router_1 = require("angular2/router");
var userService_1 = require("../../../services/userService");
var chatComponent_1 = require("../../chat/chatComponent");
var loadingSpinner_1 = require("../../general/loadingSpinner");
var CircleSessionUserList = (function () {
    function CircleSessionUserList(service) {
        this.users = [];
        this.initComplete = false;
        this.service = service;
        this.myUserId = service.getUserId();
    }
    CircleSessionUserList.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.userIds != undefined && this.userIds.length > 0 && this.users.length == 0) {
            this.service.getUsers(this.userIds).subscribe(function (us) {
                us.forEach(function (u) { return _this.users.push(u); });
                _this.initComplete = true;
            });
        }
    };
    __decorate([
        core_1.Input("users"), 
        __metadata('design:type', Array)
    ], CircleSessionUserList.prototype, "userIds", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CircleSessionUserList.prototype, "currentPlayerId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CircleSessionUserList.prototype, "circleSessionId", void 0);
    CircleSessionUserList = __decorate([
        core_1.Component({
            selector: 'user-list',
            template: "\n    <div class=\"side-nav fixed right-aligned\" id=\"user-sidenav\">\n        <loading *ngIf=\"!initComplete\"></loading>\n        <ul id=\"user-list\" *ngIf=\"initComplete\" class=\"collection with-header\">\n            <li class=\"users-heading collection-header valign-wrapper\"><h4 class=\"valign center-block\"><i class=\"material-icons\">people</i> Spelers</h4></li>\n            <li class=\"collection-item row valign-wrapper\" *ngFor=\"#user of users\" [class.blue]=\"user._id === myUserId\" [class.lighten-5]=\"user._id === myUserId\">\n                <div class=\"col s4\">\n                    <img *ngIf=\"user._pictureSmall !== undefined\" [attr.src]=\"user._pictureSmall\" class=\"circle responsive-img valign\">\n                    <i *ngIf=\"user._pictureSmall === undefined\" class=\"material-icons valign\">person</i>\n                </div>\n                <div class=\"col s7\">\n                    {{user._name}}\n                </div>\n                <div class=\"col s1\" *ngIf=\"user._id === currentPlayerId\">\n                    <i class=\"fa fa-gamepad fa-lg green-text\"></i>\n                </div>\n            </li>\n        </ul>\n        <chatbox [sessionId]=\"circleSessionId\" [userId]=\"myUserId\"></chatbox>\n     </div>\n  ",
            directives: [router_1.ROUTER_DIRECTIVES, chatComponent_1.ChatComponent, loadingSpinner_1.LoadingSpinner]
        }), 
        __metadata('design:paramtypes', [userService_1.UserService])
    ], CircleSessionUserList);
    return CircleSessionUserList;
}());
exports.CircleSessionUserList = CircleSessionUserList;
//# sourceMappingURL=circleSessionUserList.js.map