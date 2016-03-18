"use strict";
var browser_1 = require("angular2/platform/browser");
var core_1 = require("angular2/core");
var http_1 = require("angular2/http");
var router_1 = require("angular2/router");
var app_component_1 = require('./app.component');
var circleSessionService_1 = require("../services/circleSessionService");
var groupService_1 = require("../services/groupService");
var httpWrapperService_1 = require("../services/httpWrapperService");
var organisationService_1 = require("../services/organisationService");
var themeService_1 = require("../services/themeService");
var userService_1 = require("../services/userService");
browser_1.bootstrap(app_component_1.AppComponent, [
    router_1.ROUTER_PROVIDERS,
    http_1.HTTP_PROVIDERS,
    circleSessionService_1.CircleSessionService,
    groupService_1.GroupService,
    httpWrapperService_1.HttpWrapperService,
    organisationService_1.OrganisationService,
    themeService_1.ThemeService,
    userService_1.UserService,
    core_1.provide('App.BackendPath', { useValue: 'http://localhost:8080/api/' }),
    //provide('App.BackendPath', {useValue: 'http://192.168.0.149:80/api/'}), //LOCAL TESTS (ANDROID)
    //provide('App.BackendPath', {useValue: 'http://kandoe.be/api/'}), //PRODUCTION
    core_1.provide('App.SocketUrl', { useValue: 'http://localhost:8080' }),
    //provide('App.SocketUrl', {useValue: 'http://kandoe.be:8000/'}), //PRODUCTION
    core_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, { useValue: app_component_1.AppComponent }),
    core_1.provide(router_1.APP_BASE_HREF, { useValue: '/' }),
    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
]);
//# sourceMappingURL=main.js.map