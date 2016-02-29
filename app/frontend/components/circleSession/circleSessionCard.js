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
var core_2 = require("angular2/core");
var circleSession_1 = require("../../../backend/model/circleSession");
var themeService_1 = require("../../services/themeService");
var theme_1 = require("../../../backend/model/theme");
var CircleSessionCard = (function () {
    function CircleSessionCard(themeService) {
        this.theme = theme_1.Theme.empty();
        this.themeLoaded = false;
        this.service = themeService;
    }
    CircleSessionCard.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.circleSession != undefined && !this.themeLoaded) {
            this.service.getTheme(this.circleSession._themeId).subscribe(function (t) {
                _this.theme = t;
                _this.themeLoaded = true;
            });
        }
    };
    __decorate([
        core_2.Input(), 
        __metadata('design:type', circleSession_1.CircleSession)
    ], CircleSessionCard.prototype, "circleSession", void 0);
    CircleSessionCard = __decorate([
        core_1.Component({
            selector: 'circlesession-card',
            template: "\n    <div class=\"col s4\">\n      <div class=\"card hoverable\">\n        <div class=\"card-content\">\n           <span class=\"card-title\">Titel?</span>\n           <p class=\"black-text\">Group: {{circleSession._groupId}}</p>\n           <p class=\"black-text\">Theme: {{theme._name}}</p>\n           <p class=\"black-text\">Start: {{circleSession._startDate}}</p>\n           <p class=\"black-text\">{{circleSession._realTime ? 'Realtime' : 'Uitgesteld'}}</p>\n           <p class=\"black-text\">Beurt duur: {{circleSession.turnTimeMin}}</p>\n           <p class=\"black-text\">Einde: {{circleSession._endPoint}}</p>\n        </div>\n      </div>\n      </div>\n  "
        }), 
        __metadata('design:paramtypes', [themeService_1.ThemeService])
    ], CircleSessionCard);
    return CircleSessionCard;
})();
exports.CircleSessionCard = CircleSessionCard;
//# sourceMappingURL=circleSessionCard.js.map