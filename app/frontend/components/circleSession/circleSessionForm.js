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
var group_1 = require("../../../backend/model/group");
var theme_1 = require("../../../backend/model/theme");
var circleSession_1 = require("../../../backend/model/circleSession");
var common_1 = require("angular2/common");
var common_2 = require("angular2/common");
var circleSessionService_1 = require("../../services/circleSessionService");
var router_1 = require("angular2/router");
var CircleSessionForm = (function () {
    function CircleSessionForm(service, router) {
        //TODO: bind the complete form
        this.circleSession = circleSession_1.CircleSession.empty();
        this._groups = [
            new group_1.Group("Groep A", "", "", [""]),
            new group_1.Group("Groep B", "", "", [""]),
            new group_1.Group("Groep C", "", "", [""])
        ];
        this._themes = [
            new theme_1.Theme("Cafe's", "Cafes die we zouden kunnen bezoeken dit weekend", ["1"], ["love", "tits", "balls"]),
            new theme_1.Theme("scholen", "scholen voor onze zoon", ["1"], ["howest", "ikleef"]),
            new theme_1.Theme("De praat paal", "waarover gaan we nu weer praten?", ["1"])
        ];
        this.service = service;
        this.router = router;
    }
    CircleSessionForm.prototype.ngAfterViewInit = function () {
        $('select').material_select();
        $('.datepicker').pickadate({
            monthsFull: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
            today: 'Vandaag',
            clear: 'Leeg',
            close: 'Sluit',
            selectMonths: true,
            selectYears: 2
        });
        $('#realtime').change(function () {
            $('#durationbox').toggleClass('hide');
        });
    };
    CircleSessionForm.prototype.OnSubmit = function () {
        this.circleSession._creatorId = "CURRENT_USER_ID";
        this.service.create(this.circleSession).subscribe(function (c) {
            console.log(c + " created");
        });
    };
    CircleSessionForm = __decorate([
        core_1.Component({
            selector: 'circlesession-form',
            template: "\n    <div class=\"row container\">\n    <h5>Nieuw Spel</h5>\n\n    <div class=\"card formCard\"><div class=\"card-content\">\n        <form (submit)=\"OnSubmit()\" class=\"col s12\">\n      <div class=\"row\">\n        <div class=\"input-field col s3\">\n            <select>\n              <option value=\"\" disabled selected>Groep</option>\n              <option *ngFor=\"#group of _groups\" value=\"{{group._id}}\">{{group._name}}</option>\n            </select>\n            <label>Groep</label>\n        </div>\n        <div class=\"input-field col s3\">\n            <select>\n              <option value=\"\" disabled selected>Thema</option>\n              <option *ngFor=\"#theme of _themes\" value=\"{{theme._id}}\">{{theme._name}}</option>\n            </select>\n            <label>Thema</label>\n        </div>\n\n      </div>\n\n      <div class=\"divider\"></div>\n\n    <div class=\"row margin-top\">\n    <div class=\"col s5\">\n        <input type=\"checkbox\" id=\"realtime\" />\n        <label for=\"realtime\">Realtime</label>\n     </div>\n    </div>\n\n    <div class=\"row\" id=\"durationbox\">\n     <div class=\"input-field col s3\">\n          <input [(ngModel)]=\"circleSession._turnTimeMin\" id=\"duration\" type=\"number\" min=\"0\" class=\"validate\">\n          <label for=\"duration\">Beurt duur</label>\n     </div>\n    </div>\n\n    <div class=\"divider\"></div>\n\n    <div class=\"row\">\n    <div class=\"col input-field s3\">\n         <label for=\"startDate\">Start datum</label>\n         <input [(ngModel)]=\"circleSession._startDate\" type=\"date\" class=\"datepicker\" id=\"startDate\">\n    </div>\n     <div class=\"input-field col s3\">\n          <input id=\"time\" type=\"text\" class=\"validate\">\n          <label for=\"time\">Beginuur</label>\n     </div>\n    </div>\n\n      <button type=\"submit\" class=\"waves-effect waves-light btn red\"><i class=\"material-icons center\">add</i></button>\n    </form>\n    </div></div>\n  </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, common_2.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [circleSessionService_1.CircleSessionService, router_1.Router])
    ], CircleSessionForm);
    return CircleSessionForm;
})();
exports.CircleSessionForm = CircleSessionForm;
//# sourceMappingURL=circleSessionForm.js.map