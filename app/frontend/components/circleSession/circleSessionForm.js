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
var userService_1 = require("../../services/userService");
var themeService_1 = require("../../services/themeService");
var circleSessionService_1 = require("../../services/circleSessionService");
var organisationService_1 = require("../../services/organisationService");
var tagInput_1 = require("../general/tagInput");
var circleSession_1 = require("../../../backend/model/circleSession");
var loadingSpinner_1 = require("../general/loadingSpinner");
var CircleSessionForm = (function () {
    function CircleSessionForm(service, themeService, organisationService, userService, router, routeParam) {
        var _this = this;
        this.circleSession = circleSession_1.CircleSession.empty();
        this.emailadresses = [];
        this.groupsLoading = true;
        this.themesLoading = true;
        this._groups = [];
        this._themes = [];
        this.service = service;
        this.router = router;
        this._currentUserId = userService.getUserId();
        var organisationId = routeParam.params["organisationId"];
        if (organisationId == null) {
            userService.getAllGroupsOfUser(this._currentUserId).subscribe(function (grs) {
                _this._groups = grs;
                _this.groupsLoading = false;
            });
        }
        else {
            organisationService.getGroupsOfOrganisationById(organisationId).subscribe(function (grs) {
                _this._groups = grs;
                _this.groupsLoading = false;
            });
        }
        themeService.getAll().subscribe(function (ts) {
            _this._themes = ts;
            _this.themesLoading = false;
        });
    }
    CircleSessionForm.prototype.ngAfterViewInit = function () {
        $('select').material_select();
        $('.datepicker').pickadate({
            monthsFull: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
            weekdaysFull: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
            weekdaysShort: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
            today: 'Vandaag',
            clear: 'Leeg',
            close: 'Ok',
            closeOnSelect: true,
            selectMonths: true,
            selectYears: 2,
            format: 'yyyy-mm-dd',
            min: Date.now()
        });
        $('#endpoint').change(function () {
            $('#turnbox').toggleClass('hide');
        });
    };
    CircleSessionForm.prototype.OnSubmit = function () {
        var _this = this;
        this.circleSession._creatorId = this._currentUserId;
        if (this.circleSession._realTime)
            this.circleSession._turnTimeMin = null;
        var dateString = $('#startDate').val() + ' ' + $('#time').val();
        //make sure the client's timezone is included in the date
        this.circleSession._startDate = new Date(Date.parse(dateString)).toUTCString();
        console.log(this.circleSession._startDate);
        this.service.create(this.circleSession, this.emailadresses).subscribe(function (c) {
            _this.router.navigate(['CircleSessionOverview']);
        });
    };
    CircleSessionForm = __decorate([
        core_1.Component({
            selector: 'circlesession-form',
            template: "\n    <div class=\"row container\">\n    <h5>Nieuw Spel</h5>\n\n    <div class=\"card formCard\">\n\n    <loading *ngIf=\"themesLoading || groupsLoading\"></loading>\n    <div [hidden]=\"!themesLoading && !groupsLoading\" class=\"card-content\">\n        <form (submit)=\"OnSubmit()\" class=\"col s12\">\n      <div class=\"row\">\n        <div class=\"input-field col s3\">\n                    <select class=\"browser-default\" required [(ngModel)]=\"circleSession._groupId\" id=\"group\">\n                        <option value=\"\" disabled>Groep</option>\n                        <option *ngFor=\"#group of _groups\" value=\"{{group._id}}\">{{group._name}}</option>\n                    </select>\n        </div>\n       <div class=\"input-field col s3\">\n                    <select class=\"browser-default\" required [(ngModel)]=\"circleSession._themeId\" id=\"theme\">\n                        <option value=\"\" disabled>Thema</option>\n                        <option *ngFor=\"#theme of _themes\" value=\"{{theme._id}}\">{{theme._name}}</option>\n                    </select>\n        </div>\n      </div>\n\n    <div class=\"divider\"></div>\n\n    <div class=\"row\">\n    <div class=\"col input-field s3\">\n         <label for=\"startDate\">Start datum</label>\n         <input type=\"date\" required class=\"datepicker\" id=\"startDate\">\n    </div>\n     <div class=\"input-field col s3\">\n          <input id=\"time\" required placeholder=\"Beginuur\" type=\"time\" title=\"Gebruik een geldig 24h tijdformaat.\" class=\"validate active\">\n     </div>\n    </div>\n\n          <div class=\"divider\"></div>\n\n    <h6>Optionele intellingen</h6>\n\n    <div class=\"row margin-top\">\n    <div class=\"col s5\">\n        <input type=\"checkbox\" checked id=\"endpoint\" />\n        <label for=\"endpoint\">Onbeperkt spel</label>\n     </div>\n    </div>\n\n    <div class=\"row hide\" id=\"turnbox\">\n     <div class=\"input-field col s3\">\n          <input [(ngModel)]=\"circleSession._endPoint\" id=\"duration\" type=\"number\" min=\"0\" class=\"validate\">\n          <label for=\"turns\">Aantal rondes</label>\n     </div>\n    </div>\n\n    <div class=\"row\">\n        <tags [title]=\"'Voeg extra spelers toe met hun e-mailadres (splits met een puntkomma)'\" [tagArray]=\"emailadresses\"></tags>\n    </div>\n\n      <button type=\"submit\" class=\"waves-effect waves-light btn red\"><i class=\"material-icons center\">add</i></button>\n    </form>\n    </div></div>\n  </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, tagInput_1.TagInput, loadingSpinner_1.LoadingSpinner]
        }), 
        __metadata('design:paramtypes', [circleSessionService_1.CircleSessionService, themeService_1.ThemeService, organisationService_1.OrganisationService, userService_1.UserService, router_1.Router, router_1.RouteParams])
    ], CircleSessionForm);
    return CircleSessionForm;
})();
exports.CircleSessionForm = CircleSessionForm;
//# sourceMappingURL=circleSessionForm.js.map