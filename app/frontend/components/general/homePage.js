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
var router_1 = require("angular2/router");
var userService_1 = require("../../services/userService");
var common_1 = require("angular2/common");
var circleSessionCard_1 = require("../circleSession/circleSessionCard");
var circleSessionService_1 = require("../../services/circleSessionService");
var snapshotCard_1 = require("../snapshot/snapshotCard");
var snapshotService_1 = require("../../services/snapshotService");
var about_1 = require("./about");
var HomePage = (function () {
    function HomePage(router, userService, circleService, snapshotService) {
        var _this = this;
        this.router = router;
        this.circleSessionsInProgress = [];
        this.circleSessionsPlanned = [];
        this.circleSessionsStopped = [];
        this.snapshots = [];
        this.loading = true;
        this.doDelete = false;
        this.circleService = circleService;
        userService.getCircleSessionsOfCurrentUser().subscribe(function (circleSessions) {
            circleSessions.forEach(function (circleSession) {
                if (circleSession._inProgress && !circleSession._isStopped) {
                    _this.circleSessionsInProgress.push(circleSession);
                }
                else if (!circleSession._isStopped && !circleSession._inProgress) {
                    _this.circleSessionsPlanned.push(circleSession);
                }
                else {
                    _this.circleSessionsStopped.push(circleSession);
                }
            });
            snapshotService.getAll().subscribe(function (snapshots) {
                _this.snapshots = snapshots;
            });
            _this.loading = false;
        });
    }
    HomePage.prototype.deleteCircleSession = function (id) {
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
    HomePage.prototype.removeCircleSessionFromArray = function (id) {
        var planned = this.circleSessionsPlanned.findIndex(function (c) { return c._id == id; });
        var inProgress = this.circleSessionsInProgress.findIndex(function (c) { return c._id == id; });
        var stopped = this.circleSessionsStopped.findIndex(function (c) { return c._id == id; });
        if (planned != -1) {
            this.circleSessionsPlanned.splice(planned, 1);
        }
        else if (stopped != -1) {
            this.circleSessionsStopped.splice(stopped, 1);
        }
        else if (inProgress != -1) {
            this.circleSessionsInProgress.splice(inProgress, 1);
        }
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'home-page',
            template: "\n    <div class=\"container\">\n\n            <div class=\"modal\" id=\"mDelCircleSession\">\n                <div class=\"modal-content\">\n                    <h4>Spel verwijderen?</h4>\n                    <p>Bent u zeker dat u dit spel en alle bijhorende zetten wilt verwijderen?</p>\n                </div>\n                <div class=\"modal-footer\">\n                    <a class=\"modal-action modal-close waves-effect waves-green btn-flat\" (click)=\"doDelete = false\">Nee, ga terug</a>\n                    <a class=\"modal-action modal-close waves-effect waves-red btn-flat\" (click)=\"doDelete = true\">Ja, verwijder</a>\n                </div>\n            </div>\n\n        <div *ngIf=\"loading\" class=\"row center margin-top\">\n                <div class=\"preloader-wrapper big active\">\n                    <div class=\"spinner-layer spinner-blue-only\">\n                      <div class=\"circle-clipper left\">\n                        <div class=\"circle\"></div>\n                      </div><div class=\"gap-patch\">\n                        <div class=\"circle\"></div>\n                      </div><div class=\"circle-clipper right\">\n                        <div class=\"circle\"></div>\n                      </div>\n                    </div>\n                </div>\n            </div>\n            \n         <about-card *ngIf=\"!loading && circleSessionsInProgress.length <= 0 && circleSessionsPlanned.length <= 0 && circleSessionsStopped.length <= 0 && snapshots.length <= 0\"></about-card>\n\n        <h5 *ngIf=\"!loading && circleSessionsInProgress.length > 0\">Bezig</h5>\n        <div class=\"row\">\n            <div *ngFor=\"#circleSession of circleSessionsInProgress\">\n                <circlesession-card [circleSession]=\"circleSession\" (onDelete)=\"deleteCircleSession($event)\"></circlesession-card>\n            </div>\n        </div>\n\n        <h5 *ngIf=\"!loading && circleSessionsPlanned.length > 0\">Gepland</h5>\n        <div class=\"row\">\n            <div *ngFor=\"#circleSession of circleSessionsPlanned\">\n                <circlesession-card [circleSession]=\"circleSession\" (onDelete)=\"deleteCircleSession($event)\"></circlesession-card>\n            </div>\n        </div>\n\n        <h5 *ngIf=\"!loading && circleSessionsStopped.length > 0\">Gestopt</h5>\n        <div class=\"row\">\n            <div *ngFor=\"#circleSession of circleSessionsStopped\">\n                <circlesession-card [circleSession]=\"circleSession\" (onDelete)=\"deleteCircleSession($event)\"></circlesession-card>\n            </div>\n        </div>\n\n        <h5 *ngIf=\"!loading && snapshots.length > 0\">Snapshots</h5>\n        <div class=\"row\">\n            <div *ngFor=\"#snapshot of snapshots\">\n                <snapshot-card [snapshot]=\"snapshot\"></snapshot-card>\n            </div>\n        </div>\n\n     </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, circleSessionCard_1.CircleSessionCard, snapshotCard_1.SnapshotCard, about_1.About]
        }), 
        __metadata('design:paramtypes', [router_1.Router, userService_1.UserService, circleSessionService_1.CircleSessionService, snapshotService_1.SnapshotService])
    ], HomePage);
    return HomePage;
})();
exports.HomePage = HomePage;
//# sourceMappingURL=homePage.js.map