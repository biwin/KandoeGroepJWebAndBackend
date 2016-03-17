import {Component} from 'angular2/core';
import {RouterOutlet, RouteConfig, ROUTER_DIRECTIVES, Router} from "angular2/router";

import {NavigationBar} from './general/navigationBar';
import {HomePage} from "./general/homePage";

import {ThemeOverview} from "./theme/themeOverview";
import {ThemeForm} from './theme/themeForm';

import {CircleSessionOverview} from "./circleSession/circleSessionOverview";
import {CircleSessionForm} from "./circleSession/circleSessionForm";
import {CircleSessionGame} from "./circleSession/circleSessionGame";

import {OrganisationsOverview} from "./organisation/organisationsOverview";
import {OrganisationForm} from "./organisation/organisationForm";
import {OrganisationDetail} from "./organisation/organisationDetail";

import {GroupForm} from "./group/groupForm";
import {GroupDetail} from "./group/groupDetail";

import {UserLogin} from "./user/userLogin";
import {Profile} from "./user/profile";
import {UserService} from "../services/userService";

import {NgZone} from "angular2/core";
import {ChatComponent} from "./chat/chatComponent";

@Component({
    selector: 'my-app',
    template: `
    <navigation-bar></navigation-bar>
    <div class="content">
        <router-outlet></router-outlet>
    </div>
    `,
    directives: [NavigationBar, ROUTER_DIRECTIVES, RouterOutlet]
})

@RouteConfig([
    {path: '/hello', as: 'Home', component: HomePage},

    {path: '/themes', as: 'ThemeOverview', component: ThemeOverview},
    {path: '/createTheme', as: 'CreateTheme', component: ThemeForm},

    {path: '/circlesessions', as: 'CircleSessionOverview', component: CircleSessionOverview},
    {path: '/createSession', as: 'CreateSession', component: CircleSessionForm},
    {path: '/circlesessions/:id', as: 'CircleSessionGame', component: CircleSessionGame},

    {path: '/organisations', as: 'OrganisationsOverview', component: OrganisationsOverview},
    {path: '/createOrganisation', as: 'CreateOrganisation', component: OrganisationForm},
    {path: '/organisation/:id', as: 'OrganisationDetail', component: OrganisationDetail},

    {path: '/createGroup', as: 'CreateGroup', component: GroupForm},
    {path: '/group/:id', as: 'GroupDetail', component: GroupDetail},

    {path: '/loginUser', as: 'UserLogin', component: UserLogin},
    {path: '/profile', as: 'Profile', component: Profile},

    {path: '/chat', as: 'Chatbox', component: ChatComponent}
])

export class AppComponent {

    constructor(private router: Router, userService: UserService) {
        this.router.subscribe((url) => {
            if (!userService.isLoggedIn() && (url != 'hello' && url != 'loginUser')) {
                this.router.navigate(['Home']);
            }
        });
    }
}