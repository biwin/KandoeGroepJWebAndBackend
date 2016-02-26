var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require("angular2/router");
var navigationBar_1 = require('./general/navigationBar');
var footer_1 = require('./general/footer');
var themeOverview_1 = require("./theme/themeOverview");
var themeForm_1 = require('./theme/themeForm');
var circleSessionForm_1 = require("./circleSession/circleSessionForm");
var organisationForm_1 = require("./organisation/organisationForm");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <navigation-bar></navigation-bar>\n    <div class=\"content\">\n        <router-outlet></router-outlet>\n    </div>\n    <pagefooter></pagefooter>\n    ",
            directives: [navigationBar_1.NavigationBar, footer_1.Footer, router_1.ROUTER_DIRECTIVES, router_1.RouterOutlet]
        }),
        router_1.RouteConfig([
            { path: '/themes', as: 'ThemeOverview', component: themeOverview_1.ThemeOverview },
            { path: '/createTheme', as: 'CreateTheme', component: themeForm_1.ThemeForm },
            { path: '/createSession', as: 'CreateSession', component: circleSessionForm_1.CircleSessionForm },
            { path: '/createOrganisation', as: 'CreateOrganisation', component: organisationForm_1.OrganisationForm }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map