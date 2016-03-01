import {Component} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {Inject} from "angular2/core";
import {CircleSessionService} from "../../services/circleSessionService";
import {CircleSession} from "../../../backend/model/circleSession";
import {CircleSessionCard} from "./circleSessionCard";
import {RouteParams} from "angular2/router";
import {Card} from "../../../backend/model/card";
import {ThemeService} from "../../services/themeService";
import {CircleSessionCardDetail} from "./circleSessionCardDetail";

@Component({
    selector: 'circlesession-game',
    template: `
    <div class="container">
        <div class="row margin-top">
            <div class="col s12 kandoeCircle">
            </div>
        </div>
        <div class="row">
            <circlesession-card *ngFor="#card of cards" [card]="card"></circlesession-card>
        </div>
    </div>
    `,
    directives: [CORE_DIRECTIVES, CircleSessionCardDetail]
})

export class CircleSessionGame {
    private circleSession:CircleSession = CircleSession.empty();
    private cards:Card[] = [];
    private id:string;

    constructor(service:CircleSessionService,themeService:ThemeService ,route:RouteParams) {
        this.id = route.get('id');

        service.get(this.id).subscribe((circleSession:CircleSession) => {
            this.circleSession = circleSession;
            themeService.getCards(circleSession._themeId).subscribe((cs:Card[]) => {
                cs.forEach((c:Card) => this.cards.push(c));
            })
        });
    }
}
