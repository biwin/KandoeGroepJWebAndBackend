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
var OrganisationDetail = (function () {
    function OrganisationDetail(router) {
        this.organisation = new organisation_1.Organisation("Delhaize", ["Michaël", "Jan", "Jasper"]);
        this.router = router;
    }
    OrganisationDetail.prototype.viewGroup = function (groupId) {
        //this.router.navigate(["/GroupDetail", {id: groupId}]);
        alert("viewGroup: " + groupId);
    };
    OrganisationDetail.prototype.viewMember = function (userId) {
        //this.router.navigate(["/UserDetail", {id: userId}]);
        alert("viewMembers: " + userId);
    };
    OrganisationDetail = __decorate([
        core_1.Component({
            selector: 'organisation-detail',
            template: "\n    <div class=\"row container\">\n        <h5>{{organisation._name}}</h5>\n\n        <div class=\"card\"><div class=\"card-content\">\n            # leden: {{organisation._memberIds.length}}\n        </div></div>\n\n\n        <h5>Groepen</h5>\n\n        <div class=\"card\" [ngClass]=\"{tableCard: organisation._groupIds.length!=0}\"><div class=\"card-content\">\n            <table class=\"striped\" *ngIf=\"organisation._groupIds.length!=0\">\n                <thead>\n                    <tr>\n                        <th data-field=\"name\">Naam</th>\n                        <th data-field=\"amountOfMembers\"># leden</th>\n                        <th data-field=\"description\">Beschrijving</th>\n                    </tr>\n                </thead>\n\n                <tr *ngFor=\"#group of organisation.groups\" (click)=\"viewGroup(group._id)\" class=\"clickable\">\n                    <td>{{group._name}}</td>\n                    <td>{{group._memberIds.length}}</td>\n                    <td>{{group._description}}</td>\n                </tr>\n            </table>\n\n            <p *ngIf=\"organisation._groupIds.length==0\">{{organisation._name}} heeft momenteel nog geen groepen.</p>\n        </div></div>\n\n\n        <h5>Leden</h5>\n\n        <div class=\"card\" [ngClass]=\"{tableCard: organisation._memberIds.length!=0}\"><div class=\"card-content\">\n            <table class=\"striped\" *ngIf=\"organisation._memberIds.length!=0\">\n                <thead>\n                    <tr>\n                        <th data-field=\"name\">Naam</th>\n                        <th data-field=\"email\">E-mail adres</th>\n                        <th data-field=\"role\">Rol</th>\n                    </tr>\n                </thead>\n\n                <tr *ngFor=\"#member of organisation._memberIds\" (click)=\"viewMember(member._id)\" class=\"clickable\">\n                    <td>{{member._name}}</td>\n                    <td>{{member._email}}</td>\n                    <td>{{member._role}}</td>\n                </tr>\n            </table>\n\n            <p *ngIf=\"organisation._memberIds.length==0\">{{organisation._name}} heeft momenteel nog geen leden.</p>\n        </div></div>\n    </div>\n    ",
            directives: [common_1.NgClass]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], OrganisationDetail);
    return OrganisationDetail;
})();
exports.OrganisationDetail = OrganisationDetail;
//# sourceMappingURL=organisationDetail.js.map