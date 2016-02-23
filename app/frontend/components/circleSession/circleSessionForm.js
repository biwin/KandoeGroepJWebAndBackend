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
var CircleSessionForm = (function () {
    function CircleSessionForm() {
        this._groups = [new group_1.Group("", "Groep A", ""), new group_1.Group("", "Groep B", ""), new group_1.Group("", "Groep C", "")];
        this._themes = [new theme_1.Theme("Cafe's", "Cafes die we zouden kunnen bezoeken dit weekend", ["1"], ["love", "tits", "balls"]), new theme_1.Theme("scholen", "scholen voor onze zoon", ["1"], ["howest", "ikleef"]), new theme_1.Theme("De praat paal", "waarover gaan we nu weer praten?", ["1"])];
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
    };
    CircleSessionForm = __decorate([
        core_1.Component({
            selector: 'circlesession-form',
            template: "\n    <div class=\"row container\">\n    <h5>Nieuw Spel</h5>\n    <form (submit)=\"OnSubmit()\" class=\"col s12\">\n      <div class=\"row\">\n        <div class=\"input-field col s3\">\n            <select>\n              <option value=\"\" disabled selected>Groep</option>\n              <option *ngFor=\"#group of _groups\" value=\"{{group._name}}\">{{group._name}}</option>\n            </select>\n            <label>Groep</label>\n        </div>\n        <div class=\"input-field col s3\">\n            <select>\n              <option value=\"\" disabled selected>Thema</option>\n              <option *ngFor=\"#theme of _themes\" value=\"{{theme._name}}\">{{theme._name}}</option>\n            </select>\n            <label>Thema</label>\n        </div>\n\n      </div>\n    <div class=\"row\">\n    <div class=\"col s5\">\n      <div class=\"switch\">\n        <label>\n          Uitgesteld\n          <input type=\"checkbox\">\n          <span class=\"lever\"></span>\n          Realtime\n        </label>\n      </div>\n     </div>\n    </div>\n\n    <div class=\"row\">\n    <div class=\"col\">\n         <label>Start datum</label>\n         <input type=\"date\" class=\"datepicker\">\n    </div>\n     <div class=\"input-field col s6\">\n          <input id=\"time\" type=\"text\" class=\"validate\">\n          <label for=\"time\">Beginuur</label>\n     </div>\n    </div>\n\n\n      <button type=\"submit\" class=\"waves-effect waves-light btn red\"><i class=\"material-icons center\">add</i></button>\n    </form>\n  </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], CircleSessionForm);
    return CircleSessionForm;
})();
exports.CircleSessionForm = CircleSessionForm;
//# sourceMappingURL=circleSessionForm.js.map