import {Component, Output, Input, EventEmitter} from "angular2/core";
import {CircleSession} from "../../../backend/model/circleSession";
import {ThemeService} from "../../services/themeService";
import {Theme} from "../../../backend/model/theme";
import {Router} from "angular2/router";
import {Group} from "../../../backend/model/group";
import {GroupService} from "../../services/groupService";
import {CircleSessionService} from "../../services/circleSessionService";



@Component({
    selector: 'circlesession-card',
    template: `
    <div class="col s4">
      <div class="card hoverable">
        <div (click)="openCard()" class="card-content clickable">
            <span class="card-title truncate">{{circleSession._name}}</span>
           <p class="black-text">Start: {{circleSession._startDate}}</p>
           <p class="black-text">{{circleSession._realTime ? 'Realtime' : 'Uitgesteld'}}</p>
           <p class="black-text">Einde: {{circleSession._endPoint == null ? 'Onbeperkt spel' : circleSession._endPoint + ' rondes'}}</p>
           <p class="black-text">{{circleSession._allowComment ? 'Commentaar toegelaten op kaarten' : 'Commentaar niet mogelijk op kaarten'}}</p>
        </div>
        <div class="card-action">
            <a (click)="deleteCircleSession()" class="red-text clickable"><i class="material-icons">delete</i></a>
        </div>
      </div>
      </div>
  `
})

export class CircleSessionCard {
    @Input() private circleSession:CircleSession;
    @Output() onDelete:EventEmitter<string> = new EventEmitter();

    private router:Router;
    private circleSessionService:CircleSessionService;

    constructor(circleSessionService:CircleSessionService, router:Router){
        this.router = router;
        this.circleSessionService = circleSessionService;
    }

    deleteCircleSession() {
        this.onDelete.emit(this.circleSession._id);
    }

    openCard() {
        this.router.navigate(['/CircleSessionGame', {id: this.circleSession._id}]);
    }
}


