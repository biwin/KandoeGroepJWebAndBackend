import {Component, Inject,OnChanges, NgZone} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {RouteParams} from "angular2/router";
import {Response} from "angular2/http";

import {UserService} from "../../services/userService";
import {ThemeService} from "../../services/themeService";
import {CircleSessionService} from "../../services/circleSessionService";

import {Card} from "../../../backend/model/card";
import {User} from "../../../backend/model/user";
import {CardPosition} from "../../../backend/model/cardPosition";
import {CircleSession} from "../../../backend/model/circleSession";
import {CircleSessionCard} from "./circleSessionCard";
import {CircleSessionPreGame} from "./circleSessionPreGame";
import {CircleSessionUserList} from "./circleSessionUserList";
import {CircleSessionConstants} from "./../../logic/circleSessionConstants";
import {CircleSessionCardDetail} from "./circleSessionCardDetail";
import {CircleSessionMoveResponse} from "../../../backend/model/circleSessionMoveResponse";
import {CircleSessionCardOnBoardPipe} from "../../logic/circleSessionCardOnBoardPipe";


@Component({
    selector: 'circlesession-game',
    template: `
    <div class="padding-right-users">
        <div class="row">
            <h3 class="center-align">{{circleSession._name}}</h3>
        </div>

        <div class="row" *ngIf="!circleSession._inProgress">
            <h5>Deze sessie is nog niet actief...</h5>
        </div>

        <pregame [circleSession]="circleSession" *ngIf="circleSession._inProgress && circleSession._isPreGame"></pregame>

        <div id="game" *ngIf="circleSession._inProgress && !circleSession._isPreGame">
            <div class="row margin-top">
                <div class="col s6 offset-s3">
                    <svg [attr.viewBox]="constants.VIEWBOX">
                        <!-- Draw Kandoe board circles -->
                        <circle *ngFor="#filled of constants.RINGS; #i = index"
                                [attr.r]="constants.CircleRadius(i+1)"
                                [attr.stroke-width]="constants.RING_WIDTH"
                                [attr.cy]="constants.CENTER" [attr.cx]="constants.CENTER"
                                id="circle-{{i+1}}" class="kandoeRing" [class.inner]="filled"/>


                        <!-- FIXME: kleur correct aanduiden, index komt niet overeen met index hieronder -->
                        <circle *ngFor="#bol of pst | onBoardCards; #i = index"
                                [class.hoveredBall]="bol._cardId != null && hoveredCardId === bol._cardId"
                                [id]="bol._cardId"
                                [attr.r]="35"
                                [attr.fill]="colors.get(bol._cardId)"
                                [attr.cy]="constants.YPOS_CIRCLE(bol._position, (1 / pst.length) * i)"
                                [attr.cx]="constants.XPOS_CIRCLE(bol._position, (1 / pst.length) * i)" />
                    </svg>
                </div>
            </div>
            <div class="row">
                <circlesession-carddetail *ngFor="#card of cards; #i = index" [canPlay]="circleSession._currentPlayerId === myUserId" [card]="card" [color]="colors.get(card._id)" (hover)="hover(card._id, $event)" (playCard)="playCard($event)"></circlesession-carddetail>
            </div>
        </div>

        <user-list [currentPlayerId]="circleSession._currentPlayerId" [users]="circleSession._userIds" [circleSessionId]="circleSession._id"></user-list>
    </div>
    `,
    directives: [CORE_DIRECTIVES, CircleSessionCardDetail, CircleSessionUserList, CircleSessionPreGame],
    pipes: [CircleSessionCardOnBoardPipe]
})

export class CircleSessionGame {
    private constants:CircleSessionConstants = new CircleSessionConstants();
    private circleSession:CircleSession = CircleSession.empty();
    private cards:Card[] = [];
    private pst:CardPosition[] = [];
    private id:string;
    private hoveredCardId:string = "";
    private service:CircleSessionService;
    private colors:Map<string,string> = new Map<string,string>();
    private socket;
    private zone: NgZone;
    private myUserId:string;

    constructor(service:CircleSessionService,themeService:ThemeService, uService:UserService, @Inject('App.SocketUrl') socketUrl:string, route:RouteParams) {
        this.id = route.get('id');
        this.service = service;
        this.myUserId = uService.getUserId();

        service.get(this.id).subscribe((circleSession:CircleSession) => {
            this.circleSession = circleSession;

            /*SOCKET UPDATE*/
            this.zone = new NgZone({enableLongStackTrace: false});
            this.socket = io.connect(socketUrl);
            this.socket.emit('join session', JSON.stringify({sessionId: this.circleSession._id || 'Unknown'}));
            this.socket.on('send move', data => this.zone.run(() => {
                var dataObject = JSON.parse(data);
                this.pst.find((p: CardPosition) => p._cardId === dataObject._cardId)._position = dataObject._cardPosition;
                this.pst = this.pst.slice();
            }));
            /*END SOCKET UPDATE*/

            if(circleSession._inProgress && ! circleSession._isPreGame){
                service.getCardPositionsOfSession(circleSession._id).subscribe((cps:CardPosition[]) => {
                    if(cps.length > 0) {
                        cps.forEach((c:CardPosition) => {
                            this.pst.push(c);
                            var i:number = this.pst.length - 1;
                            this.colors.set(c._cardId, this.constants.CardColor(i));
                        });

                        themeService.getCardsByIds(cps.map((c:CardPosition) => c._cardId)).subscribe((cs:Card[]) => {
                            this.cards = cs;
                        });

                        this.pst = this.pst.slice();
                    }
                });
            }
        });
    }

    hover(id:string, mouseover:boolean) {
        if(mouseover) {
            this.hoveredCardId = id;
        } else {
            this.hoveredCardId = "";
        }
    }

    playCard(cardId:string) {
        this.service.playCard(this.circleSession._id, cardId).subscribe((r:CircleSessionMoveResponse) => {
            this.circleSession._currentPlayerId = r._currentPlayerId;
            if(r._updatedCardPosition != null) {
                this.pst.find((p:CardPosition) => p._cardId === r._updatedCardPosition._cardId)._position = r._updatedCardPosition._position;
                //FIXME temporary workaround to force the Pipe to be executed again
                this.pst = this.pst.slice();
                this.socket.emit('send move', {_cardId: cardId, _cardPosition: r._updatedCardPosition._position});
            }
        }, (r:Response) => {
            var o:CircleSessionMoveResponse = r.json();
            console.error('Error while playing card...: ' + o._error);
            Materialize.toast(o._error, 3000, 'rounded');
        });
    }
}
