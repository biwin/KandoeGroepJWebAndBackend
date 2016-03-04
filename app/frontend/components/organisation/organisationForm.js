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
var common_1 = require("angular2/common");
var router_1 = require("angular2/router");
var organisationService_1 = require("../../services/organisationService");
var organisation_1 = require("../../../backend/model/organisation");
var userService_1 = require("../../services/userService");
var OrganisationForm = (function () {
    function OrganisationForm(router, organisationService, userService) {
        this.organisation = organisation_1.Organisation.empty();
        this.router = router;
        this.organisationService = organisationService;
        this.userService = userService;
    }
    OrganisationForm.prototype.OnSubmit = function () {
        var _this = this;
        this.userService.getUserId(function (userId) {
            _this.organisation._organisatorIds.push(userId);
            _this.organisationService.createOrganisation(_this.organisation).subscribe(function (o) {
                _this.router.navigate(["/OrganisationDetail", { id: o._id }]);
            });
        });
    };
    OrganisationForm = __decorate([
        core_1.Component({
            selector: 'organisation-form',
            template: "\n    <div class=\"row container\">\n        <h5>Maak nieuwe organisatie aan</h5>\n\n        <div class=\"card formCard\"><div class=\"card-content\">\n            <form (submit)=\"OnSubmit()\" class=\"col s12\">\n                <div class=\"row\"><div class=\"input-field col s6\">\n                    <input [(ngModel)]=\"organisation._name\" id=\"name\" type=\"text\">\n                    <label for=\"name\">Naam</label>\n                </div></div>\n\n                <button type=\"submit\" class=\"waves-effect waves-light btn red\"><i class=\"material-icons center\">add</i></button>\n            </form>\n        </div></div>\n    </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, organisationService_1.OrganisationService, userService_1.UserService])
    ], OrganisationForm);
    return OrganisationForm;
})();
exports.OrganisationForm = OrganisationForm;
//# sourceMappingURL=organisationForm.js.map