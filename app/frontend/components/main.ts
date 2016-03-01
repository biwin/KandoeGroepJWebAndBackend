import {bootstrap} from "angular2/platform/browser";
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from "angular2/http";
import {provide} from "angular2/core";
import {LocationStrategy, HashLocationStrategy, APP_BASE_HREF, ROUTER_PRIMARY_COMPONENT, ROUTER_PROVIDERS} from "angular2/router";
import {ThemeService} from "../services/themeService";
import {CircleSessionService} from "../services/circleSessionService";
import {UserService} from "../services/userService";
import {HttpWrapperService} from "../services/httpWrapperService";

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    ThemeService,
    UserService,
    HttpWrapperService,
    CircleSessionService,
    provide('App.BackendPath', {useValue: 'http://localhost:8080/api/'}),
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
    provide(APP_BASE_HREF, {useValue: '/'}),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);