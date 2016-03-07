import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {CircleSession} from "../../../backend/model/circleSession";
import {ThemeService} from "../../services/themeService";
import {Theme} from "../../../backend/model/theme";
import {Router} from "angular2/router";
import {Group} from "../../../backend/model/group";
import {GroupService} from "../../services/groupService";

@Component({
    selector: 'circlesession-card',
    template: `
    <div class="col s4">
      <div (click)="openCard()" class="card hoverable">
        <div class="card-content">
           <span class="card-title">{{group._name}} - {{theme._name}}</span>
           <p class="black-text">Start: {{circleSession._startDate}}</p>
           <p class="black-text">{{circleSession._realTime ? 'Realtime' : 'Uitgesteld'}}</p>
           <p class="black-text">Einde: {{circleSession._endPoint == null ? 'Onbeperkt spel' : circleSession._endPoint + ' rondes'}}</p>
           <p class="black-text">{{circleSession._allowComment ? 'Commentaar toegelaten op kaarten' : 'Commentaar niet mogelijk op kaarten'}}</p>
        </div>
      </div>
      </div>
  `
})

export class CircleSessionCard {
    @Input() private circleSession:CircleSession;

    private themeService:ThemeService;
    private groupService: GroupService;

    private theme:Theme = Theme.empty();
    private group:Group = Group.empty();

    private themeLoaded:boolean = false;
    private router:Router;

    constructor(themeService:ThemeService, groupService:GroupService, router:Router){
        this.themeService = themeService;
        this.groupService = groupService;
        this.router = router;
    }

    ngAfterViewInit() {
        if(this.circleSession != undefined && !this.themeLoaded) {
            this.themeService.getTheme(this.circleSession._themeId).subscribe((t:Theme) =>{
                this.theme = t;
                this.themeLoaded = true;
            });
            this.groupService.getGroup(this.circleSession._groupId).subscribe((g:Group) =>{
                this.group = g;
            })
        }
    }

    openCard() {
        this.router.navigate(['/CircleSessionGame', {id: this.circleSession._id}]);
    }
}


