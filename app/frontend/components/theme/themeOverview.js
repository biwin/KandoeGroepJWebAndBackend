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
var common_1 = require("angular2/common");
var themeCard_1 = require("./themeCard");
var ThemeOverview = (function () {
    function ThemeOverview() {
        this.themes = [new theme_1.Theme("Cafe's", "Cafes die we zouden kunnen bezoeken dit weekend", ["1"], ["love", "tits", "balls"]), new theme_1.Theme("scholen", "scholen voor onze zoon", ["1"], ["howest", "ikleef"]), new theme_1.Theme("De praat paal", "waarover gaan we nu weer praten?", ["1"])];
    }
    ThemeOverview = __decorate([
        core_1.Component({
            selector: 'theme-overview',
            template: "\n    <div class=\"row container\">\n        <theme-card *ngFor=\"#theme of themes\" [theme]=\"theme\">\n    </theme-card></div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, themeCard_1.ThemeCard]
        }), 
        __metadata('design:paramtypes', [])
    ], ThemeOverview);
    return ThemeOverview;
})();
exports.ThemeOverview = ThemeOverview;
//# sourceMappingURL=themeOverview.js.map