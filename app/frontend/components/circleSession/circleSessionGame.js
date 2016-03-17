var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("angular2/core");
var common_1 = require("angular2/common");
var router_1 = require("angular2/router");
var userService_1 = require("../../services/userService");
var themeService_1 = require("../../services/themeService");
var circleSessionService_1 = require("../../services/circleSessionService");
var circleSession_1 = require("../../../backend/model/circleSession");
var circleSessionPreGame_1 = require("./circleSessionPreGame");
var circleSessionUserList_1 = require("./circleSessionUserList");
var circleSessionConstants_1 = require("./../../logic/circleSessionConstants");
var circleSessionCardDetail_1 = require("./circleSessionCardDetail");
var circleSessionCardOnBoardPipe_1 = require("../../logic/circleSessionCardOnBoardPipe");
var CircleSessionGame = (function () {
    function CircleSessionGame(service, themeService, uService, socketUrl, route) {
        var _this = this;
        this.constants = new circleSessionConstants_1.CircleSessionConstants();
        this.circleSession = circleSession_1.CircleSession.empty();
        this.cards = [];
        this.pst = [];
        this.hoveredCardId = "";
        this.colors = new Map();
        this.id = route.get('id');
        this.service = service;
        this.myUserId = uService.getUserId();
        service.get(this.id).subscribe(function (circleSession) {
            _this.circleSession = circleSession;
            /*SOCKET UPDATE*/
            _this.zone = new core_1.NgZone({ enableLongStackTrace: false });
            _this.socket = io.connect(socketUrl);
            _this.socket.emit('join session', JSON.stringify({ sessionId: _this.circleSession._id || 'Unknown' }));
            _this.socket.on('send move', function (data) { return _this.zone.run(function () {
                var dataObject = JSON.parse(data);
                _this.circleSession._currentPlayerId = dataObject._currentPlayerId;
                _this.pst.find(function (p) { return p._cardId === dataObject._cardId; })._position = dataObject._cardPosition;
                _this.pst = _this.pst.slice();
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
                        _this.pst = _this.pst.slice();
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
                _this.socket.emit('send move', { _cardId: cardId, _cardPosition: r._updatedCardPosition._position, _currentPlayerId: r._currentPlayerId });
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
            template: "\n    <div class=\"padding-right-users\">\n        <div class=\"row\">\n            <h3 class=\"center-align\">{{circleSession._name}}</h3>\n        </div>\n\n        <div class=\"row\" *ngIf=\"!circleSession._inProgress\">\n            <h5>Deze sessie is nog niet actief...</h5>\n        </div>\n\n        <pregame [circleSession]=\"circleSession\" *ngIf=\"circleSession._inProgress && circleSession._isPreGame\"></pregame>\n\n        <div id=\"game\" *ngIf=\"circleSession._inProgress && !circleSession._isPreGame\">\n            <div class=\"row margin-top\">\n                <div class=\"col s6 offset-s3\">\n                    <svg [attr.viewBox]=\"constants.VIEWBOX\">\n                        <!-- Draw Kandoe board circles -->\n                        <circle *ngFor=\"#filled of constants.RINGS; #i = index\"\n                                [attr.r]=\"constants.CircleRadius(i+1)\"\n                                [attr.stroke-width]=\"constants.RING_WIDTH\"\n                                [attr.cy]=\"constants.CENTER\" [attr.cx]=\"constants.CENTER\"\n                                id=\"circle-{{i+1}}\" class=\"kandoeRing\" [class.inner]=\"filled\"/>\n\n\n                        <!-- FIXME: kleur correct aanduiden, index komt niet overeen met index hieronder -->\n                        <circle *ngFor=\"#bol of pst | onBoardCards; #i = index\"\n                                [class.hoveredBall]=\"bol._cardId != null && hoveredCardId === bol._cardId\"\n                                [id]=\"bol._cardId\"\n                                [attr.r]=\"35\"\n                                [attr.fill]=\"colors.get(bol._cardId)\"\n                                [attr.cy]=\"constants.YPOS_CIRCLE(bol._position, (1 / pst.length) * i)\"\n                                [attr.cx]=\"constants.XPOS_CIRCLE(bol._position, (1 / pst.length) * i)\" />\n                    </svg>\n                </div>\n            </div>\n            <div class=\"row\">\n                <circlesession-carddetail *ngFor=\"#card of cards; #i = index\" [canPlay]=\"circleSession._currentPlayerId === myUserId\" [card]=\"card\" [color]=\"colors.get(card._id)\" (hover)=\"hover(card._id, $event)\" (playCard)=\"playCard($event)\"></circlesession-carddetail>\n            </div>\n        </div>\n\n        <user-list [currentPlayerId]=\"circleSession._currentPlayerId\" [users]=\"circleSession._userIds\" [circleSessionId]=\"circleSession._id\"></user-list>\n    </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, circleSessionCardDetail_1.CircleSessionCardDetail, circleSessionUserList_1.CircleSessionUserList, circleSessionPreGame_1.CircleSessionPreGame],
            pipes: [circleSessionCardOnBoardPipe_1.CircleSessionCardOnBoardPipe]
        }),
        __param(3, core_1.Inject('App.SocketUrl')), 
        __metadata('design:paramtypes', [circleSessionService_1.CircleSessionService, themeService_1.ThemeService, userService_1.UserService, String, router_1.RouteParams])
    ], CircleSessionGame);
    return CircleSessionGame;
})();
exports.CircleSessionGame = CircleSessionGame;
//# sourceMappingURL=circleSessionGame.js.map