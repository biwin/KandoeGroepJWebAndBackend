/// <reference path="../../../../typings/jquery/jquery.d.ts" />

import {Component, OnChanges} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {UserService} from "../../services/userService";
import {Response} from "angular2/http";
import {Input} from "angular2/core";
import {User} from "../../../backend/model/user";
import {AfterViewInit} from "angular2/core";
import {OnInit} from "angular2/core";

@Component({
    selector: 'user-list',
    template: `
        <ul id="user-list" class="collection with-header side-nav fixed right-aligned user-sidenav">
            <li class="users-heading collection-header valign-wrapper"><h4 class="valign center-block"><i class="material-icons">people</i> Spelers</h4></li>
            <li class="collection-item row valign-wrapper" *ngFor="#user of users">
                <div class="col s4">
                    <img [attr.src]="user._pictureSmall" class="circle responsive-img valign">
                </div>
                <div class="col s8">
                    {{user._name}}
                </div>


            </li>
        </ul>
  `,
    directives: [ROUTER_DIRECTIVES]
})

export class CircleSessionUserList implements OnChanges {
    @Input("users") userIds:string[];
    private users:User[] = [];
    private service:UserService;

    constructor(service:UserService) {
        this.service = service;
    }

    ngOnChanges() {
        if(this.userIds != undefined && this.userIds.length > 0) {
            this.service.getUsers(this.userIds).subscribe((us:User[]) => {
                us.forEach((u:User) => this.users.push(u));
                console.log("get users");
            });
        }
    }
}