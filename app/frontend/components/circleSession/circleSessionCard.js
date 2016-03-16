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
    function CircleSessionCard(userService, circleService, router) {
        this.onDelete = new core_1.EventEmitter();
        this.doAdd = false;
        this.email = "";
        this.router = router;
        this.userService = userService;
        this.circleService = circleService;
        this.user = userService.getUserId();
    }
    CircleSessionCard.prototype.deleteCircleSession = function () {
        this.onDelete.emit(this.circleSession._id);
    };
    CircleSessionCard.prototype.openCard = function () {
        this.router.navigate(['/CircleSessionGame', { id: this.circleSession._id }]);
    };
    CircleSessionCard.prototype.addUser = function () {
        var _this = this;
        $('#m' + this.circleSession._id).openModal({
            opacity: .75,
            complete: function () {
                if (_this.doAdd) {
                    _this.circleService.addUser(_this.circleSession._id, _this.email).subscribe(function (b) {
                        if (b) {
                            Materialize.toast('Speler toegevoegd.', 3000, 'rounded');
                        }
                        else {
                            Materialize.toast('Speler toevoegen mislukt.', 3000, 'rounded');
                        }
                        _this.doAdd = false;
                    }, function (err) {
                        Materialize.toast('Speler toevoegen mislukt.', 3000, 'rounded');
                    });
                }
            }
        });
    };
    CircleSessionCard.prototype.ngOnInit = function () {
        this.iamCreator = this.userService.getUserId() === this.circleSession._creatorId;
    };
    CircleSessionCard.prototype.stopGame = function () {
        alert('Stop GAME');
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
            template: "\n    <div class=\"col s4\">\n\n     <div class=\"modal\" id=\"{{'m' + circleSession._id}}\">\n        <div class=\"modal-content\">\n            <h4>Speler toevoegen</h4>\n            <div class=\"input-field col s12\">\n                <input id=\"email\" type=\"email\" class=\"validate\" [(ngModel)]=\"email\">\n                <label for=\"email\">Email</label>\n            </div>\n        </div>\n        <div class=\"modal-footer\">\n            <a class=\"modal-action modal-close waves-effect waves-green btn-flat\" (click)=\"doAdd = false\">Annuleren</a>\n            <a class=\"modal-action modal-close waves-effect waves-red btn-flat\" (click)=\"doAdd = true\">Toevoegen</a>\n        </div>\n      </div>\n\n\n\n      <div class=\"card hoverable small\">\n      <i class=\"material-icons right green-text padding-5\" *ngIf=\"user === circleSession._currentPlayerId\">gamepad</i>\n\n      <div *ngIf=\"iamCreator\" class=\"card-action\">\n            <a *ngIf=\"!circleSession._inProgress\" (click)=\"addUser()\" class=\"black-text clickable\"><i class=\"material-icons\">person_add</i></a>\n            <a (click)=\"deleteCircleSession()\" class=\"red-text clickable\"><i class=\"material-icons\">delete</i></a>\n            <a *ngIf=\"circleSession._inProgress\" (click)=\"stopGame()\" class=\"clickable\"><i class=\"material-icons\">stop</i></a>\n        </div>\n\n        <div (click)=\"openCard()\" class=\"card-content clickable scrollable\">\n            <span class=\"card-title truncate\">{{circleSession._name}}</span>\n           <p class=\"black-text\">Start: {{circleSession._startDate}}</p>\n           <p class=\"black-text\">{{circleSession._realTime ? 'Realtime' : 'Uitgesteld'}}</p>\n           <p class=\"black-text\">Einde: {{circleSession._endPoint == null ? 'Onbeperkt spel' : circleSession._endPoint + ' rondes'}}</p>\n           <p class=\"black-text\">{{circleSession._allowComment ? 'Commentaar toegelaten op kaarten' : 'Commentaar niet mogelijk op kaarten'}}</p>\n           <p class=\"black-text\">{{circleSession._isStopped ? 'Spel be\u00EBindigd' : 'Spel bezig'}}</p>\n        </div>\n      </div>\n      </div>\n  "
        }), 
        __metadata('design:paramtypes', [userService_1.UserService, circleSessionService_1.CircleSessionService, router_1.Router])
    ], CircleSessionCard);
    return CircleSessionCard;
})();
exports.CircleSessionCard = CircleSessionCard;
//# sourceMappingURL=circleSessionCard.js.map