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
var groupService_1 = require("../../services/groupService");
var userService_1 = require("../../services/userService");
var group_1 = require("../../../backend/model/group");
var GroupForm = (function () {
    function GroupForm(router, routeParam, groupService, userService) {
        var _this = this;
        this.group = group_1.Group.empty();
        this.router = router;
        this.groupService = groupService;
        this.userService = userService;
        if (routeParam.params["organisationId"]) {
            this.group._organisationId = routeParam.params["organisationId"];
        }
        else {
            this.group._organisationId = "";
        }
        userService.getUserId(function (userId) {
            userService.getAllOrganisationsOfUserById(userId).subscribe(function (organisations) {
                _this.organisations = organisations;
            });
        });
    }
    GroupForm.prototype.OnSubmit = function () {
        var _this = this;
        this.userService.getUserId(function (userId) {
            _this.group._memberIds.push(userId);
            _this.groupService.createGroup(_this.group).subscribe(function (g) {
                _this.router.navigate(["/GroupDetail", { id: g._id }]);
            });
        });
    };
    GroupForm.prototype.ngAfterViewInit = function () {
        $('select').material_select();
    };
    GroupForm = __decorate([
        core_1.Component({
            selector: 'group-form',
            template: "\n    <div class=\"row container\">\n        <h5>Maak nieuwe groep aan</h5>\n\n        <div class=\"card formCard\"><div class=\"card-content\">\n            <form (submit)=\"OnSubmit()\" class=\"col s12\">\n                <div class=\"row\"><div class=\"input-field col s6\">\n                    <input [(ngModel)]=\"group._name\" id=\"name\" type=\"text\">\n                    <label for=\"name\">Naam</label>\n                </div></div>\n\n                <div class=\"row\"><div class=\"input-field col s12\">\n                    <textarea [(ngModel)]=\"group._description\" id=\"description\" class=\"materialize-textarea\"></textarea>\n                    <label for=\"description\">Beschrijving</label>\n                </div></div>\n\n                <div class=\"row\"><div class=\"input-field col s3\">\n                    <select class=\"browser-default\" [(ngModel)]=\"group._organisationId\" id=\"organisation\">\n                        <option value=\"\" disabled>Organisatie</option>\n                        <option *ngFor=\"#organisation of organisations\" value=\"{{organisation._id}}\">{{organisation._name}}</option>\n                    </select>\n\n                </div></div>\n\n                <button type=\"submit\" class=\"waves-effect waves-light btn red\"><i class=\"material-icons center\">add</i></button>\n            </form>\n        </div></div>\n    </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, groupService_1.GroupService, userService_1.UserService])
    ], GroupForm);
    return GroupForm;
})();
exports.GroupForm = GroupForm;
//# sourceMappingURL=groupForm.js.map