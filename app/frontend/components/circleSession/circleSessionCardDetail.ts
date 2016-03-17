import {Component, Inject, Output, Input, EventEmitter} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {RouteParams} from "angular2/router";

import {CircleSessionService} from "../../services/circleSessionService";

import {Card} from "../../../backend/model/card";
import {CircleSession} from "../../../backend/model/circleSession";
import {CircleSessionCard} from "./circleSessionCard";

@Component({
    selector: 'circlesession-carddetail',
    template: `
      <div class="col s3">
          <div class="card hoverable thCard" [attr.title]="card._name" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
            <div class="card-content valign-wrapper">
                <a *ngIf="canPlay" class="btn-floating btn waves-effect waves-light" [style.background]="color" (click)="clickButton()"><i class="material-icons">arrow_upward</i></a>
                <span class="valign center-block center-align">{{card._name}}</span>
            </div>
          </div>
      </div>

    `,
    directives: [CORE_DIRECTIVES]
})

export class CircleSessionCardDetail {
    @Input() private canPlay:boolean;
    @Input() private card:Card;
    @Input() private color:string = "";
    @Output() private hover:EventEmitter<boolean> = new EventEmitter();
    @Output() private playCard:EventEmitter<string> = new EventEmitter();

    onMouseEnter() {
        this.hover.emit(true);
    }

    onMouseLeave() {
        this.hover.emit(false);
    }

    clickButton() {
        this.playCard.emit(this.card._id);
    }
}