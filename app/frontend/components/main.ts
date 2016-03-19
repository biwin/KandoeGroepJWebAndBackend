import {bootstrap} from "angular2/platform/browser";
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {LocationStrategy, HashLocationStrategy, APP_BASE_HREF, ROUTER_PRIMARY_COMPONENT, ROUTER_PROVIDERS} from "angular2/router";

import {AppComponent} from './app.component';

import {CircleSessionService} from "../services/circleSessionService";
import {GroupService} from "../services/groupService";
import {HttpWrapperService} from "../services/httpWrapperService";
import {OrganisationService} from "../services/organisationService";
import {ThemeService} from "../services/themeService";
import {UserService} from "../services/userService";
import {SnapshotService} from "../services/snapshotService";
import {SocketService} from "../services/socketService";

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,

    CircleSessionService,
    GroupService,
    HttpWrapperService,
    OrganisationService,
    ThemeService,
    UserService,
    SnapshotService,
    SocketService,

    //provide('App.BackendPath', {useValue: 'http://localhost:8080/api/'}), //LOCAL TESTS
    //provide('App.BackendPath', {useValue: 'http://192.168.0.149:80/api/'}), //LOCAL TESTS (ANDROID)
    provide('App.BackendPath', {useValue: 'http://kandoe.be/api/'}), //PRODUCTION

    //provide('App.SocketUrl', {useValue: 'http://localhost:8080'}), //LOCAL TESTS
    provide('App.SocketUrl', {useValue: 'http://kandoe.be:8000/'}), //PRODUCTION

    provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
    provide(APP_BASE_HREF, {useValue: '/'}),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);