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
var groupService_1 = require("../../services/groupService");
var organisation_1 = require("../../../backend/model/organisation");
var GroupDetail = (function () {
    function GroupDetail(router, routeParam, groupService) {
        var _this = this;
        this.organisation = organisation_1.Organisation.empty();
        var groupId = routeParam.params["id"];
        this.router = router;
        groupService.getGroupById(groupId).subscribe(function (group) {
            _this.group = group;
            if (group._memberIds.length != 0) {
                groupService.getMembersOfGroupById(groupId).subscribe(function (members) {
                    _this.members = members;
                });
            }
            groupService.getOrganisationOfGroupById(groupId).subscribe(function (organisation) {
                _this.organisation = organisation;
            });
        });
    }
    GroupDetail.prototype.viewMember = function (userId) {
        //this.router.navigate(["/UserDetail", {id: userId}]);
        alert("viewMember: " + userId);
    };
    GroupDetail = __decorate([
        core_1.Component({
            selector: 'group-detail',
            template: "\n    <div class=\"row container\" *ngIf=\"group != null\">\n        <h5>{{group._name}} [{{organisation._name}}]</h5>\n\n        <div class=\"card\"><div class=\"card-content\">\n            # leden: {{group._memberIds.length}}\n        </div></div>\n\n\n        <h5>Leden</h5>\n\n        <div class=\"card\" [ngClass]=\"{tableCard: group._memberIds.length!=0}\"><div class=\"card-content\">\n            <table class=\"striped\" *ngIf=\"group._memberIds.length!=0\">\n                <thead>\n                    <tr>\n                        <th data-field=\"name\">Naam</th>\n                        <th data-field=\"email\">E-mail adres</th>\n                    </tr>\n                </thead>\n\n                <tr *ngFor=\"#member of members\" (click)=\"viewMember(member._id)\" class=\"clickable\">\n                    <td>{{member._name}}</td>\n                    <td>{{member._email}}</td>\n                </tr>\n            </table>\n\n            <p *ngIf=\"group._memberIds.length==0\">De groep \"{{group._name}}\" van organisatie \"{{organisation._name}}\" heeft momenteel nog geen leden.</p>\n        </div></div>\n    </div>\n\n    <div class=\"row container\" *ngIf=\"group == null\">\n        <div class=\"card\"><div class=\"card-content\">\n            <p>ONGELDIG ID</p>\n        </div></div>\n    </div>\n    ",
            directives: [common_1.NgClass]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, groupService_1.GroupService])
    ], GroupDetail);
    return GroupDetail;
}());
exports.GroupDetail = GroupDetail;
//# sourceMappingURL=groupDetail.js.map