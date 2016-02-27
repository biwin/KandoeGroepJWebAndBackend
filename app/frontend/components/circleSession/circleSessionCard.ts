import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {CircleSession} from "../../../backend/model/circleSession";

@Component({
    selector: 'circlesession-card',
    template: `
    <div class="col s4">
      <div class="card medium hoverable">
        <div class="card-content">
           <span class="card-title">Titel?</span>
           <p class="black-text">Group: {{circleSession._groupId}}</p>
           <p class="black-text">Theme: {{circleSession._themeId}}</p>
           <p class="black-text">Start: {{circleSession._startDate}}</p>
           <p class="black-text">{{circleSession._realTime}}</p>
           <p class="black-text">Beurt duur: {{circleSession.turnTimeMin}}</p>
           <p class="black-text">Einde: {{circleSession._endPoint}}</p>
        </div>
      </div>
      </div>
  `
})

export class CircleSessionCard {
    //TODO: improve circlesession card layout
    @Input() private circleSession:CircleSession;

    ngAfterViewInit():any {
       //TODO: hide durationtext when session is realtime
    }
}



