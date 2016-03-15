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
var common_1 = require("angular2/common");
var Profile = (function () {
    function Profile(router, service) {
        var _this = this;
        this.service = service;
        this.router = router;
        var token = localStorage.getItem('token');
        if (token == null || token == "") {
            this.router.navigate(['UserLogin']);
        }
        else {
            this.usernameString = service.getUsername();
            service.getImageLinks(function (smallImageLink, largeImageLink) { _this.smallImageLinkString = smallImageLink; _this.largeImageLinkString = largeImageLink; });
            service.getUserPicture('large').subscribe(function (url) { return _this.imageSource = url; });
        }
    }
    Profile.prototype.onChangeDetailsSubmit = function () {
        var _this = this;
        this.service.changeProfile(this.usernameString, this.smallImageLinkString, this.largeImageLinkString).subscribe(function (token) {
            if (token != null) {
                if (token != "nope") {
                    localStorage.setItem('token', token);
                    _this.imageSource = _this.largeImageLinkString;
                    _this.service.notifyProfileUpdated();
                }
            }
        });
    };
    Profile.prototype.logout = function () {
        localStorage.removeItem('token');
        this.router.navigate(['UserLogin']);
        this.service.notifyLoggedOut();
    };
    Profile = __decorate([
        core_1.Component({
            selector: 'profile',
            template: "\n        <div class=\"row container\">\n            <h5>Profiel</h5>\n            <div class=\"card formCard\">\n                <div class=\"card-content\">\n                    <form *ngIf=\"service.isLoggedIn()\" class=\"col s12\" (ngSubmit)=\"onChangeDetailsSubmit()\">\n                        <img style=\"max-width: 200px; max-height: 200px;\" src=\"{{imageSource}}\" />\n\n                        <div class=\"row\"><div class=\"input-field col s6\">\n                            <input id=\"smallImageLink\" [(ngModel)]=\"smallImageLinkString\" type=\"text\" class=\"form-control validate\" ngControl=\"_smallImageLink\" required #smallImageLink=\"ngForm\">\n                            <label for=\"smallImageLink\" [class.active]=\"smallImageLinkString\" data-error=\"Oops!\">Naam afbeelding</label>\n                        </div></div>\n\n                        <div class=\"row\"><div class=\"input-field col s6\">\n                            <input id=\"largeImageLink\" [(ngModel)]=\"largeImageLinkString\" type=\"text\" class=\"form-control validate\" ngControl=\"_largeImageLink\" required #largeImageLink=\"ngForm\">\n                            <label for=\"largeImageLink\" [class.active]=\"largeImageLinkString\" data-error=\"Oops!\">Profiel afbeelding</label>\n                        </div></div>\n\n                        <div class=\"row\"><div class=\"input-field col s6\">\n                            <input id=\"username\" [(ngModel)]=\"usernameString\" type=\"text\" class=\"form-control validate\" pattern=\"([a-zA-Z0-9]{4,16})\" ngControl=\"_username\" required #username=\"ngForm\">\n                            <label for=\"username\" [class.active]=\"usernameString\" data-error=\"Oops!\">Gebruikersnaam</label>\n                        </div></div>\n\n                        <div class=\"row\">\n                            <button type=\"submit\" id=\"submitButton\" class=\"btn waves-effect teal waves-light col s2\"><p>Submit<i class=\"material-icons right\">send</i></p></button>\n                        </div>\n\n                        <div class=\"row\">\n                            <button (click)=\"logout()\" class=\"btn waves-effect waves-light col s2 red\"><p>Log uit</p></button>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    ",
            directives: [common_1.NgIf]
        }), 
        __metadata('design:paramtypes', [router_1.Router, userService_1.UserService])
    ], Profile);
    return Profile;
})();
exports.Profile = Profile;
//# sourceMappingURL=profile.js.map