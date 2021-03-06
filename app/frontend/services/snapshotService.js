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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("angular2/core");
var httpWrapperService_1 = require("./httpWrapperService");
/**
 * Class that is responsible for a link between the frontend and the backend for snapshots.
 * Uses the snapshot routes in the server.js file
 */
var SnapshotService = (function () {
    function SnapshotService(http, path) {
        this.http = null;
        this.path = path;
        this.http = http;
    }
    SnapshotService.prototype.getAll = function () {
        return this.http.get(this.path + 'snapshots', false, true, true);
    };
    SnapshotService.prototype.createSnapshot = function (circleSessionId) {
        return this.http.post(this.path + 'snapshots', JSON.stringify({ _sessionId: circleSessionId }), true, true, true);
    };
    SnapshotService.prototype.getById = function (snapshotId) {
        return this.http.get(this.path + 'snapshots/' + snapshotId, false, true, true);
    };
    SnapshotService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject('App.BackendPath')), 
        __metadata('design:paramtypes', [httpWrapperService_1.HttpWrapperService, String])
    ], SnapshotService);
    return SnapshotService;
}());
exports.SnapshotService = SnapshotService;
//# sourceMappingURL=snapshotService.js.map