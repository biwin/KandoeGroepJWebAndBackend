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
var NavigationBar = (function () {
    function NavigationBar(service) {
        var _this = this;
        this.service = service;
        service.subscribeMe(this);
        if (this.service.isLoggedIn()) {
            this.service.getUserPicture('small').subscribe(function (url) { return _this.imageSource = url.text(); });
            this.service.getUsername(function (name) { return _this.usernameString = name; });
        }
        else {
            this.usernameString = "Gast";
        }
    }
    NavigationBar.prototype.notifyLoggedIn = function () {
        var _this = this;
        this.getUserName();
        this.service.getUserPicture('small').subscribe(function (url) { return _this.imageSource = url.text(); });
    };
    NavigationBar.prototype.notifyLoggedOut = function () {
        this.imageSource = null;
        this.usernameString = "Gast";
    };
    NavigationBar.prototype.notifyProfileUpdated = function () {
        var _this = this;
        this.service.getUsername(function (name) { return _this.usernameString = name; });
        this.service.getUserPicture('small').subscribe(function (url) { return _this.imageSource = url.text(); });
    };
    NavigationBar.prototype.getUserName = function () {
        var _this = this;
        this.service.getUsername(function (name) { return _this.usernameString = name; });
    };
    NavigationBar.prototype.ngAfterViewInit = function () {
        $(".button-collapse").sideNav({ menuWidth: 240 });
    };
    NavigationBar = __decorate([
        core_1.Component({
            selector: 'navigation-bar',
            template: "\n    <nav class=\"blue\" role=\"navigation\">\n       <div class=\"nav-wrapper container\">\n        <a id=\"logo-container\" [routerLink]=\"['Home']\" class=\"brand-logo\">KanDoe</a>\n            <ul class=\"right\">\n                <li>\n                    <a [routerLink]=\"service.isLoggedIn() ? ['Profile'] : ['UserLogin']\">\n                            <i *ngIf=\"imageSource == null || imageSource == ''\" style=\"display: inline; vertical-align: middle;\" class=\"material-icons\">face</i>\n                            <img *ngIf=\"imageSource != null && imageSource != ''\" style=\"display: inline; vertical-align: middle; max-width: 50px; max-height: 50px;\" src=\"{{imageSource}}\"/>\n                            <p style=\"display: inline;\">{{usernameString}}</p>\n                    </a>\n                </li>\n            </ul>\n            <ul *ngIf=\"service.isLoggedIn()\" id=\"slide-out\" class=\"side-nav fixed\">\n                <li><a [routerLink]=\"['ThemeOverview']\">Thema overzicht</a></li>\n                <li><a [routerLink]=\"['CreateTheme']\">Nieuw thema</a></li>\n                <li><a [routerLink]=\"['CreateSession']\">Nieuwe sessie</a></li>\n                <li><a [routerLink]=\"['CircleSessionOverview']\">Sessie overzicht</a></li>\n                <li><a [routerLink]=\"['OrganisationsOverview']\">Mijn organisaties</a></li>\n                <li><a [routerLink]=\"['CreateOrganisation']\">Nieuwe organisatie</a></li>\n            </ul>\n            <a href=\"#\" data-activates=\"slide-out\" class=\"button-collapse\"><i class=\"mdi-navigation-menu\"></i></a>\n       </div>\n    </nav>\n\n    <div></div>\n  ",
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [userService_1.UserService])
    ], NavigationBar);
    return NavigationBar;
})();
exports.NavigationBar = NavigationBar;
//# sourceMappingURL=navigationBar.js.map