import {Component} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {CircleSession} from "../../../../backend/model/circleSession";
import {CircleSessionPreGame} from "./circleSessionPreGame";
import {CircleSessionGame} from "./circleSessionGame";
import {CircleSessionUserList} from "./circleSessionUserList";
import {CircleSessionService} from "../../../services/circleSessionService";
import {RouteParams} from "angular2/router";
import {LoadingSpinner} from "../../general/loadingSpinner";

@Component({
    selector: 'gamewrapper',
    template: `
        <div class="padding-right-users">       
            <loading *ngIf="loading"></loading>
            
            <div class="row" *ngIf="!loading">
                <h3 class="center-align">{{circleSession._name}}</h3>
            </div>
        
            <div class="row" *ngIf="!loading && !circleSession._inProgress">
                <h5>Deze sessie is nog niet actief...</h5>
            </div>
            
            <pregame *ngIf="!loading && circleSession._isPreGame && circleSession._inProgress" [circleSession]="circleSession"></pregame>
            <circlesession-game *ngIf="!loading && circleSession._inProgress && !circleSession._isPreGame" [circleSession]="circleSession"></circlesession-game>
            
            <user-list *ngIf="!loading" [currentPlayerId]="circleSession._currentPlayerId" [users]="circleSession._userIds" [circleSessionId]="circleSession._id"></user-list>
        </div>
    `,
    directives: [CORE_DIRECTIVES, CircleSessionPreGame, CircleSessionGame, CircleSessionUserList, LoadingSpinner]
})
export class CircleSessionGameWrapper {
    private loading:boolean = true;
    private circleSession:CircleSession = CircleSession.empty();
    private service:CircleSessionService;

    constructor(csService:CircleSessionService, routeParams:RouteParams) {
        var sessionId:string = routeParams.get('id');
        this.service = csService;

        this.service.get(sessionId).subscribe((cs:CircleSession) => {
            this.circleSession = cs;
            this.loading = false;
        });
    }
}