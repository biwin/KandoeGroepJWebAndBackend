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
var http_1 = require("angular2/http");
var core_2 = require("angular2/core");
var http_2 = require("angular2/http");
require("rxjs/add/operator/map");
var CircleSessionService = (function () {
    function CircleSessionService(http, path) {
        this.http = null;
        this.path = path;
        this.http = http;
    }
    CircleSessionService.prototype.getAll = function () {
        return this.http.get(this.path + 'circlesessions').map(function (res) { return res.json(); });
    };
    CircleSessionService.prototype.create = function (circleSession) {
        var header = new http_2.Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post(this.path + 'circlesessions', JSON.stringify(circleSession), { headers: header }).map(function (res) { return res.json(); });
    };
    CircleSessionService.prototype.get = function (id) {
        return this.http.get(this.path + 'circlesessions/' + id).map(function (res) { return res.json(); });
    };
    CircleSessionService = __decorate([
        core_1.Injectable(),
        __param(1, core_2.Inject('App.BackendPath')), 
        __metadata('design:paramtypes', [http_1.Http, String])
    ], CircleSessionService);
    return CircleSessionService;
})();
exports.CircleSessionService = CircleSessionService;
//# sourceMappingURL=circleSessionService.js.map