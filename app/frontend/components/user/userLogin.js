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
var UserLogin = (function () {
    function UserLogin(router, service) {
        this.router = router;
        this.service = service;
    }
    UserLogin.prototype.getFacebookData = function (callback) {
        FB.api('/me', function (res) { callback(res.id, res.name); });
    };
    UserLogin.prototype.facebookLogin = function () {
        var _this = this;
        FB.login(function (response) {
            if (response.authResponse) {
                _this.getFacebookData(function (id, name) {
                    _this.service.loginUserFacebook(id, name).subscribe(function (token) {
                        if (token != null && token != "") {
                            if (token._body == "nope")
                                _this.errorInfo = "Error";
                            else {
                                console.log(token);
                                localStorage.setItem('token', token._body);
                                _this.router.navigate(['Profile']);
                            }
                        }
                    });
                });
            }
            else {
                alert('User cancelled login or did not fully authorize.');
            }
        }, { scope: 'public_profile,email' });
    };
    UserLogin.prototype.onLoginSubmit = function () {
        var _this = this;
        if (this.button == "login") {
            this.service.getUser(this.usernameString, this.passwordString).subscribe(function (token) {
                if (token != null && token != "") {
                    if (token._body == "nope")
                        _this.errorInfo = "Incorrecte login informatie";
                    else {
                        localStorage.setItem('token', token._body);
                        _this.router.navigate(['Profile']);
                    }
                }
            });
        }
        else if (this.button == "register") {
            this.service.registerUser(this.usernameString, this.passwordString, "email", "web").subscribe(function (token) {
                if (token != null && token != "") {
                    if (token._body == "nope")
                        _this.errorInfo = "Gebruikersnaam is reeds in gebruik";
                    else {
                        localStorage.setItem('token', token._body);
                        _this.router.navigate(['Profile']);
                    }
                }
            });
        }
    };
    UserLogin.prototype.onLogoutSubmit = function () {
        localStorage.removeItem('token');
        console.log("Removed token!");
    };
    UserLogin.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    UserLogin = __decorate([
        core_1.Component({
            selector: 'user-login',
            template: "\n    <div class=\"row container\">\n        <h5>Gebruiker log in</h5>\n        <div class=\"card formCard\"><div class=\"card-content\">\n            <form *ngIf=\"!service.isLoggedIn()\" class=\"col s12\" (ngSubmit)=\"onLoginSubmit()\">\n\n                <div class=\"row\"><div class=\"input-field col s6\">\n                    <input id=\"name\" type=\"text\" [(ngModel)]=\"usernameString\" class=\"form-control validate\" pattern=\"([a-zA-Z0-9]{4,16})\" ngControl=\"_name\" required #name=\"ngForm\">\n                    <label for=\"name\" data-error=\"Oops!\">Gebruikersnaam</label>\n                </div></div>\n\n\n\n\n                <div class=\"row\"><div class=\"input-field col s6\">\n                    <input id=\"password\" type=\"password\" [(ngModel)]=\"passwordString\" class=\"form-control validate\" pattern=\"([a-zA-Z0-9]{4,16})\" ngControl=\"_password\" required #password=\"ngForm\">\n                    <label for=\"password\" data-error=\"Oops!\">Wachtwoord</label>\n                </div></div>\n\n                <div class=\"row\"><div class=\"col s6\">\n                    <p style=\"color: #FF0000;\">{{errorInfo}}</p>\n                </div></div>\n\n                <div class=\"row\">\n                    <button (click)=\"button='login'\" type=\"submit\" id=\"loginButton\" class=\"btn waves-effect teal waves-light col s2\"><p>Log in<i class=\"material-icons right\">send</i></p></button>\n                    <button (click)=\"button='register'\" type=\"submit\" id=\"registerButton\" class=\"btn waves-effect red waves-light col s2 offset-s1\"><p>Registreer<i class=\"material-icons right\">send</i></p></button>\n                </div>\n\n                <div class=\"row\"><div class=\"col s6\">\n                    <h3>OF</h3>\n                </div></div>\n\n                <div class=\"row\">\n                    <button (click)=\"facebookLogin()\" id=\"facebookButton\" class=\"btn waves-effect blue waves-light col s2\"><p>Facebook</p></button>\n                </div>\n\n            </form>\n\n            <form *ngIf=\"service.isLoggedIn()\" class=\"col s12\" (ngSubmit)=\"onLogoutSubmit()\">\n                <div class=\"row\"><div class=\"input-field col s12\">\n                    <h2>U bent reeds ingelogd!</h2>\n                    <p style=\"word-wrap: break-word;\">Token: {{getToken()}}</p>\n                </div></div>\n\n                <div class=\"row\">\n                    <button type=\"submit\" id=\"logoutButton\" class=\"btn waves-effect teal waves-light col s2\"><p>Log uit<i class=\"material-icons right\">send</i></p></button>\n                </div>\n            </form>\n        </div></div>\n    </div>\n    ",
            directives: [common_1.NgIf]
        }), 
        __metadata('design:paramtypes', [router_1.Router, userService_1.UserService])
    ], UserLogin);
    return UserLogin;
})();
exports.UserLogin = UserLogin;
//# sourceMappingURL=userLogin.js.map