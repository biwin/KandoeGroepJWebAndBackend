///<reference path="../../../../typings/jquery/jquery.d.ts" />
///<reference path="../../../../typings/materialize-css/materialize-css.d.ts"/>

import {Component, Input, OnChanges} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";

import {CircleSession} from "../../../backend/model/circleSession";
import {CircleSessionService} from "../../services/circleSessionService";
import {CircleSessionCardWrapper} from "../../../backend/model/circleSessionCardWrapper";
import {CircleSessionMoveResponse} from "../../../backend/model/circleSessionMoveResponse";
import {UserService} from "../../services/userService";
import {Response} from "angular2/http";

@Component({
    selector: 'pregame',
    template: `
        <div class="row container">
              <div class="fixed-action-btn" id="sessionPreGameSave">
                <a (click)="submitCards()" class="btn-floating btn-large red">
                  <i class="large material-icons">arrow_forward</i>
                </a>
                <ul>
                  <li><a (click)="clear()" class="btn-floating orange"><i class="material-icons">undo</i></a></li>
                </ul>
              </div>

            <h5 class="center-align">Kies de kaarten die belangrijk zijn voor jou!</h5>
            <div *ngIf="myUserId === circleSession._currentPlayerId">
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
            <div *ngIf="myUserId !== circleSession._currentPlayerId" class="col s12">
                <h6>Beurt voorbij! Wacht tot iedereen kaartjes gekozen heeft om het spel te beginnen...</h6>
            </div>
        </div>
    `,
    directives: [CORE_DIRECTIVES]
})
export class CircleSessionPreGame implements OnChanges {
    @Input() circleSession:CircleSession = CircleSession.empty();
    circleService:CircleSessionService;
    cards:CircleSessionCardWrapper[] = [];
    selectedCards:string[] = [];
    myUserId:string;

    constructor(cService:CircleSessionService, uService:UserService) {
        this.circleService = cService;
        this.myUserId = uService.getUserId();
    }

    ngOnChanges() {
        if (this.circleSession._id != undefined && this.circleSession._id.length > 0) {
            this.circleService.getCircleSessionCards(this.circleSession._id).subscribe((wrappers:CircleSessionCardWrapper[])=> {
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
        this.circleService.initCards(this.circleSession._id, this.selectedCards).subscribe((r:CircleSessionMoveResponse) => {
            if (r._error == null) {
                this.circleSession._currentPlayerId = r._currentPlayerId;
                if (r._roundEnded === true)
                    this.circleSession._isPreGame = false;
                this.cards = this.cards.map((c:CircleSessionCardWrapper) => {
                    if (this.selectedCards.indexOf(c.card._id) > -1)
                        c.inPlay = true;
                    return c;
                });
                this.selectedCards.splice(0, this.selectedCards.length);
            }
            Materialize.toast('Done', 3000, 'rounded');
        }, (r:Response) => {
            var o:CircleSessionMoveResponse = r.json();
            Materialize.toast(o._error, 3000, 'rounded');
            console.error('Error while adding card to game...: ' + o._error);
        });
    }
}


