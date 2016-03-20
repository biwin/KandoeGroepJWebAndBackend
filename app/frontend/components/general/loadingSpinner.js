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
var LoadingSpinner = (function () {
    function LoadingSpinner() {
    }
    LoadingSpinner = __decorate([
        core_1.Component({
            selector: 'loading',
            template: "\n        <div class=\"row center margin-top\">\n            <div class=\"preloader-wrapper big active\">\n                <div class=\"spinner-layer spinner-blue-only\">\n                  <div class=\"circle-clipper left\">\n                    <div class=\"circle\"></div>\n                  </div><div class=\"gap-patch\">\n                    <div class=\"circle\"></div>\n                  </div><div class=\"circle-clipper right\">\n                    <div class=\"circle\"></div>\n                  </div>\n                </div>\n            </div>\n        </div>",
            directives: []
        }), 
        __metadata('design:paramtypes', [])
    ], LoadingSpinner);
    return LoadingSpinner;
})();
exports.LoadingSpinner = LoadingSpinner;
//# sourceMappingURL=loadingSpinner.js.map