import {Component} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {Inject} from "angular2/core";
import {CircleSessionService} from "../../services/circleSessionService";
import {CircleSession} from "../../../backend/model/circleSession";
import {CircleSessionCard} from "./circleSessionCard";
import {UserService} from "../../services/userService";

@Component({
    selector: 'circlesession-overview',
    template: `
    <div class="container">
     <div *ngIf="loading" class="row center margin-top">
                <div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-blue-only">
                      <div class="circle-clipper left">
                        <div class="circle"></div>
                      </div><div class="gap-patch">
                        <div class="circle"></div>
                      </div><div class="circle-clipper right">
                        <div class="circle"></div>
                      </div>
                    </div>
                </div>
            </div>
    <div class="row">
        <circlesession-card *ngFor="#circleSession of circleSessions" [circleSession]="circleSession">
    </circlesession-card></div>
    </div>
    `,
    directives: [CORE_DIRECTIVES, CircleSessionCard]
})

export class CircleSessionOverview {
    private circleSessions:CircleSession[] = [];
    private _currentUserId:string;
    private loading:boolean = false;


    constructor(service:CircleSessionService, userService:UserService) {
        userService.getUserId((u:string)=>{
           this._currentUserId = u;
            userService.getCircleSessionsOfUserById(this._currentUserId).subscribe((circleSessions:CircleSession[]) =>{
                this.circleSessions = circleSessions;
            });
        });
    }
}
