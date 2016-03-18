import {Component} from 'angular2/core';
import {RouterOutlet, RouteConfig, ROUTER_DIRECTIVES, Router} from "angular2/router";

import {NavigationBar} from './general/navigationBar';
import {HomePage} from "./general/homePage";

import {ThemeOverview} from "./theme/themeOverview";
import {ThemeForm} from './theme/themeForm';

import {CircleSessionGameWrapper} from "./circleSession/circleSessionGameWrapper";
import {CircleSessionOverview} from "./circleSession/circleSessionOverview";
import {CircleSessionForm} from "./circleSession/circleSessionForm";

import {OrganisationsOverview} from "./organisation/organisationsOverview";
import {OrganisationForm} from "./organisation/organisationForm";
import {OrganisationDetail} from "./organisation/organisationDetail";

import {GroupForm} from "./group/groupForm";
import {GroupDetail} from "./group/groupDetail";

import {UserLogin} from "./user/userLogin";
import {Profile} from "./user/profile";
import {UserService} from "../services/userService";

import {SnapshotDetail} from "./snapshot/snapshotDetail";

@Component({
    selector: 'my-app',
    template: `
    <navigation-bar></navigation-bar>
    <div class="content" [class.no-padding-left]="!service.isLoggedIn()">
        <router-outlet></router-outlet>
    </div>
    `,
    directives: [NavigationBar, ROUTER_DIRECTIVES, RouterOutlet]
})

@RouteConfig([
    {path: '/', as: 'Home', component: HomePage},

    {path: '/themes', as: 'ThemeOverview', component: ThemeOverview},
    {path: '/createTheme', as: 'CreateTheme', component: ThemeForm},

    {path: '/circlesessions', as: 'CircleSessionOverview', component: CircleSessionOverview},
    {path: '/createSession', as: 'CreateSession', component: CircleSessionForm},
    {path: '/circlesessions/:id', as: 'CircleSessionGame', component: CircleSessionGameWrapper},

    {path: '/organisations', as: 'OrganisationsOverview', component: OrganisationsOverview},
    {path: '/createOrganisation', as: 'CreateOrganisation', component: OrganisationForm},
    {path: '/organisation/:id', as: 'OrganisationDetail', component: OrganisationDetail},

    {path: '/createGroup', as: 'CreateGroup', component: GroupForm},
    {path: '/group/:id', as: 'GroupDetail', component: GroupDetail},

    {path: '/loginUser', as: 'UserLogin', component: UserLogin},
    {path: '/profile', as: 'Profile', component: Profile},
    
    {path: '/snapshots/:id', as: 'Snapshot', component: SnapshotDetail}
])

export class AppComponent {
    private service:UserService;

    constructor(private router: Router, userService: UserService) {
        this.service = userService;
        this.router.subscribe((url) => {
            if (!userService.isLoggedIn() && url != 'loginUser') {
                this.router.navigate(['UserLogin']);
            }
        });
    }
}