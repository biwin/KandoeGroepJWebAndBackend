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
var circleSessionService_1 = require("../../services/circleSessionService");
var circleSessionCard_1 = require("./circleSessionCard");
var CircleSessionOverview = (function () {
    function CircleSessionOverview(service) {
        var _this = this;
        this.circleSessions = [];
        service.getAll().subscribe(function (circleSessions) {
            circleSessions.forEach(function (c) { return _this.circleSessions.push(c); });
        });
        console.log(this.circleSessions);
    }
    CircleSessionOverview = __decorate([
        core_1.Component({
            selector: 'circlesession-overview',
            template: "\n    <div class=\"row container\">\n        <circlesession-card *ngFor=\"#circleSession of circleSessions\" [circleSession]=\"circleSession\">\n    </circlesession-card></div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, circleSessionCard_1.CircleSessionCard]
        }), 
        __metadata('design:paramtypes', [circleSessionService_1.CircleSessionService])
    ], CircleSessionOverview);
    return CircleSessionOverview;
})();
exports.CircleSessionOverview = CircleSessionOverview;
//# sourceMappingURL=circleSessionOverview.js.map