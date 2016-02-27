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
var common_1 = require("angular2/common");
var themeCard_1 = require("./themeCard");
var themeService_1 = require("../../services/themeService");
var ThemeOverview = (function () {
    function ThemeOverview(service) {
        /*var a = [new Theme("Cafe's", "Cafes die we zouden kunnen bezoeken dit weekend", ["1"], ["love", "tits", "balls"]),new Theme("scholen", "scholen voor onze zoon", ["1"], ["howest", "ikleef"]), new Theme("De praat paal", "waarover gaan we nu weer praten?", ["1"])];

         a.forEach((t:Theme) => {
         service.create(t).subscribe((th:Theme) => {
         console.log(th);
         })
         });*/
        var _this = this;
        this.loading = true;
        this.themes = [];
        service.getAll().subscribe(function (themes) {
            themes.forEach(function (t) { return _this.themes.push(t); });
            _this.loading = false;
        });
    }
    ThemeOverview = __decorate([
        core_1.Component({
            selector: 'theme-overview',
            template: "\n        <div class=\"container\">\n            <div *ngIf=\"loading\" class=\"row center margin-top\">\n                <div class=\"preloader-wrapper big active\">\n                    <div class=\"spinner-layer spinner-blue-only\">\n                      <div class=\"circle-clipper left\">\n                        <div class=\"circle\"></div>\n                      </div><div class=\"gap-patch\">\n                        <div class=\"circle\"></div>\n                      </div><div class=\"circle-clipper right\">\n                        <div class=\"circle\"></div>\n                      </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <theme-card *ngFor=\"#theme of themes\" [theme]=\"theme\">\n                </theme-card>\n            </div>\n        </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, themeCard_1.ThemeCard]
        }), 
        __metadata('design:paramtypes', [themeService_1.ThemeService])
    ], ThemeOverview);
    return ThemeOverview;
})();
exports.ThemeOverview = ThemeOverview;
//# sourceMappingURL=themeOverview.js.map