import {Component} from 'angular2/core';
import {NavigationBar} from './general/navigationBar';
import {ThemeForm} from './theme/themeForm';
import {Footer} from './general/footer';
import {RouterOutlet, RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {ThemeOverview} from "./theme/themeOverview";

@Component({
    selector: 'my-app',
    template: `
    <navigation-bar></navigation-bar>
    <div class="content">
        <router-outlet></router-outlet>
    </div>
    <pagefooter></pagefooter>`,
    directives: [NavigationBar, Footer, ROUTER_DIRECTIVES, RouterOutlet]
})
@RouteConfig([
    {path: '/create', as: 'CreateTheme', component: ThemeForm},
    {path: '/themes', as: 'ThemeOverview', component: ThemeOverview}
])
export class AppComponent {
}