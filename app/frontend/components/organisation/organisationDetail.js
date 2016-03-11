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
var organisationService_1 = require("../../services/organisationService");
var OrganisationDetail = (function () {
    function OrganisationDetail(router, routeParam, organisationService) {
        var _this = this;
        var organisationId = routeParam.params["id"];
        this.router = router;
        organisationService.getOrganisationById(organisationId).subscribe(function (organisation) {
            _this.organisation = organisation;
        });
    }
    //TODO: styling van edit button
    //TODO: uitwerking edit methode
    OrganisationDetail.prototype.edit = function () {
        //this.router.navigate(["/EditOrganisation", {id: this.organisation._id}]);
        alert("Edit");
    };
    //TODO: styling van addGroup button
    OrganisationDetail.prototype.addGroup = function () {
        //this.router.navigate(["/CreateGroup", {organisationId: this.organisation._id}]);
        this.router.navigate(["/CreateGroup", { organisationId: "Albert Hein" }]);
    };
    OrganisationDetail.prototype.viewGroup = function (groupId) {
        //this.router.navigate(["/GroupDetail", {id: groupId}]);
        this.router.navigate(["/GroupDetail", { id: 0 }]);
    };
    //TODO: styling van addMember button
    //TODO: uitwerking addMember methode
    OrganisationDetail.prototype.addMember = function () {
        //this.router.navigate(["/CreateGroup", {organisationId: this.organisation._id}]);
        alert("addMember");
    };
    //TODO: uitwerking viewMember methode
    OrganisationDetail.prototype.viewMember = function (userId) {
        //this.router.navigate(["/UserDetail", {id: userId}]);
        alert("viewMember: " + userId);
    };
    OrganisationDetail = __decorate([
        core_1.Component({
            selector: 'organisation-detail',
            template: "\n    <div class=\"row container\" *ngIf=\"organisation != null\">\n        <div id=\"organisationHeader\">\n            <h5>{{organisation._name}}</h5>\n\n            <div id=\"organisationMenu\">\n                <a class=\"btn-floating waves-effect waves-light red\"(click)=\"edit()\" title=\"Bewerk organisatie\">\n                    <i class=\"material-icons\">mode_edit</i>\n                </a>\n            </div>\n        </div>\n\n        <div class=\"card\"><div class=\"card-content\">\n            <p># groepen: {{organisation._groupIds.length}}</p>\n            <p># leden: {{organisation._memberIds.length}}</p>\n        </div></div>\n\n\n        <div id=\"groupsHeader\">\n            <h5>Groepen</h5>\n\n            <div id=\"groupsMenu\">\n                <a class=\"btn-floating waves-effect waves-light red\"(click)=\"addGroup()\" title=\"Voeg groep toe\">\n                    <i class=\"material-icons\">add</i>\n                </a>\n            </div>\n        </div>\n\n        <div class=\"card\" [ngClass]=\"{tableCard: organisation._groupIds.length!=0}\"><div class=\"card-content\">\n            <table class=\"striped\" *ngIf=\"organisation._groupIds.length!=0\">\n                <thead>\n                    <tr>\n                        <th data-field=\"name\">Naam</th>\n                        <th data-field=\"amountOfMembers\"># leden</th>\n                        <th data-field=\"description\">Beschrijving</th>\n                    </tr>\n                </thead>\n\n                <tr *ngFor=\"#group of groups\" (click)=\"viewGroup(group._id)\" class=\"clickable\">\n                    <td>{{group._name}}</td>\n                    <td>{{group._memberIds.length}}</td>\n                    <td>{{group._description}}</td>\n                </tr>\n            </table>\n\n            <p *ngIf=\"organisation._groupIds.length==0\">{{organisation._name}} heeft momenteel nog geen groepen.</p>\n        </div></div>\n\n\n        <div id=\"membersHeader\">\n            <h5>Leden</h5>\n\n            <div id=\"membersMenu\">\n                <a class=\"btn-floating waves-effect waves-light red\"(click)=\"addMember()\" title=\"Voeg lid toe\">\n                    <i class=\"material-icons\">add</i>\n                </a>\n            </div>\n        </div>\n\n        <div class=\"card\" [ngClass]=\"{tableCard: organisation._memberIds.length!=0}\"><div class=\"card-content\">\n            <table class=\"striped\" *ngIf=\"organisation._memberIds.length!=0\">\n                <thead>\n                    <tr>\n                        <th data-field=\"name\">Naam</th>\n                        <th data-field=\"email\">E-mail adres</th>\n                    </tr>\n                </thead>\n\n                <tr *ngFor=\"#member of members\" (click)=\"viewMember(member._id)\" class=\"clickable\">\n                    <td>{{member._name}}</td>\n                    <td>{{member._email}}</td>\n                </tr>\n            </table>\n\n            <p *ngIf=\"organisation._memberIds.length==0\">{{organisation._name}} heeft momenteel nog geen leden.</p>\n        </div></div>\n    </div>\n\n    <div class=\"row container\" *ngIf=\"organisation == null\">\n        <div class=\"card\"><div class=\"card-content\">\n            <p>ONGELDIG ID</p>\n        </div></div>\n    </div>\n    ",
            directives: [common_1.NgClass, common_1.NgIf]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, organisationService_1.OrganisationService])
    ], OrganisationDetail);
    return OrganisationDetail;
})();
exports.OrganisationDetail = OrganisationDetail;
//# sourceMappingURL=organisationDetail.js.map