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
var circleSessionConstants_1 = require("./../../logic/circleSessionConstants");
var cardPosition_1 = require("../../../backend/model/cardPosition");
var circleSessionUserList_1 = require("./circleSessionUserList");
var CircleSessionGame = (function () {
    function CircleSessionGame(service, themeService, route) {
        var _this = this;
        this.constants = new circleSessionConstants_1.CircleSessionConstants();
        this.circleSession = circleSession_1.CircleSession.empty();
        this.cards = [];
        this.pst = [];
        this.hoveredCardId = "";
        this.id = route.get('id');
        service.get(this.id).subscribe(function (circleSession) {
            _this.circleSession = circleSession;
            themeService.getCards(circleSession._themeId).subscribe(function (cs) {
                cs.forEach(function (c) {
                    _this.cards.push(c);
                    _this.pst.push(new cardPosition_1.CardPosition(_this.id, c._id, "", Math.floor(Math.random() * 5) + 1, new Date()));
                });
            });
        });
    }
    CircleSessionGame.prototype.hover = function (id, mouseover) {
        if (mouseover) {
            this.hoveredCardId = id;
        }
        else {
            this.hoveredCardId = "";
        }
    };
    CircleSessionGame = __decorate([
        core_1.Component({
            selector: 'circlesession-game',
            template: "\n    <div class=\"padding-right-users\">\n        <div class=\"row\">\n            <h3 class=\"center-align\">{{circleSession._name}}</h3>\n        </div>\n        <div class=\"row margin-top\">\n            <div class=\"col s8 offset-s2\">\n                <svg [attr.viewBox]=\"constants.VIEWBOX\">\n                    <!-- Draw Kandoe board circles -->\n                    <circle *ngFor=\"#filled of constants.RINGS; #i = index\"\n                            [attr.r]=\"constants.CircleRadius(i+1)\"\n                            [attr.stroke-width]=\"constants.RING_WIDTH\"\n                            [attr.cy]=\"constants.CENTER\" [attr.cx]=\"constants.CENTER\"\n                            id=\"circle-{{i+1}}\" class=\"kandoeRing\" [class.inner]=\"filled\"/>\n\n\n                    <!-- circle voorbeelden vervangen door cardposition -->\n                    <circle *ngFor=\"#bol of pst; #i = index\"\n                            [class.hoveredBall]=\"hoveredCardId === bol._cardId\"\n                            [id]=\"bol._cardId\"\n                            [attr.r]=\"35\" [attr.fill]=\"constants.CardColor(i)\" [attr.cy]=\"constants.YPOS_CIRCLE(bol._position, (1 / pst.length) * i)\"\n                            [attr.cx]=\"constants.XPOS_CIRCLE(bol._position, (1 / pst.length) * i)\"/>\n                </svg>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <circlesession-card *ngFor=\"#card of cards; #i = index\" [card]=\"card\" [color]=\"constants.CardColor(i)\" (hover)=\"hover(card._id, $event)\"></circlesession-card>\n        </div>\n\n        <user-list [users]=\"circleSession._userIds\"></user-list>\n    </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, circleSessionCardDetail_1.CircleSessionCardDetail, circleSessionUserList_1.CircleSessionUserList]
        }), 
        __metadata('design:paramtypes', [circleSessionService_1.CircleSessionService, themeService_1.ThemeService, router_1.RouteParams])
    ], CircleSessionGame);
    return CircleSessionGame;
})();
exports.CircleSessionGame = CircleSessionGame;
//# sourceMappingURL=circleSessionGame.js.map