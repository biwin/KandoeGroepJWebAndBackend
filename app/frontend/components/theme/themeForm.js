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
var theme_1 = require("../../../backend/model/theme");
var common_1 = require("angular2/common");
var common_2 = require("angular2/common");
var tagInput_1 = require("../general/tagInput");
var themeService_1 = require("../../services/themeService");
var router_1 = require("angular2/router");
var userService_1 = require("../../services/userService");
var ThemeForm = (function () {
    function ThemeForm(service, userService, router) {
        var _this = this;
        this.theme = theme_1.Theme.empty();
        this._organisations = [];
        this._themes = [];
        this._parentId = "";
        this.service = service;
        this.router = router;
        userService.getAllOrganisationsOfCurrentUser().subscribe(function (organisations) {
            _this._organisations = organisations;
        });
        service.getAll().subscribe(function (themes) {
            _this._themes = themes;
        });
    }
    ThemeForm.prototype.OnSubmit = function () {
        var _this = this;
        if (this._parentId != "") {
            this.service.createSubTheme(this.theme, this._parentId).subscribe(function (t) {
                _this.router.navigate(['ThemeOverview']);
            });
        }
        else {
            this.service.create(this.theme).subscribe(function (t) {
                _this.router.navigate(['ThemeOverview']);
            });
        }
    };
    ThemeForm = __decorate([
        core_1.Component({
            selector: 'theme-form',
            template: "\n    <div class=\"row container\">\n        <h5>Nieuw Thema</h5>\n        <div class=\"card formCard\"><div class=\"card-content\">\n            <form (submit)=\"OnSubmit()\" class=\"col s12\">\n                <div class=\"row\"><div class=\"input-field col s6\">\n                    <input [(ngModel)]=\"theme._name\" id=\"name\" type=\"text\">\n                    <label for=\"name\">Naam</label>\n                </div></div>\n\n                <div class=\"row\"><div class=\"input-field col s12\">\n                    <input [(ngModel)]=\"theme._description\" id=\"description\" type=\"text\">\n                    <label for=\"description\">Beschrijving</label>\n                </div></div>\n\n                <div class=\"row\">\n                <div class=\"input-field col s3\">\n                    <select class=\"browser-default\" [(ngModel)]=\"theme._organisationId\" id=\"organisation\">\n                        <option value=\"\">Prive</option>\n                        <option *ngFor=\"#organisation of _organisations\" value=\"{{organisation._id}}\">{{organisation._name}}</option>\n                    </select>\n                </div>\n                <div class=\"input-field col s3\">\n                    <select class=\"browser-default\" [(ngModel)]=\"_parentId\" id=\"organisation\">\n                        <option value=\"\" disabled>Subthema van</option>\n                        <option value=\"\">Geen</option>\n                        <option *ngFor=\"#theme of _themes\" value=\"{{theme._id}}\">{{theme._name}}</option>\n                    </select>\n                </div>\n                </div>\n\n                <div class=\"row\">\n                    <tags [title]=\"'Tags (splits met een puntkomma)'\" [tagArray]=\"theme._tags\"></tags>\n                </div>\n\n                <button type=\"submit\" class=\"waves-effect waves-light btn red\"><i class=\"material-icons center\">add</i></button>\n            </form>\n        </div></div>\n    </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, common_2.FORM_DIRECTIVES, tagInput_1.TagInput]
        }), 
        __metadata('design:paramtypes', [themeService_1.ThemeService, userService_1.UserService, router_1.Router])
    ], ThemeForm);
    return ThemeForm;
})();
exports.ThemeForm = ThemeForm;
//# sourceMappingURL=themeForm.js.map