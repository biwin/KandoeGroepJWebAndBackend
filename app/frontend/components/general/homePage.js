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
var HomePage = (function () {
    function HomePage(router) {
        this.router = router;
    }
    HomePage = __decorate([
        core_1.Component({
            selector: 'home-page',
            template: "\n     <div class=\"row container\">\n            <h5>Home</h5>\n            <div class=\"card formCard\">\n                <div class=\"card-content\">\n                    <div class=\"row\">\n                        <p>Am I fabulous yet?</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
            directives: []
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], HomePage);
    return HomePage;
})();
exports.HomePage = HomePage;
//# sourceMappingURL=homePage.js.map