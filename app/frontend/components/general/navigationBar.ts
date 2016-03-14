/// <reference path="../../../../typings/jquery/jquery.d.ts" />

import {Component, AfterViewInit} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {UserService} from "../../services/userService";
import {Response} from "angular2/http";

@Component({
    selector: 'navigation-bar',
    template: `
    <nav class="blue" role="navigation">
       <div class="nav-wrapper container">
        <a id="logo-container" [routerLink]="['Home']" class="brand-logo">KanDoe</a>
            <ul class="right">
                <li>
                    <a [routerLink]="service.isLoggedIn() ? ['Profile'] : ['UserLogin']">
                            <i *ngIf="imageSource == null || imageSource == ''" style="display: inline; vertical-align: middle;" class="material-icons">face</i>
                            <img *ngIf="imageSource != null && imageSource != ''" style="display: inline; vertical-align: middle; max-width: 50px; max-height: 50px;" src="{{imageSource}}"/>
                            <p style="display: inline;">{{usernameString}}</p>
                    </a>
                </li>
            </ul>
            <ul *ngIf="service.isLoggedIn()" id="slide-out" class="side-nav fixed">
                <li><a [routerLink]="['ThemeOverview']">Jouw thema's</a></li>
                <li><a [routerLink]="['CircleSessionOverview']">Jouw spellen</a></li>
                <li><a [routerLink]="['OrganisationsOverview']">Jouw organisaties</a></li>
            </ul>
            <a href="#" id="main-nav-toggle" data-activates="slide-out" class="button-collapse">
                <i class="material-icons">menu</i>
            </a>
       </div>
    </nav>
  `,
    directives: [ROUTER_DIRECTIVES]
})

export class NavigationBar implements AfterViewInit {
    private imageSource: string;
    private usernameString: string;

    constructor(private service: UserService) {
        service.subscribeMe(this);
        if (this.service.isLoggedIn()) {
            this.service.getUserPicture('small').subscribe((url: string) => this.imageSource = url);
            this.usernameString = this.service.getUsername();
        } else {
            this.usernameString = "Gast";
        }
    }

    notifyLoggedIn() {
        this.getUserName();
        this.service.getUserPicture('small').subscribe((url: string) => this.imageSource = url);
    }

    notifyLoggedOut() {
        this.imageSource = null;
        this.usernameString = "Gast";
    }

    notifyProfileUpdated() {
        this.usernameString = this.service.getUsername();
        this.service.getUserPicture('small').subscribe((url: string) => this.imageSource = url);
    }

    getUserName() {
        this.usernameString = this.service.getUsername();
    }

    ngAfterViewInit() {
        //FIXME: navbar doesn't seem to open on mobile
        $("#main-nav-toggle").sideNav({menuWidth: 240});
    }
}