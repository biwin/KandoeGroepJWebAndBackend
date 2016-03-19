"use strict";
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
/**
 * Pipe that will force that only cards that are on the board will be drawn
 */
var CircleSessionCardOnBoardPipe = (function () {
    function CircleSessionCardOnBoardPipe() {
    }
    CircleSessionCardOnBoardPipe.prototype.transform = function (input, args) {
        return input.filter(function (c) {
            return c._position > 0 && c._position <= 5;
        });
    };
    CircleSessionCardOnBoardPipe = __decorate([
        core_1.Pipe({
            name: 'onBoardCards'
        }), 
        __metadata('design:paramtypes', [])
    ], CircleSessionCardOnBoardPipe);
    return CircleSessionCardOnBoardPipe;
}());
exports.CircleSessionCardOnBoardPipe = CircleSessionCardOnBoardPipe;
//# sourceMappingURL=circleSessionCardOnBoardPipe.js.map