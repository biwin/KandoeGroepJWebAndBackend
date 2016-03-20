/// <reference path="../../../../typings/jquery/jquery.d.ts" />
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
var userService_1 = require("../../services/userService");
var NavigationBar = (function () {
    function NavigationBar(service) {
        var _this = this;
        this.service = service;
        service.subscribeMe(this);
        if (this.service.isLoggedIn()) {
            this.service.getUserPicture('small').subscribe(function (url) { return _this.imageSource = url; });
            this.usernameString = this.service.getUsername();
        }
        else {
            this.usernameString = "Gast";
        }
    }
    NavigationBar.prototype.notifyLoggedIn = function () {
        var _this = this;
        this.getUserName();
        this.service.getUserPicture('small').subscribe(function (url) { return _this.imageSource = url; });
    };
    NavigationBar.prototype.notifyLoggedOut = function () {
        this.imageSource = null;
        this.usernameString = "Gast";
    };
    NavigationBar.prototype.notifyProfileUpdated = function () {
        var _this = this;
        this.usernameString = this.service.getUsername();
        this.service.getUserPicture('small').subscribe(function (url) { return _this.imageSource = url; });
    };
    NavigationBar.prototype.getUserName = function () {
        this.usernameString = this.service.getUsername();
    };
    NavigationBar.prototype.ngAfterViewInit = function () {
        $("#main-nav-toggle").sideNav({ menuWidth: 240 });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NavigationBar.prototype, "padRight", void 0);
    NavigationBar = __decorate([
        core_1.Component({
            selector: 'navigation-bar',
            template: "\n    <nav class=\"blue\" [class.padding-right-users]=\"padRight\" [class.no-padding-left]=\"!service.isLoggedIn()\" role=\"navigation\">\n       <div class=\"nav-wrapper container\">\n        <a id=\"logo-container\" [routerLink]=\"['Home']\" class=\"brand-logo\">KanDoe</a>\n            <ul class=\"right\">\n                <li>\n                    <a [routerLink]=\"service.isLoggedIn() ? ['Profile'] : ['UserLogin']\">\n                            <i *ngIf=\"imageSource == null || imageSource == ''\" style=\"display: inline; vertical-align: middle;\" class=\"material-icons\">face</i>\n                            <img *ngIf=\"imageSource != null && imageSource != ''\" style=\"display: inline; vertical-align: middle; max-width: 50px; max-height: 50px;\" src=\"{{imageSource}}\"/>\n                            <p style=\"display: inline;\">{{usernameString}}</p>\n                    </a>\n                </li>\n            </ul>\n            <ul *ngIf=\"service.isLoggedIn()\" id=\"slide-out\" class=\"side-nav fixed\">\n            <li><a [routerLink]=\"['Home']\">Mijn dashboard</a></li>\n                <li><a [routerLink]=\"['CircleSessionOverview']\">Mijn spellen</a></li>\n                <li><a [routerLink]=\"['ThemeOverview']\">Mijn thema's</a></li>\n                <li><a [routerLink]=\"['OrganisationsOverview']\">Mijn organisaties</a></li>\n            </ul>\n            <a href=\"#\" id=\"main-nav-toggle\" data-activates=\"slide-out\" class=\"button-collapse\">\n                <i class=\"material-icons\">menu</i>\n            </a>\n       </div>\n    </nav>\n  ",
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [userService_1.UserService])
    ], NavigationBar);
    return NavigationBar;
}());
exports.NavigationBar = NavigationBar;
//# sourceMappingURL=navigationBar.js.map