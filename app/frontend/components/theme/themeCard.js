var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var theme_1 = require("../../../backend/model/theme");
var core_1 = require("angular2/core");
var themeService_1 = require("../../services/themeService");
var ThemeCard = (function () {
    function ThemeCard(themeService) {
        this.cards = [];
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
    ThemeCard.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.theme != undefined && !this.cardsLoaded) {
            this.service.getCards(this.theme._id).subscribe(function (c) {
                c.forEach(function (card) { return _this.cards.push(card); });
                _this.cardsLoaded = true;
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', theme_1.Theme)
    ], ThemeCard.prototype, "theme", void 0);
    ThemeCard = __decorate([
        core_1.Component({
            selector: 'theme-card',
            template: "\n    <div class=\"col s4\">\n      <div class=\"card small hoverable\">\n        <div class=\"card-content\">\n           <span class=\"card-title activator\">{{theme._name}}<i class=\"material-icons right\">filter_none</i></span>\n           <p class=\"black-text\">{{theme._description}}</p>\n           <br/>\n           <div *ngFor=\"#tag of theme._tags\" class=\"chip\">{{tag}}</div>\n        </div>\n        <div class=\"card-reveal\">\n           <span class=\"card-title\">{{theme._name}}<i class=\"material-icons right\">close</i></span>\n           <h5>Kaartjes</h5>\n           <div class=\"container\">\n               <p *ngIf=\"cards.length == 0\">Nog geen kaartjes...</p>\n               <ul class=\"collection\" *ngIf=\"cards.length > 0\">\n                  <li class=\"collection-item\" *ngFor=\"#card of cards\">{{card._name}}</li>\n                </ul>\n\n            <div class=\"row\">\n                <div class=\"col s8 input-field\">\n                    <label for=\"cardname\">Nieuw</label>\n                    <input #cardname type=\"text\" id=\"cardname\">\n                </div>\n                <div class=\"col s2 margin-top\">\n                    <a [class.disabled]=\"cardname.value.trim().length == 0\" (click)=\"addCard(cardname)\" href=\"#\" class=\"btn-floating\"><i class=\"material-icons\">add</i></a>\n                </div>\n            </div>\n           </div>\n        </div>\n      </div>\n      </div>\n  "
        }), 
        __metadata('design:paramtypes', [themeService_1.ThemeService])
    ], ThemeCard);
    return ThemeCard;
})();
exports.ThemeCard = ThemeCard;
//# sourceMappingURL=themeCard.js.map