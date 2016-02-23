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
var ThemeForm = (function () {
    function ThemeForm() {
        this.theme = theme_1.Theme.empty();
    }
    ThemeForm.prototype.OnSubmit = function () {
        this.theme._organisatorIds = ["CURRENT_USER_ID"];
        //TODO: call backend
        alert(this.theme._name + "  " + this.theme._description);
        alert(this.theme._tags);
    };
    ThemeForm = __decorate([
        core_1.Component({
            selector: 'theme-form',
            template: "\n    <div class=\"row container\">\n    <h5>Create Theme</h5>\n    <form (submit)=\"OnSubmit()\" class=\"col s12\">\n      <div class=\"row\">\n        <div class=\"input-field col s6\">\n          <input [(ngModel)]=\"theme._name\" id=\"name\" type=\"text\">\n          <label for=\"name\">Naam</label>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"input-field col s12\">\n          <input [(ngModel)]=\"theme._description\" id=\"description\" type=\"text\">\n          <label for=\"description\">Beschrijving</label>\n        </div>\n      </div>\n      <div class=\"row\">\n        <tags [title]=\"'Tags (end each tag with a semicolon)'\" [tagArray]=\"theme._tags\"></tags>\n      </div>\n      <button type=\"submit\" class=\"waves-effect waves-light btn red\"><i class=\"material-icons center\">add</i></button>\n    </form>\n  </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, common_2.FORM_DIRECTIVES, tagInput_1.TagInput]
        }), 
        __metadata('design:paramtypes', [])
    ], ThemeForm);
    return ThemeForm;
})();
exports.ThemeForm = ThemeForm;
//# sourceMappingURL=themeForm.js.map