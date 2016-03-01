/// <reference path="../../../../typings/jquery/jquery.d.ts" />

import {Component, AfterViewInit} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {UserService} from "../../services/userService";

@Component({
    selector: 'navigation-bar',
    template: `
    <nav class="blue" role="navigation">
       <div class="nav-wrapper container">
        <a id="logo-container" href="#!" class="brand-logo">KanDoe</a>
            <ul class="right">
                <li><a [routerLink]="['UserLogin']"><i class="material-icons">face</i></a></li>
            </ul>
            <ul *ngIf="service.isLoggedIn()" id="slide-out" class="side-nav fixed">
                <li><a [routerLink]="['ThemeOverview']">Thema overzicht</a></li>
                <li><a [routerLink]="['CreateTheme']">Nieuw thema</a></li>
                <li><a [routerLink]="['CreateSession']">Nieuwe sessie</a></li>
                <li><a [routerLink]="['CircleSessionOverview']">Sessie overzicht</a></li>
                <li><a [routerLink]="['OrganisationsOverview']">Mijn organisaties</a></li>
                <li><a [routerLink]="['CreateOrganisation']">Nieuwe organisatie</a></li>
            </ul>
            <a href="#" data-activates="slide-out" class="button-collapse"><i class="mdi-navigation-menu"></i></a>
       </div>
    </nav>

    <div></div>
  `,
    directives: [ROUTER_DIRECTIVES]
})

export class NavigationBar implements AfterViewInit {

    constructor(private service: UserService) {

    }

    ngAfterViewInit() {
        $(".button-collapse").sideNav({
            menuWidth: 240
        });
    }
}