import {Component} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {Inject} from "angular2/core";
import {CircleSessionService} from "../../services/circleSessionService";
import {CircleSession} from "../../../backend/model/circleSession";
import {CircleSessionCard} from "./circleSessionCard";

@Component({
    selector: 'circlesession-overview',
    template: `
    <div class="row container">
        <circlesession-card *ngFor="#circleSession of circleSessions" [circleSession]="circleSession">
    </circlesession-card></div>
    `,
    directives: [CORE_DIRECTIVES, CircleSessionCard]
})

export class CircleSessionOverview {
    private circleSessions:CircleSession[] = [];


    constructor(service:CircleSessionService) {
        service.getAll().subscribe((circleSessions:CircleSession[]) => {
            circleSessions.forEach((c:CircleSession) => this.circleSessions.push(c));
        })
        console.log(this.circleSessions);
    }
}
