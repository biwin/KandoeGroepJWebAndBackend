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
var themeCard_1 = require("./themeCard");
var themeService_1 = require("../../services/themeService");
var loadingSpinner_1 = require("../general/loadingSpinner");
var ThemeOverview = (function () {
    function ThemeOverview(service) {
        var _this = this;
        this.loading = true;
        this.themes = [];
        this.doDelete = false;
        this.service = service;
        service.getAll().subscribe(function (themes) {
            themes.forEach(function (t) { return _this.themes.push(t); });
            _this.loading = false;
        });
    }
    ThemeOverview.prototype.deleteTheme = function (id) {
        var _this = this;
        $('#mDelTheme').openModal({
            opacity: .75,
            complete: function () {
                if (_this.doDelete) {
                    _this.service.deleteTheme(id).subscribe(function (b) {
                        if (b) {
                            _this.removeThemeFromArray(id);
                            Materialize.toast('Thema verwijderd.', 3000, 'rounded');
                        }
                        else {
                            Materialize.toast('Verwijderen mislukt.', 3000, 'rounded');
                        }
                        _this.doDelete = false;
                    }, function () {
                        Materialize.toast('Verwijderen mislukt.', 3000, 'rounded');
                        console.warn('Delete theme failed, theme not found');
                    });
                }
            }
        });
    };
    ThemeOverview.prototype.removeThemeFromArray = function (id) {
        var i = this.themes.findIndex(function (t) { return t._id == id; });
        this.themes.splice(i, 1);
    };
    ThemeOverview = __decorate([
        core_1.Component({
            selector: 'theme-overview',
            template: "\n        <div class=\"container\">\n            <div class=\"modal\" id=\"mDelTheme\">\n                <div class=\"modal-content\">\n                    <h4>Thema verwijderen?</h4>\n                    <p>Bent u zeker dat u dit thema en alle bijhorende kaarten wilt verwijderen?</p>\n                </div>\n                <div class=\"modal-footer\">\n                    <a class=\"modal-action modal-close waves-effect waves-green btn-flat\" (click)=\"doDelete = false\">Nee, ga terug</a>\n                    <a class=\"modal-action modal-close waves-effect waves-red btn-flat\" (click)=\"doDelete = true\">Ja, verwijder</a>\n                </div>\n            </div>\n\n            <h5>Mijn thema's</h5>\n            <div>\n                <a [routerLink]=\"['CreateTheme']\" class=\"btn-floating waves-effect waves-light red\" title=\"Cre\u00EBer thema\">\n                    <i class=\"material-icons\">add</i>\n                </a>\n            </div>\n\n            <loading *ngIf=\"loading\"></loading>\n\n             <p *ngIf=\"!loading && themes.length==0\">Je hebt nog geen thema's.</p>\n\n            <div class=\"row\">\n                <theme-card *ngFor=\"#theme of themes\" [theme]=\"theme\" (onDelete)=\"deleteTheme($event)\">\n                </theme-card>\n            </div>\n        </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES, themeCard_1.ThemeCard, loadingSpinner_1.LoadingSpinner]
        }), 
        __metadata('design:paramtypes', [themeService_1.ThemeService])
    ], ThemeOverview);
    return ThemeOverview;
})();
exports.ThemeOverview = ThemeOverview;
//# sourceMappingURL=themeOverview.js.map