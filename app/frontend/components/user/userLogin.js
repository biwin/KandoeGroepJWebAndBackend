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
var UserLogin = (function () {
    function UserLogin(router, service) {
        this.logInPressed = false;
        this.router = router;
        this.service = service;
    }
    UserLogin.prototype.isLoggedIn = function () {
        var token = localStorage.getItem('token');
        return token != null && token != "";
    };
    UserLogin.prototype.onSubmit = function () {
        if (this.logInPressed) {
            this.service.getUser(this.usernameString, this.passwordString).subscribe(function (token) {
                localStorage.setItem('token', token._body);
            });
            this.logInPressed = false;
        }
        else {
            this.service.registerUser(this.usernameString, this.passwordString).subscribe(function (token) {
                localStorage.setItem('token', token._body);
            });
        }
    };
    UserLogin = __decorate([
        core_1.Component({
            selector: 'user-login',
            template: "\n    <div class=\"row container\">\n        <h5>Gebruiker log in</h5>\n        <div class=\"card formCard\"><div class=\"card-content\">\n            <form class=\"col s12\" (ngSubmit)=\"onSubmit()\">\n                <div class=\"row\"><div class=\"input-field col s6\">\n                    <input id=\"name\" type=\"text\" [(ngModel)]=\"usernameString\" class=\"form-control validate\" pattern=\"([a-zA-Z0-9]{4,16})\" ngControl=\"_name\" required #name=\"ngForm\">\n                    <label for=\"name\" data-error=\"Oops!\">Gebruikersnaam</label>\n                </div></div>\n\n                <div class=\"row\"><div class=\"input-field col s6\">\n                    <input id=\"password\" type=\"password\" [(ngModel)]=\"passwordString\" class=\"form-control validate\" pattern=\"([a-zA-Z0-9]{4,16})\" ngControl=\"_password\" required #password=\"ngForm\">\n                    <label for=\"password\" data-error=\"Oops!\">Wachtwoord</label>\n                </div></div>\n\n                <div class=\"row\">\n                    <button (click)=\"logInPressed=true\" type=\"submit\" id=\"loginButton\" class=\"btn waves-effect teal waves-light col s2\"><p>Log in<i class=\"material-icons right\">send</i></p></button>\n                    <button type=\"submit\" id=\"registerButton\" class=\"btn waves-effect red waves-light col s2 offset-s1\"><p>Registreer<i class=\"material-icons right\">send</i></p></button>\n                </div>\n\n            </form>\n        </div></div>\n    </div>\n    ",
            directives: []
        }), 
        __metadata('design:paramtypes', [router_1.Router, userService_1.UserService])
    ], UserLogin);
    return UserLogin;
})();
exports.UserLogin = UserLogin;
//# sourceMappingURL=userLogin.js.map