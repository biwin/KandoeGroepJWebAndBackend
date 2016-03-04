import {bootstrap} from "angular2/platform/browser";
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {LocationStrategy, HashLocationStrategy, APP_BASE_HREF, ROUTER_PRIMARY_COMPONENT, ROUTER_PROVIDERS} from "angular2/router";

import {AppComponent} from './app.component';

import {CircleSessionService} from "../services/circleSessionService";
import {HttpWrapperService} from "../services/httpWrapperService";
import {OrganisationService} from "../services/organisationService";
import {ThemeService} from "../services/themeService";
import {UserService} from "../services/userService";

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,

    CircleSessionService,
    HttpWrapperService,
    OrganisationService,
    ThemeService,
    UserService,

    //provide('App.BackendPath', {useValue: 'http://localhost:8080/api/'}), //LOCAL TESTS
    provide('App.BackendPath', {useValue: 'http://kandoe.be/api/'}), //PRODUCTION
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
    provide(APP_BASE_HREF, {useValue: '/'}),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);