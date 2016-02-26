import {Component} from 'angular2/core';
import {RouterOutlet, RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {NavigationBar} from './general/navigationBar';
import {Footer} from './general/footer';
import {ThemeOverview} from "./theme/themeOverview";
import {ThemeForm} from './theme/themeForm';
import {CircleSessionForm} from "./circleSession/circleSessionForm";
import {OrganisationsOverview} from "./organisation/organisationsOverview";
import {OrganisationForm} from "./organisation/organisationForm";
import {OrganisationDetail} from "./organisation/organisationDetail";

@Component({
    selector: 'my-app',
    template: `
    <navigation-bar></navigation-bar>
    <div class="content">
        <router-outlet></router-outlet>
    </div>
    <pagefooter></pagefooter>
    `,
    directives: [NavigationBar, Footer, ROUTER_DIRECTIVES, RouterOutlet]
})

@RouteConfig([
    {path: '/themes', as: 'ThemeOverview', component: ThemeOverview},
    {path: '/createTheme', as: 'CreateTheme', component: ThemeForm},
    {path: '/createSession', as: 'CreateSession', component: CircleSessionForm},
    {path: '/organisations', as: 'OrganisationsOverview', component: OrganisationsOverview},
    {path: '/createOrganisation', as: 'CreateOrganisation', component: OrganisationForm},
    {path: '/organisation/:id', as: 'OrganisationDetail', component: OrganisationDetail}
])

export class AppComponent { }