import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {CircleSession} from "../../../backend/model/circleSession";
import {ThemeService} from "../../services/themeService";
import {Theme} from "../../../backend/model/theme";

@Component({
    selector: 'circlesession-card',
    template: `
    <div class="col s4">
      <div class="card hoverable">
        <div class="card-content">
           <span class="card-title">Titel?</span>
           <p class="black-text">Group: {{circleSession._groupId}}</p>
           <p class="black-text">Theme: {{theme._name}}</p>
           <p class="black-text">Start: {{circleSession._startDate}}</p>
           <p class="black-text">{{circleSession._realTime ? 'Realtime' : 'Uitgesteld'}}</p>
           <p class="black-text">Beurt duur: {{circleSession.turnTimeMin}}</p>
           <p class="black-text">Einde: {{circleSession._endPoint}}</p>
        </div>
      </div>
      </div>
  `
})

export class CircleSessionCard {
    @Input() private circleSession:CircleSession;
    private service:ThemeService;
    private theme:Theme = Theme.empty();
    private themeLoaded:boolean = false;

    constructor(themeService:ThemeService){
        this.service = themeService;
    }

    ngAfterViewInit() {
        if(this.circleSession != undefined && !this.themeLoaded) {
            this.service.getTheme(this.circleSession._themeId).subscribe((t:Theme) =>{
                this.theme = t;
                this.themeLoaded = true;
            });
        }
    }
}



