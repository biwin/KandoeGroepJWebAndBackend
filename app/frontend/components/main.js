var browser_1 = require("angular2/platform/browser");
var app_component_1 = require('./app.component');
var http_1 = require("angular2/http");
var core_1 = require("angular2/core");
var router_1 = require("angular2/router");
var themeService_1 = require("../services/themeService");
var circleSessionService_1 = require("../services/circleSessionService");
var userService_1 = require("../services/userService");
browser_1.bootstrap(app_component_1.AppComponent, [
    router_1.ROUTER_PROVIDERS,
    http_1.HTTP_PROVIDERS,
    themeService_1.ThemeService,
    userService_1.UserService,
    circleSessionService_1.CircleSessionService,
    core_1.provide('App.BackendPath', { useValue: 'http://localhost:8080/api/' }),
    core_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, { useValue: app_component_1.AppComponent }),
    core_1.provide(router_1.APP_BASE_HREF, { useValue: '/' }),
    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
]);
//# sourceMappingURL=main.js.map