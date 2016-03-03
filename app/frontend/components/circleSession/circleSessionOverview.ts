import {Component} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {Inject} from "angular2/core";
import {CircleSessionService} from "../../services/circleSessionService";
import {CircleSession} from "../../../backend/model/circleSession";
import {CircleSessionCard} from "./circleSessionCard";

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
    private loading:boolean = true;


    constructor(service:CircleSessionService) {
        service.getAll().subscribe((circleSessions:CircleSession[]) => {
            circleSessions.forEach((c:CircleSession, index:number) => {
                this.circleSessions.push(c);
                //TODO: fix loading
                if(index == circleSessions.length - 1)
                    this.loading = false;
            });
        });
        //console.log(this.circleSessions);
    }
}
