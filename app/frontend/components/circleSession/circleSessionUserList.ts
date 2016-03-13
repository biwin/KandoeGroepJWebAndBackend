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
            <li class="collection-item row valign-wrapper" *ngFor="#user of users" [class.blue]="user._id === currentPlayerId" [class.lighten-5]="user._id === currentPlayerId">
                <div class="col s4">
                   <img *ngIf="user._pictureSmall !== undefined && user._pictureSmall.length > 0" [attr.src]="user._pictureSmall" class="circle responsive-img valign">
                   <i *ngIf="user._pictureSmall === undefined || user._pictureSmall.length == 0" class="material-icons valign">person</i>
                </div>
                <div class="col s7">
                    {{user._name}}
                </div>
                <div class="col s1" *ngIf="user._id === currentPlayerId">
                    <i class="material-icons green-text">gamepad</i>
                </div>
            </li>
        </ul>
  `,
    directives: [ROUTER_DIRECTIVES]
})

export class CircleSessionUserList implements OnChanges {
    @Input("users") userIds:string[];
    @Input() currentPlayerId:string;
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