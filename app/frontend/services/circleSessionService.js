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
var core_2 = require("angular2/core");
require("rxjs/add/operator/map");
var circleSessionCreateWrapper_1 = require("../../backend/model/circleSessionCreateWrapper");
var httpWrapperService_1 = require("./httpWrapperService");
var CircleSessionService = (function () {
    function CircleSessionService(http, path) {
        this.http = null;
        this.path = path;
        this.http = http;
    }
    CircleSessionService.prototype.getAll = function () {
        return this.http.get(this.path + 'circlesessions', false, true, false);
    };
    CircleSessionService.prototype.create = function (circleSession, emailadresses) {
        var circleSessionCreateWrapper = circleSessionCreateWrapper_1.CircleSessionCreateWrapper.empty();
        circleSessionCreateWrapper._circleSession = circleSession;
        circleSessionCreateWrapper._userEmailAdresses = emailadresses;
        return this.http.post(this.path + 'circlesessions', JSON.stringify(circleSessionCreateWrapper), true, true, false);
    };
    CircleSessionService.prototype.get = function (id) {
        return this.http.get(this.path + 'circlesessions/' + id, false, true, false);
    };
    CircleSessionService.prototype.getCircleSessionCards = function (circleSessionId) {
        return this.http.get(this.path + 'circlesessions/' + circleSessionId + '/cards', false, true, false);
    };
    CircleSessionService.prototype.initCards = function (circlesessionId, selectedCards) {
        return this.http.post(this.path + 'circlesessions/' + circlesessionId + '/cards', JSON.stringify(selectedCards), true, true, true);
    };
    CircleSessionService.prototype.deleteCircleSession = function (circleSessionId) {
        return this.http.delete(this.path + 'circlesessions/' + circleSessionId, false, false, true);
    };
    CircleSessionService.prototype.addUser = function (circleSessionId, email) {
        return this.http.post(this.path + 'circlesessions/' + circleSessionId, JSON.stringify({ email: email }), true, false, true);
    };
    CircleSessionService = __decorate([
        core_1.Injectable(),
        __param(1, core_2.Inject('App.BackendPath')), 
        __metadata('design:paramtypes', [httpWrapperService_1.HttpWrapperService, String])
    ], CircleSessionService);
    return CircleSessionService;
})();
exports.CircleSessionService = CircleSessionService;
//# sourceMappingURL=circleSessionService.js.map