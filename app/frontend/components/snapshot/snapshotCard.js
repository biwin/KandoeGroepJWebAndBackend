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
var core_2 = require("angular2/core");
var snapshot_1 = require("../../../backend/model/snapshot");
var router_1 = require("angular2/router");
var SnapshotCard = (function () {
    function SnapshotCard(router) {
        this.router = router;
    }
    __decorate([
        core_2.Input(), 
        __metadata('design:type', snapshot_1.Snapshot)
    ], SnapshotCard.prototype, "snapshot", void 0);
    SnapshotCard = __decorate([
        core_1.Component({
            selector: 'snapshot-card',
            template: "\n    <div class=\"col s5\">\n         <div class=\"card hoverable small\">\n            <div class=\"card-content\">\n                <p>{{snapshot._gameName}}</p>\n            </div>\n        </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], SnapshotCard);
    return SnapshotCard;
}());
exports.SnapshotCard = SnapshotCard;
//# sourceMappingURL=snapshotCard.js.map