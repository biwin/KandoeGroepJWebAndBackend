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
var router_1 = require("angular2/router");
var core_1 = require("angular2/core");
var snapshotService_1 = require("../../services/snapshotService");
var snapshot_1 = require("../../../backend/model/snapshot");
var SnapshotDetail = (function () {
    function SnapshotDetail(service, route) {
        var _this = this;
        this.snapshot = snapshot_1.Snapshot.empty();
        service.getById(route.get('id')).subscribe(function (snapshot) {
            _this.snapshot = snapshot;
        });
    }
    SnapshotDetail = __decorate([
        core_1.Component({
            selector: 'snapshot-detail',
            template: "\n    <div class=\"row container\">\n        <h5>Snapshot</h5>\n        \n        <div class=\"card\"><div class=\"card-content\">\n            <h6>{{snapshot._gameName}}</h6>\n            <h6>{{snapshot._timestamp}}</h6>\n        </div></div>\n    \n        <div class=\"card tableCard\"><div class=\"card-content\">\n            \n            <table class=\"striped\">\n                <thead>\n                    <tr>\n                        <th data-field=\"cardName\">Spelers</th>\n                    </tr>\n                </thead>\n\n                <tr *ngFor=\"#player of snapshot._playerNames\" (click)=\"viewGroup(group._id)\" class=\"clickable\">\n                    <td>{{player}}</td>\n                </tr>\n            </table>\n            \n        </div></div>\n    \n        <h5>Kaarten</h5>\n        <div class=\"card tableCard\"><div class=\"card-content\">\n            \n            <table class=\"striped\">\n                <thead>\n                    <tr>\n                        <th data-field=\"cardName\">Kaart</th>\n                        <th data-field=\"position\">Plaats</th>\n                    </tr>\n                </thead>\n\n                <tr *ngFor=\"#card of snapshot._cards\" (click)=\"viewGroup(group._id)\" class=\"clickable\">\n                    <td>{{card._cardName}}</td>\n                    <td>{{card._position}}</td>\n                </tr>\n            </table>\n            \n        </div></div>\n        \n        <div *ngIf=\"snapshot._chat.length != 0 \">\n            <h5>Chat</h5>\n            <div class=\"card tableCard\"><div class=\"card-content\">\n            \n                <table>\n                    <thead>\n                        <tr>\n                            <th data-field=\"cardName\">Speler</th>\n                            <th data-field=\"cardName\">Bericht</th>\n                            <th data-field=\"position\">Tijdstip</th>\n                        </tr>\n                    </thead>\n                \n                    <tr *ngFor=\"#message of snapshot._chat\" (click)=\"viewGroup(group._id)\" class=\"clickable\">\n                        <td>{{message._userName}}</td>\n                        <td>{{message._message}}</td>\n                        <td>{{message._timestamp}}</td>\n                    </tr>\n                </table>\n\n            </div></div>\n        </div>\n    </div>\n    ",
            directives: []
        }), 
        __metadata('design:paramtypes', [snapshotService_1.SnapshotService, router_1.RouteParams])
    ], SnapshotDetail);
    return SnapshotDetail;
}());
exports.SnapshotDetail = SnapshotDetail;
//# sourceMappingURL=snapshotDetail.js.map