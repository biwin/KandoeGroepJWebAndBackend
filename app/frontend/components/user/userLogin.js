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
var UserLogin = (function () {
    function UserLogin(router) {
        this.router = router;
    }
    UserLogin.prototype.validate = function (test) {
        this.nameValid = true;
        console.log(this.nameValid);
    };
    UserLogin = __decorate([
        core_1.Component({
            selector: 'user-login',
            template: "\n    <div class=\"row container\">\n        <h5>Gebruiker log in</h5>\n        <div class=\"card formCard\"><div class=\"card-content\">\n            <form class=\"col s12\">\n                <div class=\"row\"><div class=\"input-field col s6\">\n                    <input id=\"name\" type=\"text\" class=\"form-control validate\" pattern=\"([a-zA-Z0-9]{4,16})\" ngControl=\"_name\" required #name=\"ngForm\" #name>\n                        <div [hidden]=\"name.valid || name.pristine\" class=\"alert alert-danger\">\n                            Name is required\n                        </div>\n                    <label>Naam</label>\n                </div></div>\n\n                <div class=\"row\"><div class=\"input-field col s6\">\n                    <input id=\"password\" type=\"password\" class=\"form-control\" required>\n                    <label>Wachtwoord</label>\n                </div></div>\n\n                <div class=\"row\">\n                    <button type=\"submit\" class=\"btn waves-effect teal waves-light col s2\"><p>Log in<i class=\"material-icons right\">send</i></p></button>\n                    <button type=\"submit\" class=\"btn waves-effect red waves-light col s2 offset-s1\"><p>Registreer<i class=\"material-icons right\">send</i></p></button>\n                </div>\n            </form>\n        </div></div>\n    </div>\n    ",
            directives: []
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], UserLogin);
    return UserLogin;
})();
exports.UserLogin = UserLogin;
//# sourceMappingURL=userLogin.js.map