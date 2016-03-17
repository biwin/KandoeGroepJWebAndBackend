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
var themeService_1 = require("../../services/themeService");
var theme_1 = require("../../../backend/model/theme");
var ThemeCard = (function () {
    function ThemeCard(themeService) {
        this.onDelete = new core_1.EventEmitter();
        this.cards = [];
        this.subThemeNames = [];
        this.doDelete = false;
        this.cardsLoaded = false;
        this.service = themeService;
    }
    ThemeCard.prototype.addCard = function (input) {
        var _this = this;
        if (input.value.trim().length > 0) {
            this.service.createCard(input.value.trim(), this.theme._id).subscribe(function (c) {
                _this.cards.push(c);
                input.value = "";
            });
        }
    };
    ThemeCard.prototype.ngOnInit = function () {
        var _this = this;
        if (this.theme != undefined && !this.cardsLoaded) {
            this.service.getCards(this.theme._id).subscribe(function (c) {
                c.forEach(function (card) { return _this.cards.push(card); });
                _this.cardsLoaded = true;
            });
            this.theme._subThemes.forEach(function (themeId) {
                _this.service.getTheme(themeId).subscribe(function (theme) {
                    _this.subThemeNames.push(theme._name);
                });
            });
        }
    };
    ThemeCard.prototype.deleteCard = function (cId) {
        var _this = this;
        $('#m' + this.theme._id).openModal({
            opacity: .75,
            complete: function () {
                if (_this.doDelete) {
                    _this.service.unlinkCard(_this.theme._id, cId).subscribe(function (b) {
                        if (b) {
                            Materialize.toast('Kaart verwijderd.', 3000, 'rounded');
                            _this.removeCardFromArray(cId);
                        }
                        else {
                            Materialize.toast('Verwijderen kaart mislukt.', 3000, 'rounded');
                        }
                        _this.doDelete = false;
                    }, function (err) {
                        Materialize.toast('Verwijderen kaart mislukt.', 3000, 'rounded');
                        console.warn('Delete card failed, card not found');
                    });
                }
            }
        });
    };
    ThemeCard.prototype.removeCardFromArray = function (id) {
        var i = this.cards.findIndex(function (c) { return c._id == id; });
        this.cards.splice(i, 1);
    };
    ThemeCard.prototype.deleteTheme = function () {
        this.onDelete.emit(this.theme._id);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', theme_1.Theme)
    ], ThemeCard.prototype, "theme", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ThemeCard.prototype, "onDelete", void 0);
    ThemeCard = __decorate([
        core_1.Component({
            selector: 'theme-card',
            template: "\n\n    <div class=\"col s4\">\n      <div class=\"modal\" id=\"{{'m' + theme._id}}\">\n        <div class=\"modal-content\">\n            <h4>Kaart verwijderen?</h4>\n            <p>Bent u zeker dat u deze kaart wil verwijderen van dit thema?</p>\n        </div>\n        <div class=\"modal-footer\">\n            <a class=\"modal-action modal-close waves-effect waves-green btn-flat\" (click)=\"doDelete = false\">Nee, ga terug</a>\n            <a class=\"modal-action modal-close waves-effect waves-red btn-flat\" (click)=\"doDelete = true\">Ja, verwijder</a>\n        </div>\n      </div>\n\n\n      <div class=\"card hoverable small\">\n          <div class=\"card-action\">\n                <a (click)=\"deleteTheme()\" class=\"red-text clickable\"><i class=\"material-icons\">delete</i></a>\n          </div>\n\n          <div class=\"card-content scrollable\">\n           <span class=\"card-title activator\">{{theme._name}}<i class=\"material-icons right\">filter_none</i></span>\n\n           <p class=\"black-text\">{{theme._description}}</p>\n           <br/>\n\n           <div *ngIf=\"subThemeNames.length > 0\">\n             <p class=\"black-text\">Subthema's:</p>\n             <ul class=\"collection\">\n                <li *ngFor=\"#subThemeName of subThemeNames\" class=\"collection-item\">{{subThemeName}}</li>\n             </ul>\n           </div>\n\n           <br/>\n           <div *ngFor=\"#tag of theme._tags\" class=\"chip\">{{tag}}</div>\n        </div>\n\n        <div class=\"card-reveal\">\n           <span class=\"card-title\">{{theme._name}}<i class=\"material-icons right\">close</i></span>\n           <h5>Kaartjes</h5>\n           <div>\n               <p *ngIf=\"cards.length == 0\">Nog geen kaartjes...</p>\n               <ul class=\"collection\" *ngIf=\"cards.length > 0\">\n                  <li class=\"collection-item\" *ngFor=\"#card of cards\"><i class=\"material-icons red-text clickable\" (click)=\"deleteCard(card._id)\">delete</i> {{card._name}}</li>\n                </ul>\n\n            <div class=\"row\">\n                <div class=\"col s8 input-field\">\n                    <label for=\"cardname\">Nieuw</label>\n                    <input #cardname type=\"text\" id=\"cardname\">\n                </div>\n                <div class=\"col s2 margin-top\">\n                    <a [class.disabled]=\"cardname.value.trim().length == 0\" (click)=\"addCard(cardname)\" class=\"btn-floating\"><i class=\"material-icons\">add</i></a>\n                </div>\n            </div>\n           </div>\n        </div>\n\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [themeService_1.ThemeService])
    ], ThemeCard);
    return ThemeCard;
})();
exports.ThemeCard = ThemeCard;
//# sourceMappingURL=themeCard.js.map