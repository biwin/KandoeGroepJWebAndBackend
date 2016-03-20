import {Component, Input, OnInit, NgZone} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {Response} from "angular2/http";

import {UserService} from "../../../services/userService";
import {ThemeService} from "../../../services/themeService";
import {CircleSessionService} from "../../../services/circleSessionService";

import {Card} from "../../../../backend/model/card";
import {CardPosition} from "../../../../backend/model/cardPosition";
import {CircleSession} from "../../../../backend/model/circleSession";
import {CircleSessionOnCircleToolbox} from "./../../../logic/circleSessionCardOnCircleToolbox";
import {CircleSessionCardDetail} from "./circleSessionCardDetail";
import {CircleSessionMoveResponse} from "../../../../backend/model/circleSessionMoveResponse";
import {CircleSessionCardOnBoardPipe} from "../../../logic/circleSessionCardOnBoardPipe";
import {LoadingSpinner} from "../../general/loadingSpinner";
import {SocketService} from "../../../services/socketService";


@Component({
    selector: 'circlesession-game',
    template: `
            <loading *ngIf="loading"></loading>
            <div *ngIf="!loading" class="row margin-top">
                <div class="col s6 offset-s3">
                    <svg [attr.viewBox]="constants.VIEWBOX">
                        <!-- Draw Kandoe board circles -->
                        <circle *ngFor="#filled of constants.RINGS; #i = index"
                                [attr.r]="constants.CircleRadius(i+1)"
                                [attr.stroke-width]="constants.RING_WIDTH"
                                [attr.cy]="constants.CENTER" [attr.cx]="constants.CENTER"
                                id="circle-{{i+1}}" class="kandoeRing" [class.inner]="filled"/>

                        <circle *ngFor="#bol of positions | onBoardCards; #i = index"
                                [class.hoveredBall]="bol._cardId != null && hoveredCardId === bol._cardId"
                                [id]="bol._cardId"
                                [attr.r]="35"
                                [attr.fill]="colors.get(bol._cardId)"
                                [attr.cy]="constants.YPOS_CIRCLE(bol._position, (1 / positions.length) * i)"
                                [attr.cx]="constants.XPOS_CIRCLE(bol._position, (1 / positions.length) * i)" />
                    </svg>
                </div>
            </div>
            <div *ngIf="!loading" class="row">
                <circlesession-carddetail *ngFor="#card of cards" [canPlay]="circleSession._currentPlayerId === myUserId && !turnInProgress" [card]="card" [color]="colors.get(card._id)" (hover)="hover(card._id, $event)" (playCard)="playCard($event)"></circlesession-carddetail>
            </div>
    `,
    directives: [CORE_DIRECTIVES, CircleSessionCardDetail, LoadingSpinner],
    pipes: [CircleSessionCardOnBoardPipe]
})

export class CircleSessionGame implements OnInit {
    private loading:boolean = true;
    private turnInProgress:boolean = false;
    private csService:CircleSessionService;
    private tService:ThemeService;
    private webSocket:SocketService;

    private constants:CircleSessionOnCircleToolbox = new CircleSessionOnCircleToolbox();
    private colors:Map<string,string> = new Map<string,string>();

    @Input()
    public circleSession:CircleSession = CircleSession.empty();
    private cards:Card[] = [];
    private positions:CardPosition[] = [];
    private hoveredCardId:string = "";

    private myUserId:string;

    constructor(csService:CircleSessionService, themeService:ThemeService, uService:UserService, webSocket:SocketService) {
        this.csService = csService;
        this.tService = themeService;
        this.webSocket = webSocket;
        this.myUserId = uService.getUserId();
    }

    ngOnInit() {
        this.prepareWebsocket(this.socketUrl);

        this.csService.getCardPositionsOfSession(this.circleSession._id).subscribe((cps:CardPosition[]) => {
            if (cps.length > 0) {
                cps.forEach((c:CardPosition) => {
                    this.positions.push(c);
                    var i:number = this.positions.length - 1;
                    this.colors.set(c._cardId, this.constants.CardColor(i));
                });

                this.tService.getCardsByIds(cps.map((c:CardPosition) => c._cardId)).subscribe((cs:Card[]) => {
                    this.cards = cs;
                    this.loading = false;
                });

                this.positions = this.positions.slice();
            }
        });
    }

    private prepareWebsocket() {
        this.webSocket.joinSession(this.circleSession._id || 'Unknown');
        this.webSocket.subscribeToCardPlay((data:any, zone:NgZone) => {
            zone.run(() => {
                var dataObject = JSON.parse(data);
                this.circleSession._currentPlayerId = dataObject._currentPlayerId;
                this.positions.find((p:CardPosition) => p._cardId === dataObject._cardId)._position = dataObject._cardPosition;
                this.positions = this.positions.slice();
            });
        });
    }

    hover(id:string, mouseover:boolean) {
        if (mouseover) {
            this.hoveredCardId = id;
        } else {
            this.hoveredCardId = "";
        }
    }

    playCard(cardId:string) {
        this.turnInProgress = true;

        this.csService.playCard(this.circleSession._id, cardId).subscribe((r:CircleSessionMoveResponse) => {
            this.turnInProgress = false;
            this.circleSession._currentPlayerId = r._currentPlayerId;
            if (r._updatedCardPosition != null) {
                this.positions.find((p:CardPosition) => p._cardId === r._updatedCardPosition._cardId)._position = r._updatedCardPosition._position;
                this.positions = this.positions.slice();
                this.webSocket.emitCardPlay({
                    _cardId: cardId,
                    _cardPosition: r._updatedCardPosition._position,
                    _currentPlayerId: r._currentPlayerId
                });
            }
        }, (r:Response) => {
            this.turnInProgress = false;
            var o:CircleSessionMoveResponse = r.json();
            console.error('Error while playing card...: ' + o._error);
            Materialize.toast(o._error, 3000, 'rounded');
        });
    }
}
