import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {CircleSession} from "../../../backend/model/circleSession";
import {ThemeService} from "../../services/themeService";
import {Theme} from "../../../backend/model/theme";
import {Router} from "angular2/router";

@Component({
    selector: 'circlesession-card',
    template: `
    <div class="col s4">
      <div (click)="openCard()" class="card hoverable">
        <div class="card-content">
           <span class="card-title">{{circleSession._groupId}} - {{theme._name}}</span>
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
    private router:Router;

    constructor(themeService:ThemeService, router:Router){
        this.service = themeService;
        this.router = router;
    }

    ngAfterViewInit() {
        if(this.circleSession != undefined && !this.themeLoaded) {
            this.service.getTheme(this.circleSession._themeId).subscribe((t:Theme) =>{
                this.theme = t;
                this.themeLoaded = true;
            });
        }
    }

    openCard() {
        this.router.navigate(['/CircleSessionGame', {id: this.circleSession._id}]);
    }
}


