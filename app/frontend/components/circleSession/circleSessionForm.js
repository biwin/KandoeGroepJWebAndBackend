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
var common_2 = require("angular2/common");
var circleSession_1 = require("../../../backend/model/circleSession");
var router_1 = require("angular2/router");
var router_2 = require("angular2/router");
var themeService_1 = require("../../services/themeService");
var circleSessionService_1 = require("../../services/circleSessionService");
var organisationService_1 = require("../../services/organisationService");
var userService_1 = require("../../services/userService");
var tagInput_1 = require("../general/tagInput");
var CircleSessionForm = (function () {
    function CircleSessionForm(service, themeService, organisationService, userService, router, routeParam) {
        var _this = this;
        this.circleSession = circleSession_1.CircleSession.empty();
        this.emailadresses = [];
        this._groups = [];
        this._themes = [];
        this.service = service;
        this.router = router;
        userService.getUserId(function (u) {
            _this._currentUserId = u;
            var organisationId = routeParam.params["organisationId"];
            if (organisationId == null) {
                userService.getAllGroupsOfUser(_this._currentUserId).subscribe(function (grs) {
                    _this._groups = grs;
                });
            }
            else {
                organisationService.getGroupsOfOrganisationById(organisationId).subscribe(function (grs) {
                    _this._groups = grs;
                });
            }
        });
        themeService.getAll().subscribe(function (ts) {
            _this._themes = ts;
        });
    }
    CircleSessionForm.prototype.ngAfterViewInit = function () {
        $('select').material_select();
        $('.datepicker').pickadate({
            monthsFull: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
            today: 'Vandaag',
            clear: 'Leeg',
            close: 'Sluit',
            selectMonths: true,
            selectYears: 2,
            format: 'dd/mm/yyyy',
            min: Date.now()
        });
        $('#realtime').change(function () {
            $('#durationbox').toggleClass('hide');
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
        this.circleSession._startDate = $('#startDate').val() + ' ' + $('#time').val();
        console.log('going to post');
        this.service.create(this.circleSession, this.emailadresses).subscribe(function (c) {
            console.log('going to navigate');
            _this.router.navigate(['CircleSessionOverview']);
        });
    };
    CircleSessionForm = __decorate([
        core_1.Component({
            selector: 'circlesession-form',
            template: "\n    <div class=\"row container\">\n    <h5>Nieuw Spel</h5>\n\n    <div class=\"card formCard\"><div class=\"card-content\">\n        <form (submit)=\"OnSubmit()\" class=\"col s12\">\n      <div class=\"row\">\n        <div class=\"input-field col s3\">\n                    <select class=\"browser-default\" required [(ngModel)]=\"circleSession._groupId\" id=\"group\">\n                        <option value=\"\" disabled>Groep</option>\n                        <option *ngFor=\"#group of _groups\" value=\"{{group._id}}\">{{group._name}}</option>\n                    </select>\n        </div>\n       <div class=\"input-field col s3\">\n                    <select class=\"browser-default\" required [(ngModel)]=\"circleSession._themeId\" id=\"theme\">\n                        <option value=\"\" disabled>Thema</option>\n                        <option *ngFor=\"#theme of _themes\" value=\"{{theme._id}}\">{{theme._name}}</option>\n                    </select>\n        </div>\n      </div>\n\n      <div class=\"divider\"></div>\n\n    <div class=\"row margin-top\">\n    <div class=\"col s5\">\n        <input [(ngModel)]=\"circleSession._realTime\" type=\"checkbox\" id=\"realtime\" />\n        <label for=\"realtime\">Realtime</label>\n     </div>\n    </div>\n\n    <div class=\"row\" id=\"durationbox\">\n     <div class=\"input-field col s3\">\n          <input [(ngModel)]=\"circleSession._turnTimeMin\" id=\"duration\" type=\"number\" min=\"0\" class=\"validate\">\n          <label for=\"duration\">Beurt duur</label>\n     </div>\n    </div>\n\n    <div class=\"divider\"></div>\n\n    <div class=\"row\">\n    <div class=\"col input-field s3\">\n         <label for=\"startDate\">Start datum</label>\n         <input type=\"date\" required class=\"datepicker\" id=\"startDate\">\n    </div>\n     <div class=\"input-field col s3\">\n          <input id=\"time\" required type=\"text\" pattern=\"([0-1]?[0-9]|2[0-3]):[0-5][0-9]\" title=\"Gebruik een geldig 24h tijdformaat.\" class=\"validate\">\n          <label for=\"time\">Beginuur</label>\n     </div>\n    </div>\n\n          <div class=\"divider\"></div>\n\n    <h6>Optionele intellingen</h6>\n\n    <div class=\"row margin-top\">\n    <div class=\"col s5\">\n        <input type=\"checkbox\" checked id=\"endpoint\" />\n        <label for=\"endpoint\">Onbeperkt spel</label>\n     </div>\n    </div>\n\n    <div class=\"row hide\" id=\"turnbox\">\n     <div class=\"input-field col s3\">\n          <input [(ngModel)]=\"circleSession._endPoint\" id=\"duration\" type=\"number\" min=\"0\" class=\"validate\">\n          <label for=\"turns\">Aantal rondes</label>\n     </div>\n    </div>\n\n    <div class=\"row margin-top\">\n    <div class=\"col s5\">\n        <input [(ngModel)]=\"circleSession._allowComment\" type=\"checkbox\" id=\"allowcomment\"/>\n        <label for=\"allowcomment\">Spelers kunnen commentaar geven op kaarten</label>\n     </div>\n    </div>\n\n    <div class=\"row\">\n        <tags [title]=\"'Voeg extra spelers toe met hun e-mailadres (splits met een puntkomma)'\" [tagArray]=\"emailadresses\"></tags>\n    </div>\n\n      <button type=\"submit\" class=\"waves-effect waves-light btn red\"><i class=\"material-icons center\">add</i></button>\n    </form>\n    </div></div>\n  </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, common_2.FORM_DIRECTIVES, tagInput_1.TagInput]
        }), 
        __metadata('design:paramtypes', [circleSessionService_1.CircleSessionService, themeService_1.ThemeService, organisationService_1.OrganisationService, userService_1.UserService, router_1.Router, router_2.RouteParams])
    ], CircleSessionForm);
    return CircleSessionForm;
})();
exports.CircleSessionForm = CircleSessionForm;
//# sourceMappingURL=circleSessionForm.js.map