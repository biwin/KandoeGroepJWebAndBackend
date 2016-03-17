/// <reference path="../../../../typings/jquery/jquery.d.ts" />

import {Component, OnChanges, Input} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {Response} from "angular2/http";

import {UserService} from "../../services/userService";

import {User} from "../../../backend/model/user";
import {ChatComponent} from "../chat/chatComponent";

@Component({
    selector: 'user-list',
    template: `
    <div class="side-nav fixed right-aligned" id="user-sidenav">
        <ul id="user-list" class="collection with-header">
            <li class="users-heading collection-header valign-wrapper"><h4 class="valign center-block"><i class="material-icons">people</i> Spelers</h4></li>
            <li class="collection-item row valign-wrapper" *ngFor="#user of users" [class.blue]="user._id === myUserId" [class.lighten-5]="user._id === myUserId">
                <div class="col s4">
                    <img *ngIf="user._pictureSmall !== undefined" [attr.src]="user._pictureSmall" class="circle responsive-img valign">
                    <i *ngIf="user._pictureSmall === undefined" class="material-icons valign">person</i>
                </div>
                <div class="col s7">
                    {{user._name}}
                </div>
                <div class="col s1" *ngIf="user._id === currentPlayerId">
                    <i class="fa fa-gamepad green-text"></i>
                </div>
            </li>
        </ul>
        <chatbox [sessionId]="circleSessionId" [userId]="myUserId"></chatbox>
     </div>
  `,
    directives: [ROUTER_DIRECTIVES, ChatComponent]
})

export class CircleSessionUserList implements OnChanges {
    @Input("users") userIds:string[];
    @Input() currentPlayerId:string;
    @Input() circleSessionId:string;
    private users:User[] = [];
    private service:UserService;
    private myUserId:string;

    constructor(service:UserService) {
        this.service = service;
        this.myUserId = service.getUserId();
    }

    ngOnChanges() {
        if(this.userIds != undefined && this.userIds.length > 0 && this.users.length == 0) {
            this.service.getUsers(this.userIds).subscribe((us:User[]) => {
                us.forEach((u:User) => this.users.push(u));
            });
        }
    }
}