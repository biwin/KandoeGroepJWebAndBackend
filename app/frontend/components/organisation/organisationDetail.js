///<reference path="../../../../typings/jquery/jquery.d.ts" />
///<reference path="../../../../typings/materialize-css/materialize-css.d.ts"/>
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
var group_1 = require("../../../backend/model/group");
var user_1 = require("../../../backend/model/user");
var theme_1 = require("../../../backend/model/theme");
var OrganisationDetail = (function () {
    function OrganisationDetail(router, routeParam, organisationService, userService) {
        var _this = this;
        this.organisation = organisation_1.Organisation.empty();
        this.themes = [];
        this.organisationLoading = true;
        this.groupsLoading = true;
        this.adminsLoading = true;
        this.membersLoading = true;
        this.themesLoading = true;
        this.doDeleteOrg = false;
        this.groupToDelete = group_1.Group.empty();
        this.doDeleteGrp = false;
        this.userToDelete = user_1.User.empty();
        this.isLastAdmin = false;
        this.doDeleteUsr = false;
        this.themeToDelete = theme_1.Theme.empty();
        this.doDeleteThm = false;
        var organisationId = routeParam.params["id"];
        this.router = router;
        this.organisationService = organisationService;
        this.userService = userService;
        organisationService.getOrganisationById(organisationId).subscribe(function (organisation) {
            _this.organisation = organisation;
            if (organisation._groupIds.length != 0) {
                organisationService.getGroupsOfOrganisationById(organisationId).subscribe(function (groups) {
                    _this.groups = groups;
                    _this.groupsLoading = false;
                });
            }
            if (organisation._organisatorIds.length != 0) {
                organisationService.getAdminsOfOrganisationById(organisationId).subscribe(function (admins) {
                    _this.admins = admins;
                    _this.adminsLoading = false;
                });
            }
            if (organisation._memberIds.length != 0) {
                organisationService.getMembersOfOrganisationById(organisationId).subscribe(function (members) {
                    _this.members = members;
                    _this.membersLoading = false;
                });
            }
            organisationService.getThemesOfOrganisationById(organisationId).subscribe(function (themes) {
                _this.themes = themes;
                _this.themesLoading = false;
            });
        });
        this.organisationLoading = false;
    }
    OrganisationDetail.prototype.isAdmin = function () {
        var userId = this.userService.getUserId();
        return this.organisation._organisatorIds.indexOf(userId) > -1;
    };
    OrganisationDetail.prototype.isCurrentUser = function (userId) {
        var currentUserId = this.userService.getUserId();
        return currentUserId == userId;
    };
    OrganisationDetail.prototype.delete = function () {
        var _this = this;
        $('#deleteOrganisationModal').openModal({
            opacity: .75,
            complete: function () {
                _this.doDeleteOrganisation();
            }
        });
    };
    OrganisationDetail.prototype.doDeleteOrganisation = function () {
        var _this = this;
        if (this.doDeleteOrg) {
            this.organisationService.deleteOrganisationById(this.organisation._id).subscribe(function () {
                _this.router.navigate(["/OrganisationsOverview"]);
            });
        }
    };
    //TODO: styling van addGroup button
    OrganisationDetail.prototype.addGroup = function () {
        this.router.navigate(["/CreateGroup", { organisationId: this.organisation._id }]);
    };
    OrganisationDetail.prototype.viewGroup = function (groupId) {
        this.router.navigate(["/GroupDetail", { id: groupId }]);
    };
    OrganisationDetail.prototype.deleteGroup = function (group) {
        var _this = this;
        this.groupToDelete = group;
        $('#deleteGroupModal').openModal({
            opacity: .75,
            complete: function () {
                _this.doDeleteGroup();
            }
        });
    };
    OrganisationDetail.prototype.doDeleteGroup = function () {
        var _this = this;
        if (this.doDeleteGrp) {
            this.organisationService.deleteGroupFromOrganisationById(this.groupToDelete._id, this.organisation._id).subscribe(function (deleted) {
                if (deleted) {
                    _this.deleteGroupFromArray(_this.groupToDelete._id);
                }
            });
        }
    };
    OrganisationDetail.prototype.deleteGroupFromArray = function (groupId) {
        var index = this.groups.findIndex(function (group) { return group._id == groupId; });
        this.groups.splice(index, 1);
    };
    //TODO: styling van addMember button
    //TODO: uitwerking addMember methode
    OrganisationDetail.prototype.addMember = function (isAdmin) {
        //this.router.navigate(["/CreateGroup", {organisationId: this.organisation._id}]);
        alert("addMember");
    };
    OrganisationDetail.prototype.deleteUser = function (user, isAdmin) {
        var _this = this;
        this.userToDelete = user;
        this.isLastAdmin = isAdmin && this.organisation._organisatorIds.length == 1;
        if (this.isLastAdmin) {
            this.contentText = "U staat op het punt " + this.organisation._name + " volledig te verwijderen.\n" +
                "Bent u zeker dat u alle groepen, thema's en sessies van deze organisatie wil verwijderen?";
        }
        else if (this.isCurrentUser(user._id)) {
            this.contentText = "U staat op het punt uzelf uit " + this.organisation._name + " te verwijderen.\n" +
                "Bent u zeker dat u zichzelf uit deze organisatie wil verwijderen?";
        }
        else {
            this.contentText = "U staat op het punt " + this.userToDelete._name + " uit " + this.organisation._name + " te verwijderen.\n" +
                "Bent u zeker dat u deze persoon wil verwijderen?";
        }
        $('#deleteUserModal').openModal({
            opacity: .75,
            complete: function () {
                _this.doDeleteUser();
            }
        });
    };
    OrganisationDetail.prototype.doDeleteUser = function () {
        var _this = this;
        if (this.doDeleteUsr && !this.isLastAdmin) {
            this.organisationService.deleteMemberFromOrganisationById(this.userToDelete._id, this.organisation._id).subscribe(function (deleted) {
                if (deleted) {
                    _this.deleteUserFromArray(_this.userToDelete._id);
                }
            });
        }
        else if (this.doDeleteUsr && this.isLastAdmin) {
            this.organisationService.deleteOrganisationById(this.organisation._id).subscribe(function () {
                _this.router.navigate(["/OrganisationsOverview"]);
            });
        }
    };
    OrganisationDetail.prototype.deleteUserFromArray = function (userId) {
        if (this.isAdmin()) {
            var index = this.admins.findIndex(function (user) { return user._id == userId; });
            this.admins.splice(index, 1);
        }
        else {
            var index = this.members.findIndex(function (user) { return user._id == userId; });
            this.members.splice(index, 1);
        }
    };
    //TODO: styling van addTheme button
    OrganisationDetail.prototype.addTheme = function () {
        this.router.navigate(["/CreateTheme", { organisationId: this.organisation._id }]);
    };
    OrganisationDetail.prototype.deleteTheme = function (theme) {
        var _this = this;
        this.themeToDelete = theme;
        $('#deleteThemeModal').openModal({
            opacity: .75,
            complete: function () {
                _this.doDeleteTheme();
            }
        });
    };
    OrganisationDetail.prototype.doDeleteTheme = function () {
        var _this = this;
        if (this.doDeleteThm) {
            this.organisationService.deleteThemeFromOrganisationById(this.themeToDelete._id, this.organisation._id).subscribe(function (deleted) {
                if (deleted) {
                    _this.deleteThemeFromArray(_this.themeToDelete._id);
                }
            });
        }
    };
    OrganisationDetail.prototype.deleteThemeFromArray = function (themeId) {
        var index = this.themes.findIndex(function (theme) { return theme._id == themeId; });
        this.themes.splice(index, 1);
    };
    OrganisationDetail = __decorate([
        core_1.Component({
            selector: 'organisation-detail',
            template: "\n    <div class=\"modal\" id=\"deleteOrganisationModal\">\n        <div class=\"modal-content\">\n            <h4 class=\"red-text\">{{organisation._name}} verwijderen?</h4>\n            <p>U staat op het punt {{organisation._name}} volledig te verwijderen.<br />\n                Bent u zeker dat u alle groepen, thema's en sessies van deze organisatie wil verwijderen?</p>\n        </div>\n\n        <div class=\"modal-footer\">\n            <a class=\"modal-action modal-close waves-effect waves-red btn-flat red-text\" (click)=\"doDeleteOrg = false\">Nee, ga terug</a>\n            <a class=\"modal-action modal-close waves-effect waves-greens btn-flat green-text\" (click)=\"doDeleteOrg = true\">Ja, verwijder</a>\n        </div>\n    </div>\n    <div class=\"modal\" id=\"deleteGroupModal\">\n        <div class=\"modal-content\">\n            <h4 class=\"red-text\">{{groupToDelete._name}} verwijderen?</h4>\n            <p>U staat op het punt {{groupToDelete._name}} volledig te verwijderen.<br />\n                Bent u zeker dat u deze groep wil verwijderen uit {{organisation._name}}?\"</p>\n        </div>\n\n        <div class=\"modal-footer\">\n            <a class=\"modal-action modal-close waves-effect waves-red btn-flat red-text\" (click)=\"doDeleteGrp = false\">Nee, ga terug</a>\n            <a class=\"modal-action modal-close waves-effect waves-greens btn-flat green-text\" (click)=\"doDeleteGrp = true\">Ja, verwijder</a>\n        </div>\n    </div>\n    <div class=\"modal\" id=\"deleteUserModal\">\n        <div class=\"modal-content\">\n            <h4 class=\"red-text\">{{userToDelete._name}} verwijderen?</h4>\n            <p>{{contentText}}</p>\n        </div>\n\n        <div class=\"modal-footer\">\n            <a class=\"modal-action modal-close waves-effect waves-red btn-flat red-text\" (click)=\"doDeleteUsr = false\">Nee, ga terug</a>\n            <a class=\"modal-action modal-close waves-effect waves-greens btn-flat green-text\" (click)=\"doDeleteUsr = true\">Ja, verwijder</a>\n        </div>\n    </div>\n    <div class=\"modal\" id=\"deleteThemeModal\">\n        <div class=\"modal-content\">\n            <h4 class=\"red-text\">{{themeToDelete._name}} verwijderen?</h4>\n            <p>U staat op het punt {{themeToDelete._name}} uit {{organisation._name}} te verwijderen.<br />\n                Bent u zeker dat u dit thema uit deze  organisatie wil verwijderen?\"</p>\n        </div>\n\n        <div class=\"modal-footer\">\n            <a class=\"modal-action modal-close waves-effect waves-red btn-flat red-text\" (click)=\"doDeleteThm = false\">Nee, ga terug</a>\n            <a class=\"modal-action modal-close waves-effect waves-greens btn-flat green-text\" (click)=\"doDeleteThm = true\">Ja, verwijder</a>\n        </div>\n    </div>\n\n    <loading *ngIf=\"organisationLoading\"></loading>\n    \n    <div class=\"row container\" *ngIf=\"!organisationLoading && organisation!=null\">\n        <div id=\"organisationHeader\">\n            <h5>{{organisation._name}}</h5>\n\n            <div id=\"organisationMenu\">\n                <a *ngIf=\"isAdmin()\" class=\"btn-floating waves-effect waves-light red\" (click)=\"delete()\" title=\"Verwijder {{organisation._name}}\">\n                    <i class=\"material-icons\">delete_forever</i>\n                </a>\n            </div>\n        </div>\n        <div class=\"card\"><div class=\"card-content\">\n            <p># groepen: {{organisation._groupIds.length}}</p>\n            <p># admins: {{organisation._organisatorIds.length}}</p>\n            <p># leden: {{organisation._memberIds.length}}</p>\n            <p># thema's: {{themes.length}}</p>\n        </div></div>\n\n\n        <div id=\"groupsHeader\">\n            <h5>Groepen</h5>\n\n            <div id=\"groupsMenu\">\n                <a class=\"btn-floating waves-effect waves-light red\" (click)=\"addGroup()\" title=\"Voeg groep toe\">\n                    <i class=\"material-icons\">add</i>\n                </a>\n            </div>\n        </div>\n        <loading *ngIf=\"groupsLoading\"></loading>\n        <div class=\"card\" *ngIf=\"!groupsLoading\" [ngClass]=\"{tableCard: organisation._groupIds.length!=0}\"><div class=\"card-content\">\n            <table class=\"striped\" *ngIf=\"organisation._groupIds.length!=0\">\n                <thead>\n                    <tr>\n                        <th style=\"width: 2%;\"></th>\n                        <th data-field=\"name\">Naam</th>\n                        <th data-field=\"amountOfMembers\"># leden</th>\n                        <th data-field=\"description\">Beschrijving</th>\n                    </tr>\n                </thead>\n\n                <tr *ngFor=\"#group of groups\" class=\"clickable\">\n                    <td><i *ngIf=\"isAdmin()\" (click)=\"deleteGroup(group)\" class=\"material-icons red-text\" title=\"Verwijder {{group._name}}\">delete_forever</i></td>\n                    <td (click)=\"viewGroup(group._id)\">{{group._name}}</td>\n                    <td (click)=\"viewGroup(group._id)\">{{group._memberIds.length}}</td>\n                    <td (click)=\"viewGroup(group._id)\">{{group._description}}</td>\n                </tr>\n            </table>\n\n            <p *ngIf=\"organisation._groupIds.length==0\">{{organisation._name}} heeft momenteel nog geen groepen.</p>\n        </div></div>\n\n\n        <div id=\"adminsHeader\">\n            <h5>Admins</h5>\n\n            <div id=\"adminsMenu\">\n                <a class=\"btn-floating waves-effect waves-light red\" (click)=\"addMember(true)\" title=\"Voeg admin toe\">\n                    <i class=\"material-icons\">add</i>\n                </a>\n            </div>\n        </div>\n        <loading *ngIf=\"adminsLoading\"></loading>\n        <div class=\"card\" *ngIf=\"!adminsLoading\" [ngClass]=\"{tableCard: organisation._organisatorIds.length!=0}\"><div class=\"card-content\">\n            <table class=\"striped\" *ngIf=\"organisation._organisatorIds.length!=0\">\n                <thead>\n                    <tr>\n                        <th style=\"width: 2%;\"></th>\n                        <th data-field=\"name\">Naam</th>\n                        <th data-field=\"email\">E-mail adres</th>\n                    </tr>\n                </thead>\n\n                <tr *ngFor=\"#admin of admins\" class=\"clickable\">\n                    <td><i *ngIf=\"isCurrentUser(admin._id)\" (click)=\"deleteUser(admin, true)\" class=\"material-icons red-text\" title=\"Verwijder {{admin._name}}\">delete_forever</i></td>\n                    <td>{{admin._name}}</td>\n                    <td>{{admin._email}}</td>\n                </tr>\n            </table>\n\n            <p *ngIf=\"organisation._organisatorIds.length==0\">{{organisation._name}} heeft momenteel nog geen admins.</p>\n        </div></div>\n\n\n        <div id=\"membersHeader\">\n            <h5>Leden</h5>\n\n            <div id=\"membersMenu\">\n                <a class=\"btn-floating waves-effect waves-light red\" (click)=\"addMember(false)\" title=\"Voeg lid toe\">\n                    <i class=\"material-icons\">add</i>\n                </a>\n            </div>\n        </div>\n        <loading *ngIf=\"membersLoading\"></loading>\n        <div class=\"card\" *ngIf=\"!membersLoading\" [ngClass]=\"{tableCard: organisation._memberIds.length!=0}\"><div class=\"card-content\">\n            <table class=\"striped\" *ngIf=\"organisation._memberIds.length!=0\">\n                <thead>\n                    <tr>\n                        <th style=\"width: 2%;\"></th>\n                        <th data-field=\"name\">Naam</th>\n                        <th data-field=\"email\">E-mail adres</th>\n                    </tr>\n                </thead>\n\n                <tr *ngFor=\"#member of members\" class=\"clickable\">\n                    <td><i *ngIf=\"isAdmin() || isCurrentUser(member._id)\" (click)=\"deleteUser(member, false)\" class=\"material-icons red-text\" title=\"Verwijder {{member._name}}\">delete_forever</i></td>\n                    <td>{{member._name}}</td>\n                    <td>{{member._email}}</td>\n                </tr>\n            </table>\n\n            <p *ngIf=\"organisation._memberIds.length==0\">{{organisation._name}} heeft momenteel nog geen leden.</p>\n        </div></div>\n\n\n        <div id=\"themesHeader\">\n            <h5>Thema's</h5>\n\n            <div id=\"themesMenu\">\n                <a class=\"btn-floating waves-effect waves-light red\" (click)=\"addTheme()\" title=\"Voeg thema toe\">\n                    <i class=\"material-icons\">add</i>\n                </a>\n            </div>\n        </div>\n        <loading *ngIf=\"themesLoading\"></loading>\n        <div class=\"card\" *ngIf=\"!themesLoading\" [ngClass]=\"{tableCard: themes.length!=0}\"><div class=\"card-content\">\n            <table class=\"striped\" *ngIf=\"themes.length!=0\">\n                <thead>\n                    <tr>\n                        <th style=\"width: 2%;\"></th>\n                        <th data-field=\"name\">Naam</th>\n                        <th data-field=\"description\">Beschrijving</th>\n                    </tr>\n                </thead>\n\n                <tr *ngFor=\"#theme of themes\" class=\"clickable\">\n                    <td><i *ngIf=\"isAdmin()\" (click)=\"deleteTheme(theme)\" class=\"material-icons red-text\" title=\"Verwijder {{theme._name}}\">delete_forever</i></td>\n                    <td>{{theme._name}}</td>\n                    <td>{{theme._description}}</td>\n                </tr>\n            </table>\n\n            <p *ngIf=\"themes.length==0\">{{organisation._name}} heeft momenteel nog geen thema's.</p>\n        </div></div>\n    </div>\n\n    <div class=\"row container\" *ngIf=\"!organisationLoading && organisation==null\">\n        <div class=\"card\"><div class=\"card-content\">\n            <p>ONGELDIG ID</p>\n        </div></div>\n    </div>\n    ",
            directives: [common_1.NgClass, loadingSpinner_1.LoadingSpinner]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, organisationService_1.OrganisationService, userService_1.UserService])
    ], OrganisationDetail);
    return OrganisationDetail;
})();
exports.OrganisationDetail = OrganisationDetail;
//# sourceMappingURL=organisationDetail.js.map