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
var circleSessionUserList_1 = require("./circleSessionUserList");
var circleSessionPreGame_1 = require("./circleSessionPreGame");
var circleSessionCardOnBoardPipe_1 = require("../../logic/circleSessionCardOnBoardPipe");
var core_2 = require("angular2/core");
var CircleSessionGame = (function () {
    function CircleSessionGame(service, themeService, route) {
        var _this = this;
        this.constants = new circleSessionConstants_1.CircleSessionConstants();
        this.circleSession = circleSession_1.CircleSession.empty();
        this.cards = [];
        this.pst = [];
        this.hoveredCardId = "";
        this.colors = new Map();
        this.id = route.get('id');
        this.service = service;
        service.get(this.id).subscribe(function (circleSession) {
            _this.circleSession = circleSession;
            /*SOCKET UPDATE*/
            _this.zone = new core_2.NgZone({ enableLongStackTrace: false });
            _this.socket = io("http://localhost:8080");
            _this.socket.emit('join session', JSON.stringify({ sessionId: _this.circleSession._id || 'Unknown' }));
            _this.socket.on('send move', function (data) { return _this.zone.run(function () {
                var dataObject = JSON.parse(data);
                _this.pst.find(function (p) { return p._cardId == dataObject._cardId; })._position = dataObject._cardPosition;
            }); });
            /*END SOCKET UPDATE*/
            if (circleSession._inProgress && !circleSession._isPreGame) {
                service.getCardPositionsOfSession(circleSession._id).subscribe(function (cps) {
                    if (cps.length > 0) {
                        cps.forEach(function (c) {
                            _this.pst.push(c);
                            var i = _this.pst.length - 1;
                            _this.colors.set(c._cardId, _this.constants.CardColor(i));
                        });
                        themeService.getCardsByIds(cps.map(function (c) { return c._cardId; })).subscribe(function (cs) {
                            _this.cards = cs;
                        });
                    }
                });
            }
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
    CircleSessionGame.prototype.playCard = function (cardId) {
        var _this = this;
        this.service.playCard(this.circleSession._id, cardId).subscribe(function (r) {
            _this.circleSession._currentPlayerId = r._currentPlayerId;
            if (r._updatedCardPosition != null) {
                _this.pst.find(function (p) { return p._cardId === r._updatedCardPosition._cardId; })._position = r._updatedCardPosition._position;
                //FIXME temporary workaround to force the Pipe to be executed again
                _this.pst = _this.pst.slice();
                _this.socket.emit('send message', JSON.stringify({ _cardId: cardId, _cardPosition: r._updatedCardPosition._position }));
            }
        }, function (r) {
            var o = r.json();
            console.error('Error while playing card...: ' + o._error);
            Materialize.toast(o._error, 3000, 'rounded');
        });
    };
    CircleSessionGame = __decorate([
        core_1.Component({
            selector: 'circlesession-game',
            template: "\n    <div class=\"padding-right-users\">\n        <div class=\"row\">\n            <h3 class=\"center-align\">{{circleSession._name}}</h3>\n        </div>\n\n        <div class=\"row\" *ngIf=\"!circleSession._inProgress\">\n            <h5>Deze sessie is nog niet actief...</h5>\n        </div>\n\n        <pregame [circleSession]=\"circleSession\" *ngIf=\"circleSession._inProgress && circleSession._isPreGame\"></pregame>\n\n        <div id=\"game\" *ngIf=\"circleSession._inProgress && !circleSession._isPreGame\">\n            <div class=\"row margin-top\">\n                <div class=\"col s8 offset-s2\">\n                    <svg [attr.viewBox]=\"constants.VIEWBOX\">\n                        <!-- Draw Kandoe board circles -->\n                        <circle *ngFor=\"#filled of constants.RINGS; #i = index\"\n                                [attr.r]=\"constants.CircleRadius(i+1)\"\n                                [attr.stroke-width]=\"constants.RING_WIDTH\"\n                                [attr.cy]=\"constants.CENTER\" [attr.cx]=\"constants.CENTER\"\n                                id=\"circle-{{i+1}}\" class=\"kandoeRing\" [class.inner]=\"filled\"/>\n\n\n                        <!-- FIXME: kleur correct aanduiden, index komt niet overeen met index hieronder -->\n                        <circle *ngFor=\"#bol of pst | onBoardCards; #i = index\"\n                                [class.hoveredBall]=\"bol._cardId != null && hoveredCardId === bol._cardId\"\n                                [id]=\"bol._cardId\"\n                                [attr.r]=\"35\"\n                                [attr.fill]=\"colors.get(bol._cardId)\"\n                                [attr.cy]=\"constants.YPOS_CIRCLE(bol._position, (1 / pst.length) * i)\"\n                                [attr.cx]=\"constants.XPOS_CIRCLE(bol._position, (1 / pst.length) * i)\" />\n                    </svg>\n                </div>\n            </div>\n            <div class=\"row\">\n                <circlesession-carddetail *ngFor=\"#card of cards; #i = index\" [card]=\"card\" [color]=\"colors.get(card._id)\" (hover)=\"hover(card._id, $event)\" (playCard)=\"playCard($event)\"></circlesession-carddetail>\n            </div>\n        </div>\n\n        <user-list [currentPlayerId]=\"circleSession._currentPlayerId\" [users]=\"circleSession._userIds\"></user-list>\n    </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, circleSessionCardDetail_1.CircleSessionCardDetail, circleSessionUserList_1.CircleSessionUserList, circleSessionPreGame_1.CircleSessionPreGame],
            pipes: [circleSessionCardOnBoardPipe_1.CircleSessionCardOnBoardPipe]
        }), 
        __metadata('design:paramtypes', [circleSessionService_1.CircleSessionService, themeService_1.ThemeService, router_1.RouteParams])
    ], CircleSessionGame);
    return CircleSessionGame;
})();
exports.CircleSessionGame = CircleSessionGame;
//# sourceMappingURL=circleSessionGame.js.map