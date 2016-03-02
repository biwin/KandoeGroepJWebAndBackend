import {Component, Inject} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {CircleSessionService} from "../../services/circleSessionService";
import {CircleSession} from "../../../backend/model/circleSession";
import {CircleSessionCard} from "./circleSessionCard";
import {RouteParams} from "angular2/router";
import {Card} from "../../../backend/model/card";
import {ThemeService} from "../../services/themeService";
import {CircleSessionCardDetail} from "./circleSessionCardDetail";
import {CircleSessionConstants} from "./../../logic/circleSessionConstants";
import {CardPosition} from "../../../backend/model/cardPosition";

@Component({
    selector: 'circlesession-game',
    template: `
    <div class="container">
        <div class="row margin-top">
            <div class="col s8 offset-s2">
                <svg [attr.viewBox]="constants.VIEWBOX">
                    <!-- Draw Kandoe board circles -->
                    <circle *ngFor="#filled of constants.RINGS; #i = index"
                            [attr.r]="constants.CircleRadius(i+1)"
                            [attr.stroke-width]="constants.RING_WIDTH"
                            [attr.cy]="constants.CENTER" [attr.cx]="constants.CENTER"
                            id="circle-{{i+1}}" class="kandoeRing" [class.inner]="filled"/>


                    <!-- circle voorbeelden vervangen door cardposition -->
                    <circle *ngFor="#bol of pst; #i = index"
                            [id]="bol._cardId"
                            [attr.r]="35" [attr.fill]="hoveredCardId === bol._cardId ? constants.HOVERED_COLOR : constants.CardColor(i)" [attr.cy]="constants.YPOS_CIRCLE(bol._position, (1 / pst.length) * i)"
                            [attr.cx]="constants.XPOS_CIRCLE(bol._position, (1 / pst.length) * i)" stroke-width="2" [attr.stroke]="constants.CARD_STROKE_COLOR"/>
                </svg>
            </div>
        </div>

        <div class="row">
            <circlesession-card *ngFor="#card of cards; #i = index" [card]="card" [color]="constants.CardColor(i)" (hover)="hover(card._id, $event)"></circlesession-card>
        </div>
    </div>
    `,
    directives: [CORE_DIRECTIVES, CircleSessionCardDetail]
})

export class CircleSessionGame {
    private constants:CircleSessionConstants = new CircleSessionConstants();
    private circleSession:CircleSession = CircleSession.empty();
    private cards:Card[] = [];
    private pst:CardPosition[] = [];
    private id:string;
    private hoveredCardId:string = "";

    constructor(service:CircleSessionService,themeService:ThemeService ,route:RouteParams) {
        this.id = route.get('id');

        service.get(this.id).subscribe((circleSession:CircleSession) => {
            this.circleSession = circleSession;
            themeService.getCards(circleSession._themeId).subscribe((cs:Card[]) => {
                cs.forEach((c:Card) => {
                    this.cards.push(c);
                    this.pst.push(new CardPosition(this.id, c._id, "", Math.floor(Math.random() * 5) + 1, new Date()));
                });
            })
        });
    }

    hover(id:string, mouseover:boolean) {
        if(mouseover) {
            this.hoveredCardId = id;
        } else {
            this.hoveredCardId = "";
        }
    }
}
