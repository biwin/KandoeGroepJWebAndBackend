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
var homePage_1 = require("./general/homePage");
var themeOverview_1 = require("./theme/themeOverview");
var themeForm_1 = require('./theme/themeForm');
var circleSessionOverview_1 = require("./circleSession/circleSessionOverview");
var circleSessionForm_1 = require("./circleSession/circleSessionForm");
var circleSessionGame_1 = require("./circleSession/circleSessionGame");
var organisationsOverview_1 = require("./organisation/organisationsOverview");
var organisationForm_1 = require("./organisation/organisationForm");
var organisationDetail_1 = require("./organisation/organisationDetail");
var groupForm_1 = require("./group/groupForm");
var groupDetail_1 = require("./group/groupDetail");
var userLogin_1 = require("./user/userLogin");
var profile_1 = require("./user/profile");
var userService_1 = require("../services/userService");
var AppComponent = (function () {
    function AppComponent(router, userService) {
        var _this = this;
        this.router = router;
        this.router.subscribe(function (url) {
            if (!userService.isLoggedIn() && (url != 'hello' && url != 'loginUser')) {
                _this.router.navigate(['Hello']);
            }
        });
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <navigation-bar></navigation-bar>\n    <div class=\"content\">\n        <router-outlet></router-outlet>\n    </div>\n    <pagefooter></pagefooter>\n    ",
            directives: [navigationBar_1.NavigationBar, footer_1.Footer, router_1.ROUTER_DIRECTIVES, router_1.RouterOutlet]
        }),
        router_1.RouteConfig([
            { path: '/hello', as: 'Home', component: homePage_1.HomePage },
            { path: '/themes', as: 'ThemeOverview', component: themeOverview_1.ThemeOverview },
            { path: '/createTheme', as: 'CreateTheme', component: themeForm_1.ThemeForm },
            { path: '/circlesessions', as: 'CircleSessionOverview', component: circleSessionOverview_1.CircleSessionOverview },
            { path: '/createSession', as: 'CreateSession', component: circleSessionForm_1.CircleSessionForm },
            { path: '/circlesessions/:id', as: 'CircleSessionGame', component: circleSessionGame_1.CircleSessionGame },
            { path: '/organisations', as: 'OrganisationsOverview', component: organisationsOverview_1.OrganisationsOverview },
            { path: '/createOrganisation', as: 'CreateOrganisation', component: organisationForm_1.OrganisationForm },
            { path: '/organisation/:id', as: 'OrganisationDetail', component: organisationDetail_1.OrganisationDetail },
            { path: '/createGroup', as: 'CreateGroup', component: groupForm_1.GroupForm },
            { path: '/group/:id', as: 'GroupDetail', component: groupDetail_1.GroupDetail },
            { path: '/loginUser', as: 'UserLogin', component: userLogin_1.UserLogin },
            { path: '/profile', as: 'Profile', component: profile_1.Profile }
        ]), 
        __metadata('design:paramtypes', [router_1.Router, userService_1.UserService])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map