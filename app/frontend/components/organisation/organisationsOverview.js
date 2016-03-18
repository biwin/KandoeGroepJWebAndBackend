///<reference path="../../../../typings/jquery/jquery.d.ts" />
///<reference path="../../../../typings/materialize-css/materialize-css.d.ts"/>
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
var router_1 = require("angular2/router");
var common_1 = require("angular2/common");
var loadingSpinner_1 = require("../general/loadingSpinner");
var organisationService_1 = require("../../services/organisationService");
var userService_1 = require("../../services/userService");
var organisation_1 = require("../../../backend/model/organisation");
var OrganisationsOverview = (function () {
    function OrganisationsOverview(router, organisationService, userService) {
        var _this = this;
        this.organisations = [];
        this.loading = true;
        this.organisationToDelete = organisation_1.Organisation.empty();
        this.isLastAdmin = false;
        this.doDelete = false;
        this.router = router;
        this.organisationService = organisationService;
        this.userService = userService;
        userService.getAllOrganisationsOfCurrentUser().subscribe(function (organisations) {
            _this.organisations = organisations;
            _this.loading = false;
        });
    }
    OrganisationsOverview.prototype.getAmountOfMembers = function (organisation) {
        return organisation._organisatorIds.length + organisation._memberIds.length;
    };
    OrganisationsOverview.prototype.isAdmin = function (organisation) {
        var userId = this.userService.getUserId();
        return organisation._organisatorIds.indexOf(userId) > -1;
    };
    //TODO: styling van add button
    OrganisationsOverview.prototype.addOrganisation = function () {
        this.router.navigate(["/CreateOrganisation"]);
    };
    OrganisationsOverview.prototype.viewOrganisation = function (organisationId) {
        this.router.navigate(["/OrganisationDetail", { id: organisationId }]);
    };
    OrganisationsOverview.prototype.deleteOrganisation = function (organisation) {
        var _this = this;
        var userId = this.userService.getUserId();
        this.organisationToDelete = organisation;
        this.isLastAdmin = this.organisationToDelete._organisatorIds.length == 1 && this.organisationToDelete._organisatorIds[0] == userId;
        if (this.isLastAdmin) {
            this.contentText = "U staat op het punt " + this.organisationToDelete._name + " volledig te verwijderen.\n" +
                "Bent u zeker dat u alle groepen, thema's en sessies van deze organisatie wil verwijderen?";
        }
        else {
            this.contentText = "U staat op het punt uzelf uit {{organisationToDelete._name}} te verwijderen.\n" +
                "Bent u zeker dat u zichzelf uit deze organisatie wil verwijderen?";
        }
        $('#deleteOrganisationModal').openModal({
            opacity: .75,
            complete: function () {
                _this.doDeleteOrganisation(userId);
            }
        });
    };
    OrganisationsOverview.prototype.doDeleteOrganisation = function (userId) {
        var _this = this;
        if (this.doDelete) {
            if (this.isLastAdmin) {
                this.organisationService.deleteOrganisationById(this.organisationToDelete._id).subscribe(function (deleted) {
                    if (deleted) {
                        _this.deleteOrganisationFromArray(_this.organisationToDelete._id);
                    }
                });
            }
            else {
                this.organisationService.deleteMemberFromOrganisationById(userId, this.organisationToDelete._id).subscribe(function (deleted) {
                    if (deleted) {
                        _this.deleteOrganisationFromArray(_this.organisationToDelete._id);
                    }
                });
            }
        }
    };
    OrganisationsOverview.prototype.deleteOrganisationFromArray = function (organisationId) {
        var index = this.organisations.findIndex(function (organisation) { return organisation._id == organisationId; });
        this.organisations.splice(index, 1);
    };
    OrganisationsOverview = __decorate([
        core_1.Component({
            selector: 'organisations-overview',
            template: "\n    <div class=\"row container\">\n        <div class=\"modal\" id=\"deleteOrganisationModal\">\n            <div class=\"modal-content\">\n                <h4 class=\"red-text\">{{organisationToDelete._name}} verwijderen?</h4>\n                <p>{{contentText}}</p>\n            </div>\n\n            <div class=\"modal-footer\">\n                <a class=\"modal-action modal-close waves-effect waves-red btn-flat red-text\" (click)=\"doDelete = false\">Nee, ga terug</a>\n                <a class=\"modal-action modal-close waves-effect waves-greens btn-flat green-text\" (click)=\"doDelete = true\">Ja, verwijder</a>\n            </div>\n        </div>\n\n        <div id=\"organisationsHeader\">\n            <h5>Mijn organisaties</h5>\n\n            <div id=\"organisationsMenu\">\n                <a class=\"btn-floating waves-effect waves-light red\" (click)=\"addOrganisation()\" title=\"Voeg organisatie toe\">\n                    <i class=\"material-icons\">add</i>\n                </a>\n            </div>\n        </div>\n\n        <loading *ngIf=\"loading\"></loading>\n\n        <div *ngIf=\"!loading\" class=\"card\" [ngClass]=\"{tableCard: organisations.length!=0}\"><div class=\"card-content\">\n            <table class=\"striped\" *ngIf=\"organisations.length!=0\">\n                <thead>\n                    <tr>\n                        <th style=\"width: 2%;\"></th>\n                        <th data-field=\"name\">Naam</th>\n                        <th data-field=\"amountOfMembers\"># leden</th>\n                        <th style=\"width: 2%;\" data-field=\"isAdmin\">Admin?</th>\n                    </tr>\n                </thead>\n\n                <tr *ngFor=\"#organisation of organisations\" class=\"clickable\">\n                    <td><i class=\"material-icons red-text\" (click)=\"deleteOrganisation(organisation)\"  title=\"Verwijder {{organisation._name}}\">{{isAdmin(organisation)?\"delete_forever\":\"delete\"}}</i></td>\n                    <td (click)=\"viewOrganisation(organisation._id)\">{{organisation._name}}</td>\n                    <td (click)=\"viewOrganisation(organisation._id)\">{{getAmountOfMembers(organisation)}}</td>\n                    <td (click)=\"viewOrganisation(organisation._id)\"><i *ngIf=\"isAdmin(organisation)\" class=\"material-icons green-text\">check</i></td>\n                </tr>\n            </table>\n\n            <p *ngIf=\"organisations.length==0\">Je bent momenteel nog geen lid van een organisatie.</p>\n        </div></div>\n    </div>\n    ",
            directives: [router_1.ROUTER_DIRECTIVES, common_1.NgClass, loadingSpinner_1.LoadingSpinner]
        }), 
        __metadata('design:paramtypes', [router_1.Router, organisationService_1.OrganisationService, userService_1.UserService])
    ], OrganisationsOverview);
    return OrganisationsOverview;
}());
exports.OrganisationsOverview = OrganisationsOverview;
//# sourceMappingURL=organisationsOverview.js.map