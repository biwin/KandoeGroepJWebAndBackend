import {Component, Output, Input, EventEmitter} from "angular2/core";
import {CircleSession} from "../../../backend/model/circleSession";
import {ThemeService} from "../../services/themeService";
import {Theme} from "../../../backend/model/theme";
import {Router} from "angular2/router";
import {Group} from "../../../backend/model/group";
import {GroupService} from "../../services/groupService";
import {CircleSessionService} from "../../services/circleSessionService";
import {UserService} from "../../services/userService";
import {OnInit} from "angular2/core";



@Component({
    selector: 'circlesession-card',
    template: `
    <div class="col s4">

     <div class="modal" id="{{'m' + circleSession._id}}">
        <div class="modal-content">
            <h4>Speler toevoegen</h4>
            <div class="input-field col s12">
                <input id="email" type="email" class="validate" [(ngModel)]="email">
                <label for="email">Email</label>
            </div>
        </div>
        <div class="modal-footer">
            <a class="modal-action modal-close waves-effect waves-green btn-flat" (click)="doAdd = false">Annuleren</a>
            <a class="modal-action modal-close waves-effect waves-red btn-flat" (click)="doAdd = true">Toevoegen</a>
        </div>
      </div>



      <div class="card hoverable small">
      <i class="material-icons right green-text padding-5" *ngIf="user === circleSession._currentPlayerId">gamepad</i>

      <div *ngIf="iamCreator" class="card-action">
            <a *ngIf="!circleSession._inProgress" (click)="addUser()" class="black-text clickable"><i class="material-icons">person_add</i></a>
            <a (click)="deleteCircleSession()" class="red-text clickable"><i class="material-icons">delete</i></a>
            <a *ngIf="circleSession._inProgress" (click)="stopGame()" class="clickable"><i class="material-icons">stop</i></a>
        </div>

        <div (click)="openCard()" class="card-content clickable scrollable">
            <span class="card-title truncate">{{circleSession._name}}</span>
           <p class="black-text">Start: {{circleSession._startDate}}</p>
           <p class="black-text">{{circleSession._realTime ? 'Realtime' : 'Uitgesteld'}}</p>
           <p class="black-text">Einde: {{circleSession._endPoint == null ? 'Onbeperkt spel' : circleSession._endPoint + ' rondes'}}</p>
           <p class="black-text">{{circleSession._allowComment ? 'Commentaar toegelaten op kaarten' : 'Commentaar niet mogelijk op kaarten'}}</p>
           <p class="black-text">{{circleSession._isStopped ? 'Spel beëindigd' : 'Spel bezig'}}</p>
        </div>
      </div>
      </div>
  `
})

export class CircleSessionCard implements OnInit {
    @Input() private circleSession:CircleSession;
    @Output() onDelete:EventEmitter<string> = new EventEmitter();

    private iamCreator:boolean;
    private doAdd:boolean = false;
    private email:string = "";

    private router:Router;
    private user:string;
    private userService:UserService;
    private circleService:CircleSessionService;

    constructor(userService:UserService, circleService:CircleSessionService,router:Router){
        this.router = router;
        this.userService = userService;
        this.circleService = circleService;
        this.user = userService.getUserId();
    }

    deleteCircleSession() {
        this.onDelete.emit(this.circleSession._id);
    }

    openCard() {
        this.router.navigate(['/CircleSessionGame', {id: this.circleSession._id}]);
    }

    private addUser() {
        $('#m' + this.circleSession._id).openModal({
            opacity: .75,
            complete: () => {
                if (this.doAdd) {
                    this.circleService.addUser(this.circleSession._id, this.email).subscribe((b:boolean) => {
                        if (b) {
                            Materialize.toast('Speler toegevoegd.', 3000, 'rounded');
                        } else {
                            Materialize.toast('Speler toevoegen mislukt.', 3000, 'rounded');
                        }
                        this.doAdd = false;
                    }, (err:any) => {
                        Materialize.toast('Speler toevoegen mislukt.', 3000, 'rounded');
                    });
                }
            }
        });
    }

    ngOnInit() {
        this.iamCreator = this.userService.getUserId() === this.circleSession._creatorId;
    }

    stopGame() {
        alert('Stop GAME');
    }
}


