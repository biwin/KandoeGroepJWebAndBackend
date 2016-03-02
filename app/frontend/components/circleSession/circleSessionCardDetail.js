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
var card_1 = require("../../../backend/model/card");
var CircleSessionCardDetail = (function () {
    function CircleSessionCardDetail() {
        this.color = "";
        this.hover = new core_1.EventEmitter();
    }
    CircleSessionCardDetail.prototype.onMouseEnter = function () {
        this.hover.emit(true);
    };
    CircleSessionCardDetail.prototype.onMouseLeave = function () {
        this.hover.emit(false);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', card_1.Card)
    ], CircleSessionCardDetail.prototype, "card", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CircleSessionCardDetail.prototype, "color", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CircleSessionCardDetail.prototype, "hover", void 0);
    CircleSessionCardDetail = __decorate([
        core_1.Component({
            selector: 'circlesession-card',
            template: "\n        <div class=\"col s3\">\n      <div class=\"card hoverable\" [style.background]=\"color\" (mouseenter)=\"onMouseEnter()\" (mouseleave)=\"onMouseLeave()\">\n        <div class=\"card-content container\">\n            <div class=\"row\">\n                <div class=\"col s12 center\">\n                  <a class=\"btn-floating btn waves-effect waves-light blue\"><i class=\"material-icons\">arrow_upward</i></a>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col s12 center\">\n                    {{card._name}}\n                </div>\n            </div>\n        </div>\n      </div>\n      </div>\n\n    ",
            directives: [common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], CircleSessionCardDetail);
    return CircleSessionCardDetail;
})();
exports.CircleSessionCardDetail = CircleSessionCardDetail;
//# sourceMappingURL=circleSessionCardDetail.js.map