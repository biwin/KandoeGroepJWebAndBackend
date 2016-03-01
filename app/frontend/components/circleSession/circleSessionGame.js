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
var circleSession_1 = require("../../../backend/model/circleSession");
var router_1 = require("angular2/router");
var themeService_1 = require("../../services/themeService");
var circleSessionCardDetail_1 = require("./circleSessionCardDetail");
var CircleSessionGame = (function () {
    function CircleSessionGame(service, themeService, route) {
        var _this = this;
        this.circleSession = circleSession_1.CircleSession.empty();
        this.cards = [];
        this.id = route.get('id');
        service.get(this.id).subscribe(function (circleSession) {
            _this.circleSession = circleSession;
            themeService.getCards(circleSession._themeId).subscribe(function (cs) {
                cs.forEach(function (c) { return _this.cards.push(c); });
            });
        });
    }
    CircleSessionGame = __decorate([
        core_1.Component({
            selector: 'circlesession-game',
            template: "\n    <div class=\"container\">\n        <div class=\"row margin-top\">\n            <div class=\"col s12 kandoeCircle\">\n            </div>\n        </div>\n        <div class=\"row\">\n            <circlesession-card *ngFor=\"#card of cards\" [card]=\"card\"></circlesession-card>\n        </div>\n    </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, circleSessionCardDetail_1.CircleSessionCardDetail]
        }), 
        __metadata('design:paramtypes', [circleSessionService_1.CircleSessionService, themeService_1.ThemeService, router_1.RouteParams])
    ], CircleSessionGame);
    return CircleSessionGame;
})();
exports.CircleSessionGame = CircleSessionGame;
//# sourceMappingURL=circleSessionGame.js.map