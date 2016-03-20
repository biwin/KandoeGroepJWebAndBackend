///<reference path="../../../../../typings/jquery/jquery.d.ts" />
///<reference path="../../../../../typings/materialize-css/materialize-css.d.ts"/>

import {Component, Input, OnChanges, NgZone} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {Response} from "angular2/http";

import {UserService} from "../../../services/userService";
import {CircleSessionService} from "../../../services/circleSessionService";

import {CircleSession} from "../../../../backend/model/circleSession";
import {CircleSessionCardWrapper} from "../../../../backend/model/circleSessionCardWrapper";
import {CircleSessionMoveResponse} from "../../../../backend/model/circleSessionMoveResponse";
import {LoadingSpinner} from "../../general/loadingSpinner";
import {SocketService} from "../../../services/socketService";

@Component({
    selector: 'pregame',
    template: `
        <loading *ngIf="submitting || loading"></loading>
        <div [hidden]="submitting || loading" class="row container">
              <div class="fixed-action-btn" id="sessionPreGameSave" *ngIf="myUserId === circleSession._currentPlayerId">
                <a (click)="submitCards()" class="btn-floating btn-large red">
                  <i class="large material-icons">arrow_forward</i>
                </a>
                <ul>
                  <li><a (click)="clear()" class="btn-floating orange"><i class="material-icons">undo</i></a></li>
                </ul>
              </div>

            <div *ngIf="myUserId === circleSession._currentPlayerId">
                <h5 class="center-align">Kies de kaarten die belangrijk zijn voor jou!</h5>
                <div class="col s12 m4" *ngFor="#card of cards">
                    <div class="card-panel">
                        <span class="truncate">
                            <a (click)="selectCard(card.card._id)" *ngIf="!card.inPlay && selectedCards.indexOf(card.card._id) < 0" class="z-depth-0 btn-floating btn waves-effect waves-light blue"><i class="material-icons">add</i></a>
                            <a (click)="unselectCard(card.card._id)" *ngIf="!card.inPlay && selectedCards.indexOf(card.card._id) >= 0" class="z-depth-0 btn-floating btn waves-effect waves-light red"><i class="material-icons">remove</i></a>
                            <a *ngIf="card.inPlay" class="z-depth-0 btn-floating btn disabled-with-tooltip tooltipped" data-position="bottom" data-delay="50" data-tooltip="Deze kaart is al door een andere speler gekozen."><i class="material-icons">remove</i></a>
                            <span class="center-align">  {{card.card._name}}</span>
                        </span>
                   </div>
                </div>
            </div>
            <div *ngIf="myUserId !== circleSession._currentPlayerId" class="center-block">
                <p class="center-align">
                    <i class="fa fa-quote-left fa-3x fa-pull-left"></i>
                    Alles komt op tijd voor hem die wachten kan.
                    <i class="fa fa-quote-right fa-3x fa-pull-right"></i>
                </p>
                <p class="right-align grey-text text-lighten-2">-François Rabelais</p>
            </div>
        </div>
    `,
    directives: [CORE_DIRECTIVES, LoadingSpinner]
})
export class CircleSessionPreGame implements OnChanges {
    @Input() circleSession:CircleSession;
    
    private loading:boolean = true;
    private submitting:boolean = false;
    private webSocket:SocketService;
    
    circleService:CircleSessionService;
    
    cards:CircleSessionCardWrapper[] = [];
    selectedCards:string[] = [];
    
    myUserId:string;

    constructor(cService:CircleSessionService, uService:UserService, webSocket:SocketService) {
        this.circleService = cService;
        this.myUserId = uService.getUserId();
        this.webSocket = webSocket;
    }

    ngOnChanges() {
        if (this.circleSession._id != undefined && this.circleSession._id.length > 0) {
            this.prepareWebSocket();
            this.circleService.getCircleSessionCards(this.circleSession._id).subscribe((wrappers:CircleSessionCardWrapper[])=> {
                this.loading = false;
                this.cards = wrappers;
                $('.tooltipped').tooltip({delay: 50});
            });
        }
    }

    selectCard(id:string) {
        if (this.selectedCards.length >= 3) {
            Materialize.toast('Je mag maar 3 kaartjes kiezen!', 3000, 'rounded');
        } else {
            this.selectedCards.push(id);
        }
    }

    unselectCard(id:string) {
        var i = this.selectedCards.indexOf(id);
        this.selectedCards.splice(i, 1);
    }

    clear() {
        this.selectedCards.splice(0, this.selectedCards.length);
    }

    submitCards() {
        this.submitting = true;
        this.circleService.initCards(this.circleSession._id, this.selectedCards).subscribe((r:CircleSessionMoveResponse) => {
            if (r._error == null) {
                this.webSocket.emitCardInit({
                    _currentPlayerId: r._currentPlayerId,
                    _cards: this.selectedCards,
                    _roundEnded: r._roundEnded
                });
                
                this.circleSession._currentPlayerId = r._currentPlayerId;
                if (r._roundEnded === true)
                    this.circleSession._isPreGame = false;
                this.cards = this.cards.map((c:CircleSessionCardWrapper) => {
                    if (this.selectedCards.indexOf(c.card._id) > -1)
                        c.inPlay = true;
                    return c;
                });
                this.selectedCards.splice(0, this.selectedCards.length);
                this.submitting = false;
            }
        }, (r:Response) => {
            var o:CircleSessionMoveResponse = r.json();
            Materialize.toast(o._error, 3000, 'rounded');
            console.error('Error while adding card to game...: ' + o._error);
            this.submitting = false;
        });
    }

    private prepareWebSocket() {
        this.webSocket.joinSession(this.circleSession._id || 'Unknown');
        this.webSocket.subscribeToCardInit((data:any, zone:NgZone) => {
            zone.run(() => {
                var dataObject:any = JSON.parse(data);
                this.circleSession._isPreGame = !dataObject._roundEnded;
                this.circleSession._currentPlayerId = dataObject._currentPlayerId;
                this.cards = this.cards.map((c:CircleSessionCardWrapper) => {
                    if(dataObject._cards.indexOf(c.card._id) > -1)
                        c.inPlay = true;
                    return c;
                });
            });
        });
    }
}