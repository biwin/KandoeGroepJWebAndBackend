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
var circleSessionService_1 = require("../../services/circleSessionService");
var circleSessionCard_1 = require("./circleSessionCard");
var userService_1 = require("../../services/userService");
var CircleSessionOverview = (function () {
    function CircleSessionOverview(service, userService) {
        var _this = this;
        this.circleSessions = [];
        this.loading = true;
        this.doDelete = false;
        this.circleService = service;
        userService.getUserId(function (u) {
            _this._currentUserId = u;
            userService.getCircleSessionsOfUserById(_this._currentUserId).subscribe(function (circleSessions) {
                _this.circleSessions = circleSessions;
                _this.loading = false;
            });
        });
    }
    CircleSessionOverview.prototype.deleteCircleSession = function (id) {
        var _this = this;
        $('#mDelCircleSession').openModal({
            opacity: .75,
            complete: function () {
                if (_this.doDelete) {
                    _this.circleService.deleteCircleSession(id).subscribe(function (b) {
                        if (b) {
                            _this.removeCircleSessionFromArray(id);
                            Materialize.toast('Spel verwijderd.', 3000, 'rounded');
                        }
                        else {
                            Materialize.toast('Verwijderen mislukt.', 3000, 'rounded');
                        }
                        _this.doDelete = false;
                    }, function () {
                        Materialize.toast('Verwijderen mislukt.', 3000, 'rounded');
                        console.warn('Delete theme failed, theme not found');
                    });
                }
            }
        });
    };
    CircleSessionOverview.prototype.removeCircleSessionFromArray = function (id) {
        var i = this.circleSessions.findIndex(function (c) { return c._id == id; });
        this.circleSessions.splice(i, 1);
    };
    CircleSessionOverview = __decorate([
        core_1.Component({
            selector: 'circlesession-overview',
            template: "\n    <div class=\"container\">\n            <div class=\"modal\" id=\"mDelCircleSession\">\n                <div class=\"modal-content\">\n                    <h4>Spel verwijderen?</h4>\n                    <p>Bent u zeker dat u dit spel en alle bijhorende zetten wilt verwijderen?</p>\n                </div>\n                <div class=\"modal-footer\">\n                    <a class=\"modal-action modal-close waves-effect waves-green btn-flat\" (click)=\"doDelete = false\">Nee, ga terug</a>\n                    <a class=\"modal-action modal-close waves-effect waves-red btn-flat\" (click)=\"doDelete = true\">Ja, verwijder</a>\n                </div>\n            </div>\n\n     <div *ngIf=\"loading\" class=\"row center margin-top\">\n                <div class=\"preloader-wrapper big active\">\n                    <div class=\"spinner-layer spinner-blue-only\">\n                      <div class=\"circle-clipper left\">\n                        <div class=\"circle\"></div>\n                      </div><div class=\"gap-patch\">\n                        <div class=\"circle\"></div>\n                      </div><div class=\"circle-clipper right\">\n                        <div class=\"circle\"></div>\n                      </div>\n                    </div>\n                </div>\n            </div>\n     <div class=\"row\">\n        <circlesession-card *ngFor=\"#circleSession of circleSessions\" [circleSession]=\"circleSession\" (onDelete)=\"deleteCircleSession($event)\"></circlesession-card>\n     </div>\n    </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, circleSessionCard_1.CircleSessionCard]
        }), 
        __metadata('design:paramtypes', [circleSessionService_1.CircleSessionService, userService_1.UserService])
    ], CircleSessionOverview);
    return CircleSessionOverview;
})();
exports.CircleSessionOverview = CircleSessionOverview;
//# sourceMappingURL=circleSessionOverview.js.map