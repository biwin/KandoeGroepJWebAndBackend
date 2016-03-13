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
var circleSession_1 = require("../../../backend/model/circleSession");
var router_1 = require("angular2/router");
var circleSessionService_1 = require("../../services/circleSessionService");
var userService_1 = require("../../services/userService");
var CircleSessionCard = (function () {
    function CircleSessionCard(circleSessionService, uService, router) {
        this.onDelete = new core_1.EventEmitter();
        this.router = router;
        this.circleSessionService = circleSessionService;
        this.user = uService.getUserId();
    }
    CircleSessionCard.prototype.deleteCircleSession = function () {
        this.onDelete.emit(this.circleSession._id);
    };
    CircleSessionCard.prototype.openCard = function () {
        this.router.navigate(['/CircleSessionGame', { id: this.circleSession._id }]);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', circleSession_1.CircleSession)
    ], CircleSessionCard.prototype, "circleSession", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CircleSessionCard.prototype, "onDelete", void 0);
    CircleSessionCard = __decorate([
        core_1.Component({
            selector: 'circlesession-card',
            template: "\n    <div class=\"col s4\">\n      <div class=\"card hoverable\">\n        <i class=\"material-icons right green-text padding-5\" *ngIf=\"user === circleSession._currentPlayerId\">gamepad</i>\n        <div (click)=\"openCard()\" class=\"card-content clickable\">\n            <span class=\"card-title truncate\">{{circleSession._name}}</span>\n           <p class=\"black-text\">Start: {{circleSession._startDate}}</p>\n           <p class=\"black-text\">{{circleSession._realTime ? 'Realtime' : 'Uitgesteld'}}</p>\n           <p class=\"black-text\">Einde: {{circleSession._endPoint == null ? 'Onbeperkt spel' : circleSession._endPoint + ' rondes'}}</p>\n           <p class=\"black-text\">{{circleSession._allowComment ? 'Commentaar toegelaten op kaarten' : 'Commentaar niet mogelijk op kaarten'}}</p>\n        </div>\n        <div class=\"card-action\">\n            <a (click)=\"deleteCircleSession()\" class=\"red-text clickable\"><i class=\"material-icons\">delete</i></a>\n        </div>\n      </div>\n      </div>\n  "
        }), 
        __metadata('design:paramtypes', [circleSessionService_1.CircleSessionService, userService_1.UserService, router_1.Router])
    ], CircleSessionCard);
    return CircleSessionCard;
})();
exports.CircleSessionCard = CircleSessionCard;
//# sourceMappingURL=circleSessionCard.js.map