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
var OrganisationService = (function () {
    function OrganisationService(http, path) {
        this.http = null;
        this.path = path;
        this.http = http;
    }
    OrganisationService.prototype.createOrganisation = function (organisation) {
        var header = new http_1.Headers();
        header.append("Content-Type", "application/json");
        return this.http.post(this.path + "organisations/", JSON.stringify(organisation), { headers: header }).map(function (res) { return res.json(); });
    };
    OrganisationService.prototype.getGroupsOfOrganisationById = function (organisationId) {
        var header = new http_1.Headers();
        header.append("Content-Type", "application/json");
        return this.http.get(this.path + "organisations/" + organisationId + "/groups").map(function (res) { return res.json(); });
    };
    OrganisationService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject("App.BackendPath")), 
        __metadata('design:paramtypes', [http_1.Http, String])
    ], OrganisationService);
    return OrganisationService;
})();
exports.OrganisationService = OrganisationService;
//# sourceMappingURL=organisationService.js.map