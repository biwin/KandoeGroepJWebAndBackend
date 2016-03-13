/// <reference path="../../../../typings/jquery/jquery.d.ts" />
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
var userService_1 = require("../../services/userService");
var core_2 = require("angular2/core");
var CircleSessionUserList = (function () {
    function CircleSessionUserList(service) {
        this.users = [];
        this.service = service;
    }
    CircleSessionUserList.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.userIds != undefined && this.userIds.length > 0) {
            this.service.getUsers(this.userIds).subscribe(function (us) {
                us.forEach(function (u) { return _this.users.push(u); });
            });
        }
    };
    __decorate([
        core_2.Input("users"), 
        __metadata('design:type', Array)
    ], CircleSessionUserList.prototype, "userIds", void 0);
    CircleSessionUserList = __decorate([
        core_1.Component({
            selector: 'user-list',
            template: "\n        <ul id=\"user-list\" class=\"collection with-header side-nav fixed right-aligned user-sidenav\">\n            <li class=\"users-heading collection-header valign-wrapper\"><h4 class=\"valign center-block\"><i class=\"material-icons\">people</i> Spelers</h4></li>\n            <li class=\"collection-item row valign-wrapper\" *ngFor=\"#user of users\">\n                <div class=\"col s4\">\n                    <img *ngIf=\"user._pictureSmall !== undefined\" [attr.src]=\"user._pictureSmall\" class=\"circle responsive-img valign\">\n                    <i *ngIf=\"user._pictureSmall === undefined\" class=\"material-icons valign\">person</i>\n                </div>\n                <div class=\"col s8\">\n                    {{user._name}}\n                </div>\n            </li>\n        </ul>\n  ",
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [userService_1.UserService])
    ], CircleSessionUserList);
    return CircleSessionUserList;
})();
exports.CircleSessionUserList = CircleSessionUserList;
//# sourceMappingURL=circleSessionUserList.js.map