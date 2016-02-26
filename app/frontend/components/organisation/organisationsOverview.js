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
var common_1 = require("angular2/common");
var organisation_1 = require("../../../backend/model/organisation");
var OrganisationsOverview = (function () {
    function OrganisationsOverview(router) {
        this.organisations = [
            new organisation_1.Organisation("Delhaize", ["Michaël", "Jan"]),
            new organisation_1.Organisation("Colruyt", ["Michaël"]),
            new organisation_1.Organisation("Albert Hein", ["Michaël", "Jan", "Jasper"]),
            new organisation_1.Organisation("Aldi", ["Michaël", "Michaël", "Michaël", "Michaël", "Michaël"]),
            new organisation_1.Organisation("Euroshop", ["Michaël", "Michaël", "Michaël", "Michaël", "Michaël", "Michaël", "Michaël"])
        ];
        this.router = router;
    }
    OrganisationsOverview.prototype.onClick = function (organisationId) {
        //this.router.navigate(["/OrganisationDetail", {id: organisationId}]);
    };
    OrganisationsOverview = __decorate([
        core_1.Component({
            selector: 'organisations-overview',
            template: "\n    <div class=\"row container\">\n        <h5>Mijn organisaties</h5>\n\n        <div class=\"card\" [ngClass]=\"{tableCard: organisations.length!=0}\"><div class=\"card-content\">\n            <table class=\"striped\" *ngIf=\"organisations.length!=0\">\n                <thead>\n                    <tr>\n                        <th data-field=\"name\">Naam</th>\n                        <th data-field=\"amountOfMembers\"># leden</th>\n                    </tr>\n                </thead>\n\n                <tr *ngFor=\"#organisation of organisations\" (click)=\"onClick(organisation._id)\" class=\"clickable\">\n                    <td>{{organisation._name}}</td>\n                    <td>{{organisation._organisatorIds.length}}</td>\n                </tr>\n            </table>\n\n            <p *ngIf=\"organisations.length==0\">Je bent momenteel nog geen lid van een organisatie.</p>\n        </div></div>\n    </div>\n    ",
            directives: [common_1.NgClass]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], OrganisationsOverview);
    return OrganisationsOverview;
})();
exports.OrganisationsOverview = OrganisationsOverview;
//# sourceMappingURL=organisationsOverview.js.map