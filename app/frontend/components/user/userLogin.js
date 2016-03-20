/// <reference path="../../../../typings/facebook.d.ts" />
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
var loadingSpinner_1 = require("../general/loadingSpinner");
var UserLogin = (function () {
    function UserLogin(router, service) {
        this.callInProgress = false;
        this.router = router;
        this.service = service;
    }
    UserLogin.prototype.getFacebookStandardData = function (callback) {
        FB.api('/me?fields=email,name,picture.type(small)', function (res1) {
            FB.api('/me?fields=picture.type(large)', function (res2) {
                callback(res1.id, res1.name, res1.email, res1.picture.data.url, res2.picture.data.url);
            });
        });
    };
    UserLogin.prototype.facebookLogin = function () {
        var _this = this;
        this.callInProgress = true;
        FB.login(function (res) {
            if (res.authResponse) {
                _this.getFacebookStandardData(function (id, name, email, pictureSmall, pictureLarge) {
                    _this.service.loginUserFacebook(id, name, email, pictureSmall, pictureLarge).subscribe(function (token) {
                        _this.callInProgress = false;
                        if (token != null) {
                            if (token == "nope")
                                _this.errorInfo = "Error";
                            else
                                _this.setLoggedIn(token);
                        }
                    });
                });
            }
            else {
                alert('User cancelled login or did not fully authorize.');
            }
        }, { scope: 'public_profile' });
    };
    UserLogin.prototype.setLoggedIn = function (token) {
        localStorage.setItem('token', token);
        this.router.navigate(['Home']);
        this.service.notifyLoggedIn();
    };
    UserLogin.prototype.onLoginSubmit = function () {
        var _this = this;
        this.callInProgress = true;
        if (this.button == "login") {
            this.service.getUser(this.emailString, this.passwordString).subscribe(function (token) {
                if (token != null) {
                    if (token == "nope")
                        _this.errorInfo = "Incorrecte login informatie";
                    else
                        _this.setLoggedIn(token);
                }
            });
        }
        else if (this.button == "register") {
            this.service.registerUser("", this.passwordString, this.emailString, "web").subscribe(function (token) {
                if (token != null) {
                    if (token == "nope")
                        _this.errorInfo = "Email is reeds in gebruik";
                    else
                        _this.setLoggedIn(token);
                }
            });
        }
    };
    UserLogin.prototype.onLogoutSubmit = function () {
        localStorage.removeItem('token');
    };
    UserLogin.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    UserLogin = __decorate([
        core_1.Component({
            selector: 'user-login',
            template: "\n    <loading *ngIf=\"callInProgress\"></loading>\n\n    <div [hidden]=\"callInProgress\" class=\"row container\">\n        <div class=\"card formCard col s6 offset-s3\"><div class=\"card-content\">\n            <h5>Gebruiker log in</h5>\n            <form *ngIf=\"!service.isLoggedIn()\" class=\"col s12\" (ngSubmit)=\"onLoginSubmit()\">\n\n                <div class=\"row\"><div class=\"input-field col s12\">\n                    <input id=\"email\" type=\"email\" [(ngModel)]=\"emailString\" class=\"form-control validate\" ngControl=\"_email\" required #email=\"ngForm\">\n                    <label for=\"email\" data-error=\"Oops!\">Email</label>\n                </div></div>\n\n                <div class=\"row\"><div class=\"input-field col s12\">\n                    <input id=\"password\" type=\"password\" [(ngModel)]=\"passwordString\" class=\"form-control validate\" pattern=\"([a-zA-Z0-9]{4,16})\" ngControl=\"_password\" required #password=\"ngForm\">\n                    <label for=\"password\" data-error=\"Oops!\">Wachtwoord</label>\n                </div></div>\n\n                <div class=\"row\"><div class=\"col s12\">\n                    <p id=\"error\" style=\"color: #FF0000;\">{{errorInfo}}</p>\n                </div></div>\n\n                <div class=\"row\">\n                    <button (click)=\"button='login'\" type=\"submit\" id=\"loginButton\" class=\"btn waves-effect teal waves-light col s5\"><p>Log in<i class=\"material-icons right\">send</i></p></button>\n                    <button (click)=\"button='register'\" type=\"submit\" id=\"registerButton\" class=\"btn waves-effect red waves-light col s5 offset-s2\"><p>Registreer<i class=\"material-icons right\">send</i></p></button>\n                </div>\n\n                <div class=\"row\"><div class=\"col s4 offset-s4\">\n                    <h3 class=\"center-align\">OF</h3>\n                </div></div>\n\n                <div class=\"row\">\n                    <button (click)=\"facebookLogin()\" id=\"facebookButton\" class=\"btn waves-effect blue waves-light col s4 offset-s4\"><p><i class=\"fa fa-facebook-official left\"></i>Facebook</p></button>\n                </div>\n\n            </form>\n\n            <form *ngIf=\"service.isLoggedIn()\" class=\"col s12\" (ngSubmit)=\"onLogoutSubmit()\">\n                <div class=\"row\"><div class=\"input-field col s12\">\n                    <h2>U bent reeds ingelogd!</h2>\n                    <p style=\"word-wrap: break-word;\">Token: {{getToken()}}</p>\n                </div></div>\n\n                <div class=\"row\">\n                    <button type=\"submit\" id=\"logoutButton\" class=\"btn waves-effect teal waves-light col s2\"><p>Log uit<i class=\"material-icons right\">send</i></p></button>\n                </div>\n            </form>\n        </div></div>\n    </div>\n    ",
            directives: [common_1.NgIf, loadingSpinner_1.LoadingSpinner]
        }), 
        __metadata('design:paramtypes', [router_1.Router, userService_1.UserService])
    ], UserLogin);
    return UserLogin;
})();
exports.UserLogin = UserLogin;
//# sourceMappingURL=userLogin.js.map