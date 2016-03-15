///<reference path="../../../../typings/jquery/jquery.d.ts" />
///<reference path="../../../../typings/materialize-css/materialize-css.d.ts"/>
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
var circleSession_1 = require("../../../backend/model/circleSession");
var circleSessionService_1 = require("../../services/circleSessionService");
var userService_1 = require("../../services/userService");
var CircleSessionPreGame = (function () {
    function CircleSessionPreGame(cService, uService) {
        this.circleSession = circleSession_1.CircleSession.empty();
        this.cards = [];
        this.selectedCards = [];
        this.circleService = cService;
        this.myUserId = uService.getUserId();
    }
    CircleSessionPreGame.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.circleSession._id != undefined && this.circleSession._id.length > 0) {
            this.circleService.getCircleSessionCards(this.circleSession._id).subscribe(function (wrappers) {
                _this.cards = wrappers;
                $('.tooltipped').tooltip({ delay: 50 });
            });
        }
    };
    CircleSessionPreGame.prototype.selectCard = function (id) {
        if (this.selectedCards.length >= 3) {
            Materialize.toast('Je mag maar 3 kaartjes kiezen!', 3000, 'rounded');
        }
        else {
            this.selectedCards.push(id);
        }
    };
    CircleSessionPreGame.prototype.unselectCard = function (id) {
        var i = this.selectedCards.indexOf(id);
        this.selectedCards.splice(i, 1);
    };
    CircleSessionPreGame.prototype.clear = function () {
        this.selectedCards.splice(0, this.selectedCards.length);
    };
    CircleSessionPreGame.prototype.submitCards = function () {
        var _this = this;
        this.circleService.initCards(this.circleSession._id, this.selectedCards).subscribe(function (r) {
            if (r._error == null) {
                _this.circleSession._currentPlayerId = r._currentPlayerId;
                if (r._roundEnded === true)
                    _this.circleSession._isPreGame = false;
                _this.cards = _this.cards.map(function (c) {
                    if (_this.selectedCards.indexOf(c.card._id) > -1)
                        c.inPlay = true;
                    return c;
                });
                _this.selectedCards.splice(0, _this.selectedCards.length);
            }
            Materialize.toast('Done', 3000, 'rounded');
        }, function (r) {
            var o = r.json();
            Materialize.toast(o._error, 3000, 'rounded');
            console.error('Error while adding card to game...: ' + o._error);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', circleSession_1.CircleSession)
    ], CircleSessionPreGame.prototype, "circleSession", void 0);
    CircleSessionPreGame = __decorate([
        core_1.Component({
            selector: 'pregame',
            template: "\n        <div class=\"row container\">\n              <div class=\"fixed-action-btn\" id=\"sessionPreGameSave\">\n                <a (click)=\"submitCards()\" class=\"btn-floating btn-large red\">\n                  <i class=\"large material-icons\">arrow_forward</i>\n                </a>\n                <ul>\n                  <li><a (click)=\"clear()\" class=\"btn-floating orange\"><i class=\"material-icons\">undo</i></a></li>\n                </ul>\n              </div>\n\n            <h5 class=\"center-align\">Kies de kaarten die belangrijk zijn voor jou!</h5>\n            <div *ngIf=\"myUserId === circleSession._currentPlayerId\">\n                <div class=\"col s12 m4\" *ngFor=\"#card of cards\">\n                    <div class=\"card-panel\">\n                        <span class=\"truncate\">\n                            <a (click)=\"selectCard(card.card._id)\" *ngIf=\"!card.inPlay && selectedCards.indexOf(card.card._id) < 0\" class=\"z-depth-0 btn-floating btn waves-effect waves-light blue\"><i class=\"material-icons\">add</i></a>\n                            <a (click)=\"unselectCard(card.card._id)\" *ngIf=\"!card.inPlay && selectedCards.indexOf(card.card._id) >= 0\" class=\"z-depth-0 btn-floating btn waves-effect waves-light red\"><i class=\"material-icons\">remove</i></a>\n                            <a *ngIf=\"card.inPlay\" class=\"z-depth-0 btn-floating btn disabled-with-tooltip tooltipped\" data-position=\"bottom\" data-delay=\"50\" data-tooltip=\"Deze kaart is al door een andere speler gekozen.\"><i class=\"material-icons\">remove</i></a>\n                            <span class=\"center-align\">  {{card.card._name}}</span>\n                        </span>\n                   </div>\n                </div>\n            </div>\n            <div *ngIf=\"myUserId !== circleSession._currentPlayerId\" class=\"col s12\">\n                <h6>Beurt voorbij! Wacht tot iedereen kaartjes gekozen heeft om het spel te beginnen...</h6>\n            </div>\n        </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [circleSessionService_1.CircleSessionService, userService_1.UserService])
    ], CircleSessionPreGame);
    return CircleSessionPreGame;
})();
exports.CircleSessionPreGame = CircleSessionPreGame;
//# sourceMappingURL=circleSessionPreGame.js.map