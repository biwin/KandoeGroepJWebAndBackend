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
var userService_1 = require("../../services/userService");
var OrganisationsOverview = (function () {
    function OrganisationsOverview(router, organisationService, userService) {
        var _this = this;
        this.organisations = [];
        this.router = router;
        this.organisationService = organisationService;
        this.userService = userService;
        userService.getAllOrganisationsOfCurrentUser().subscribe(function (organisations) {
            _this.organisations = organisations;
        });
    }
    OrganisationsOverview.prototype.addOrganisation = function () {
        this.router.navigate(["/CreateOrganisation"]);
    };
    OrganisationsOverview.prototype.viewOrganisation = function (organisationId) {
        this.router.navigate(["/OrganisationDetail", { id: organisationId }]);
    };
    //TODO: styling van delete button
    OrganisationsOverview.prototype.deleteOrganisation = function (organisation) {
        var _this = this;
        var userId = this.userService.getUserId();
        $('#modal1').openModal();
        if (organisation._organisatorIds.length == 1 && organisation._organisatorIds[0] == userId) {
            this.organisationService.deleteOrganisationById(organisation._id).subscribe(function (deleted) {
                if (deleted) {
                    _this.deleteOrganisationFromArray(organisation._id);
                }
            });
        }
        else {
            this.organisationService.deleteMemberFromOrganisationById(userId, organisation._id).subscribe(function (deleted) {
                if (deleted) {
                    _this.deleteOrganisationFromArray(organisation._id);
                }
            });
        }
    };
    OrganisationsOverview.prototype.deleteOrganisationFromArray = function (organisationId) {
        var index = this.organisations.findIndex(function (organisation) { return organisation._id = organisationId; });
        this.organisations.splice(index, 1);
    };
    OrganisationsOverview = __decorate([
        core_1.Component({
            selector: 'organisations-overview',
            template: "\n    <div class=\"row container\">\n        <div id=\"organisationsHeader\">\n            <h5>Mijn organisaties</h5>\n\n            <div id=\"organisationsMenu\">\n                <a class=\"btn-floating waves-effect waves-light red\" (click)=\"addOrganisation()\" title=\"Voeg organisatie toe\">\n                    <i class=\"material-icons\">add</i>\n                </a>\n            </div>\n        </div>\n\n        <div class=\"card\" [ngClass]=\"{tableCard: organisations.length!=0}\"><div class=\"card-content\">\n            <table class=\"striped\" *ngIf=\"organisations.length!=0\">\n                <thead>\n                    <tr>\n                        <th></th>\n                        <th data-field=\"name\">Naam</th>\n                        <th data-field=\"amountOfMembers\"># leden</th>\n                    </tr>\n                </thead>\n\n                <tr *ngFor=\"#organisation of organisations\" class=\"clickable\">\n                    <td><i class=\"material-icons red-text\" (click)=\"deleteOrganisation(organisation)\"  title=\"Verwijder {{organisation._name}}\">delete</i></td>\n                    <td (click)=\"viewOrganisation(organisation._id)\">{{organisation._name}}</td>\n                    <td (click)=\"viewOrganisation(organisation._id)\">{{organisation._memberIds.length}}</td>\n                </tr>\n            </table>\n\n            <p *ngIf=\"organisations.length==0\">Je bent momenteel nog geen lid van een organisatie.</p>\n        </div></div>\n    </div>\n    ",
            directives: [router_1.ROUTER_DIRECTIVES, common_1.NgClass]
        }), 
        __metadata('design:paramtypes', [router_1.Router, organisationService_1.OrganisationService, userService_1.UserService])
    ], OrganisationsOverview);
    return OrganisationsOverview;
})();
exports.OrganisationsOverview = OrganisationsOverview;
//# sourceMappingURL=organisationsOverview.js.map