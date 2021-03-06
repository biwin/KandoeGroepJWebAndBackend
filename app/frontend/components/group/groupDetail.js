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
var groupService_1 = require("../../services/groupService");
var userService_1 = require("../../services/userService");
var group_1 = require("../../../backend/model/group");
var user_1 = require("../../../backend/model/user");
var organisation_1 = require("../../../backend/model/organisation");
var GroupDetail = (function () {
    function GroupDetail(router, routeParam, groupService, userService) {
        var _this = this;
        this.group = group_1.Group.empty();
        this.members = [];
        this.organisation = organisation_1.Organisation.empty();
        this.groupLoading = true;
        this.membersLoading = true;
        this.memberToDelete = user_1.User.empty();
        this.newUserEmail = "";
        this.isLastAdmin = false;
        this.doDeleteMmbr = false;
        this.doDeleteGrp = false;
        this.doAddMembr = false;
        var groupId = routeParam.params["id"];
        this.router = router;
        this.groupService = groupService;
        this.userService = userService;
        groupService.getGroupById(groupId).subscribe(function (group) {
            _this.group = group;
            _this.loadMembers();
            groupService.getOrganisationOfGroupById(groupId).subscribe(function (organisation) {
                _this.organisation = organisation;
            });
            _this.groupLoading = false;
        });
    }
    GroupDetail.prototype.loadMembers = function () {
        var _this = this;
        if (this.group._memberIds.length != 0) {
            this.groupService.getMembersOfGroupById(this.group._id).subscribe(function (members) {
                _this.members = members;
                _this.membersLoading = false;
            });
        }
        else {
            this.membersLoading = false;
        }
    };
    GroupDetail.prototype.isAdmin = function () {
        var userId = this.userService.getUserId();
        return this.organisation._organisatorIds.indexOf(userId) > -1;
    };
    GroupDetail.prototype.isCurrentUser = function (userId) {
        var currentUserId = this.userService.getUserId();
        return currentUserId == userId;
    };
    GroupDetail.prototype.delete = function () {
        var _this = this;
        $('#deleteGroupModal').openModal({
            opacity: .75,
            complete: function () {
                _this.doDeleteGroup();
            }
        });
    };
    GroupDetail.prototype.doDeleteGroup = function () {
        var _this = this;
        if (this.doDeleteGrp) {
            this.groupService.deleteGroupById(this.group._id).subscribe(function () {
                _this.router.navigate(["/OrganisationDetails", { id: _this.group._organisationId }]);
            });
        }
    };
    GroupDetail.prototype.addMember = function () {
        var _this = this;
        $('#addMemberModal').openModal({
            opacity: .75,
            complete: function () {
                _this.doAddMember();
            }
        });
    };
    GroupDetail.prototype.doAddMember = function () {
        var _this = this;
        if (this.doAddMembr) {
            this.groupService.addMemberByEmailToGroupById(this.newUserEmail, this.group._id).subscribe(function (userId) {
                if (userId != null) {
                    Materialize.toast("Lid toegevoegd.", 3000, 'rounded');
                    _this.doAddMembr = false;
                    _this.addMemberToArray(userId);
                }
                else {
                    Materialize.toast("Lid toevoegen mislukt.", 3000, 'rounded');
                    _this.doAddMembr = false;
                }
            }, function (err) {
                Materialize.toast("Lid toevoegen mislukt.", 3000, 'rounded');
                _this.doAddMembr = false;
            });
        }
    };
    GroupDetail.prototype.addMemberToArray = function (userId) {
        this.group._memberIds.push(userId);
        this.membersLoading = true;
        this.loadMembers();
    };
    GroupDetail.prototype.deleteMember = function (user, isAdmin) {
        var _this = this;
        this.memberToDelete = user;
        this.isLastAdmin = isAdmin && this.organisation._organisatorIds.length == 1;
        if (this.isLastAdmin) {
            this.contentText = "U staat op het punt " + this.group._name + " volledig te verwijderen.\n" +
                "Bent u zeker dat u deze groep wil verwijderen?";
        }
        else if (this.isCurrentUser(user._id)) {
            this.contentText = "U staat op het punt uzelf uit " + this.group._name + " te verwijderen.\n" +
                "Bent u zeker dat u zichzelf uit deze groep wil verwijderen?";
        }
        else {
            this.contentText = "U staat op het punt " + this.memberToDelete._name + " uit " + this.group._name + " te verwijderen.\n" +
                "Bent u zeker dat u deze persoon wil verwijderen?";
        }
        $('#deleteMemberModal').openModal({
            opacity: .75,
            complete: function () {
                _this.doDeleteMember();
            }
        });
    };
    GroupDetail.prototype.doDeleteMember = function () {
        var _this = this;
        if (this.doDeleteMmbr && !this.isLastAdmin) {
            this.groupService.deleteMemberFromGroupById(this.memberToDelete._id, this.group._id).subscribe(function (deleted) {
                if (deleted) {
                    _this.deleteMemberFromArray(_this.memberToDelete._id);
                }
            });
        }
        else if (this.doDeleteMmbr && this.isLastAdmin) {
            this.groupService.deleteGroupById(this.group._id).subscribe(function () {
                _this.router.navigate(["/OrganisationsOverview"]);
            });
        }
    };
    GroupDetail.prototype.deleteMemberFromArray = function (userId) {
        if (this.isAdmin()) {
            var index = this.admins.findIndex(function (user) { return user._id == userId; });
            this.admins.splice(index, 1);
        }
        else {
            var index = this.members.findIndex(function (user) { return user._id == userId; });
            this.members.splice(index, 1);
        }
    };
    GroupDetail = __decorate([
        core_1.Component({
            selector: 'group-detail',
            template: "\n    <div class=\"modal\" id=\"addUserModal\">\n        <div class=\"modal-content\">\n            <h4>{{headerText}} toevoegen?</h4>\n            \n            <div class=\"input-field col s12\">\n                <input id=\"email\" type=\"email\" class=\"validate\" [(ngModel)]=\"newUserEmail\">\n                <label for=\"email\">Email</label>\n            </div>\n        </div>\n        \n        <div class=\"modal-footer\">\n            <a class=\"modal-action modal-close waves-effect waves-red btn-flat red-text\" (click)=\"doAddMembr = false\">Annuleren</a>\n            <a class=\"modal-action modal-close waves-effect waves-green btn-flat green-text\" (click)=\"doAddMembr = true\">Toevoegen</a>\n        </div>\n    </div>\n    <div class=\"modal\" id=\"deleteMemberModal\">\n        <div class=\"modal-content\">\n            <h4 class=\"red-text\">{{memberToDelete._name}} verwijderen?</h4>\n            <p>{{contentText}}</p>\n        </div>\n\n        <div class=\"modal-footer\">\n            <a class=\"modal-action modal-close waves-effect waves-red btn-flat red-text\" (click)=\"doDeleteMmbr = false\">Nee, ga terug</a>\n            <a class=\"modal-action modal-close waves-effect waves-greens btn-flat green-text\" (click)=\"doDeleteMmbr = true\">Ja, verwijder</a>\n        </div>\n    </div>\n    <div class=\"modal\" id=\"deleteGroupModal\">\n        <div class=\"modal-content\">\n            <h4 class=\"red-text\">{{group._name}} verwijderen?</h4>\n            <p>U staat op het punt {{group._name}} volledig te verwijderen.<br />\n                Bent u zeker dat u deze groep wil verwijderen?</p>\n        </div>\n\n        <div class=\"modal-footer\">\n            <a class=\"modal-action modal-close waves-effect waves-red btn-flat red-text\" (click)=\"doDeleteGrp = false\">Nee, ga terug</a>\n            <a class=\"modal-action modal-close waves-effect waves-green btn-flat green-text\" (click)=\"doDeleteGrp = true\">Ja, verwijder</a>\n        </div>\n    </div>\n    \n    <loading *ngIf=\"groupLoading\"></loading>\n    \n    <div class=\"row container\" *ngIf=\"!groupLoading && group!=null\">\n        <div id=\"organisationHeader\">\n            <h5>{{group._name}}</h5>\n\n            <div id=\"organisationMenu\">\n                <a *ngIf=\"isAdmin()\" class=\"btn-floating waves-effect waves-light red\" (click)=\"delete()\" title=\"Verwijder {{organisation._name}}\">\n                    <i class=\"material-icons\">delete_forever</i>\n                </a>\n            </div>\n        </div>\n\n        <div class=\"card\"><div class=\"card-content\">\n            # leden: {{group._memberIds.length}}\n        </div></div>\n\n\n        <div id=\"membersHeader\">\n            <h5>Leden</h5>\n\n            <div id=\"membersMenu\">\n                <a *ngIf=\"isAdmin()\" class=\"btn-floating waves-effect waves-light red\" (click)=\"addMember()\" title=\"Voeg lid toe\">\n                    <i class=\"material-icons\">add</i>\n                </a>\n            </div>\n        </div>\n        <loading *ngIf=\"groupLoading\"></loading>\n        <div *ngIf=\"!groupLoading\" class=\"card\" [ngClass]=\"{tableCard: group._memberIds.length!=0}\"><div class=\"card-content\">\n            <table class=\"striped\" *ngIf=\"group._memberIds.length!=0\">\n                <thead>\n                    <tr>\n                        <th style=\"width: 2%;\"></th>\n                        <th data-field=\"name\">Naam</th>\n                        <th data-field=\"email\">E-mail adres</th>\n                    </tr>\n                </thead>\n\n                <tr *ngFor=\"#member of members\">\n                    <td><i *ngIf=\"isAdmin() || isCurrentUser(member._id)\" (click)=\"deleteMember(member)\" class=\"material-icons red-text clickable\" title=\"Verwijder {{member._name}}\">delete_forever</i></td>\n                    <td>{{member._name}}</td>\n                    <td>{{member._email}}</td>\n                </tr>\n            </table>\n\n            <p *ngIf=\"group._memberIds.length==0\">De groep \"{{group._name}}\" van organisatie \"{{organisation._name}}\" heeft momenteel nog geen leden.</p>\n        </div></div>\n    </div>\n\n    <div class=\"row container\" *ngIf=\"!groupLoading && group==null\">\n        <div class=\"card\"><div class=\"card-content\">\n            <p>ONGELDIG ID</p>\n        </div></div>\n    </div>\n    ",
            directives: [common_1.NgClass, loadingSpinner_1.LoadingSpinner]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, groupService_1.GroupService, userService_1.UserService])
    ], GroupDetail);
    return GroupDetail;
}());
exports.GroupDetail = GroupDetail;
//# sourceMappingURL=groupDetail.js.map