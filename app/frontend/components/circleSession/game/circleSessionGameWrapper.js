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
var common_1 = require("angular2/common");
var circleSession_1 = require("../../../../backend/model/circleSession");
var circleSessionPreGame_1 = require("./circleSessionPreGame");
var circleSessionGame_1 = require("./circleSessionGame");
var circleSessionUserList_1 = require("./circleSessionUserList");
var circleSessionService_1 = require("../../../services/circleSessionService");
var router_1 = require("angular2/router");
var loadingSpinner_1 = require("../../general/loadingSpinner");
var CircleSessionGameWrapper = (function () {
    function CircleSessionGameWrapper(csService, routeParams) {
        var _this = this;
        this.loading = true;
        this.circleSession = circleSession_1.CircleSession.empty();
        var sessionId = routeParams.get('id');
        this.service = csService;
        this.service.get(sessionId).subscribe(function (cs) {
            _this.circleSession = cs;
            _this.loading = false;
        });
    }
    CircleSessionGameWrapper = __decorate([
        core_1.Component({
            selector: 'gamewrapper',
            template: "\n        <div class=\"padding-right-users\">       \n            <loading *ngIf=\"loading\"></loading>\n            \n            <div class=\"row\" *ngIf=\"!loading\">\n                <h3 class=\"center-align\">{{circleSession._name}}</h3>\n            </div>\n        \n            <div class=\"row\" *ngIf=\"!loading && !circleSession._inProgress\">\n                <h5>Deze sessie is nog niet actief...</h5>\n            </div>\n            \n            <pregame *ngIf=\"!loading && circleSession._isPreGame && circleSession._inProgress\" [circleSession]=\"circleSession\"></pregame>\n            <circlesession-game *ngIf=\"!loading && circleSession._inProgress && !circleSession._isPreGame\" [circleSession]=\"circleSession\"></circlesession-game>\n            \n            <user-list *ngIf=\"!loading\" [currentPlayerId]=\"circleSession._currentPlayerId\" [users]=\"circleSession._userIds\" [circleSessionId]=\"circleSession._id\"></user-list>\n        </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, circleSessionPreGame_1.CircleSessionPreGame, circleSessionGame_1.CircleSessionGame, circleSessionUserList_1.CircleSessionUserList, loadingSpinner_1.LoadingSpinner]
        }), 
        __metadata('design:paramtypes', [circleSessionService_1.CircleSessionService, router_1.RouteParams])
    ], CircleSessionGameWrapper);
    return CircleSessionGameWrapper;
}());
exports.CircleSessionGameWrapper = CircleSessionGameWrapper;
//# sourceMappingURL=circleSessionGameWrapper.js.map