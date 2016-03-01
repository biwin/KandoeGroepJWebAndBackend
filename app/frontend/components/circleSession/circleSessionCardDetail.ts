import {Component} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {Inject} from "angular2/core";
import {CircleSessionService} from "../../services/circleSessionService";
import {CircleSession} from "../../../backend/model/circleSession";
import {CircleSessionCard} from "./circleSessionCard";
import {RouteParams} from "angular2/router";
import {Input} from "angular2/core";
import {Card} from "../../../backend/model/card";

@Component({
    selector: 'circlesession-card',
    template: `
        <div class="col s3">
      <div (click)="openCard()" class="card hoverable">
        <div class="card-content">
           <span class="card-title">{{card._name}} <a class="btn-floating btn waves-effect waves-light blue right"><i class="material-icons">arrow_upward</i></a></span>
        </div>
      </div>
      </div>

    `,
    directives: [CORE_DIRECTIVES]
})

export class CircleSessionCardDetail {
    @Input() private card:Card;
}