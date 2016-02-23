var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var theme_1 = require("../../../backend/model/theme");
var core_1 = require("angular2/core");
var core_2 = require("angular2/core");
var ThemeCard = (function () {
    function ThemeCard() {
    }
    __decorate([
        core_2.Input(), 
        __metadata('design:type', theme_1.Theme)
    ], ThemeCard.prototype, "theme", void 0);
    ThemeCard = __decorate([
        core_1.Component({
            selector: 'theme-card',
            template: "\n    <div class=\"col s4\">\n      <div class=\"card hoverable m4\">\n        <div class=\"card-content\">\n           <span class=\"card-title activator\">{{theme._name}}<i class=\"material-icons right\">info_outline</i></span>\n           <p class=\"black-text\">{{theme._description}}</p>\n           <br/>\n           <div *ngFor=\"#tag of theme._tags\" class=\"chip\">{{tag}}</div>\n        </div>\n        <div class=\"card-reveal\">\n           <span class=\"card-title\">{{theme._name}}<i class=\"material-icons right\">close</i></span>\n           <div class=\"card-panel m12 white\">\n                ITEM 1\n           </div>\n        </div>\n      </div>\n      </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ThemeCard);
    return ThemeCard;
})();
exports.ThemeCard = ThemeCard;
//# sourceMappingURL=themeCard.js.map