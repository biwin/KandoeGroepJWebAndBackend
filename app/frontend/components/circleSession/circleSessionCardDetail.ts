import {Component, Inject, Output, Input, EventEmitter} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {CircleSessionService} from "../../services/circleSessionService";
import {CircleSession} from "../../../backend/model/circleSession";
import {CircleSessionCard} from "./circleSessionCard";
import {RouteParams} from "angular2/router";
import {Card} from "../../../backend/model/card";

@Component({
    selector: 'circlesession-card',
    template: `
        <div class="col s3">
      <div class="card hoverable" [style.background]="color" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
        <div class="card-content container">
            <div class="row">
                <div class="col s12 center">
                  <a class="btn-floating btn waves-effect waves-light blue"><i class="material-icons">arrow_upward</i></a>
                </div>
            </div>
            <div class="row">
                <div class="col s12 center">
                    {{card._name}}
                </div>
            </div>
        </div>
      </div>
      </div>

    `,
    directives: [CORE_DIRECTIVES]
})

export class CircleSessionCardDetail {
    @Input() private card:Card;
    @Input() private color:string = "";
    @Output() private hover:EventEmitter<boolean> = new EventEmitter();

    onMouseEnter() {
        this.hover.emit(true);
    }

    onMouseLeave() {
        this.hover.emit(false);
    }
}