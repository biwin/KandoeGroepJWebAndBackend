///<reference path="../../../../typings/jquery/jquery.d.ts" />
///<reference path="../../../../typings/materialize-css/materialize-css.d.ts"/>

import {Component, Output, Input, EventEmitter, OnInit, AfterViewInit} from "angular2/core";
import {Response} from "angular2/http";
import {Router} from "angular2/router";

import {UserService} from "../../services/userService";
import {CircleSessionService} from "../../services/circleSessionService";

import {CircleSession} from "../../../backend/model/circleSession";
import {SnapshotService} from "../../services/snapshotService";
import {Snapshot} from "../../../backend/model/snapshot";

@Component({
    selector: 'circlesession-card',
    template: `
    <div class="col s4">

     <div class="modal" id="{{'m' + circleSession._id}}">
        <div class="modal-content">
            <h4>Speler toevoegen?</h4>
            <div class="input-field col s12">
                <input id="email" type="email" class="validate" [(ngModel)]="email">
                <label for="email">Email</label>
            </div>
        </div>
        <div class="modal-footer">
            <a class="modal-action modal-close waves-effect waves-red btn-flat red-text" (click)="doAdd = false">Annuleren</a>
            <a class="modal-action modal-close waves-effect waves-green btn-flat green-text" (click)="doAdd = true">Toevoegen</a>
        </div>
      </div>



      <div class="card hoverable small">

      <div *ngIf="iamCreator" class="card-action">
            <a *ngIf="!circleSession._inProgress" (click)="addUser()" class="black-text clickable tooltipped" data-position="bottom" data-tooltip="Speler toevoegen"><i class="material-icons">person_add</i></a>
            <a *ngIf="circleSession._inProgress" (click)="makeSnapshot()" class="amber-text text-darken-3 clickable tooltipped" data-position="bottom" data-tooltip="Snapshot maken"><i class="material-icons">photo_camera</i></a>
            <a *ngIf="circleSession._inProgress && !circleSession._isStopped" (click)="stopGame()" class="amber-text text-darken-3 clickable tooltipped" data-position="bottom" data-tooltip="Spel stoppen"><i class="material-icons">gavel</i></a>
            <a (click)="deleteCircleSession()" class="red-text clickable tooltipped" data-position="bottom" data-tooltip="Spel verwijderen"><i class="material-icons">delete</i></a>
        </div>

        <div (click)="openCard()" class="card-content clickable scrollable">
            <i class="fa fa-gamepad fa-lg green-text right padding-5" *ngIf="user === circleSession._currentPlayerId && !circleSession._isStopped"></i>
            <span class="card-title truncate" [attr.title]="circleSession._name">{{circleSession._name}}</span>
            <p class="black-text" *ngIf="!circleSession._isStopped">{{circleSession._inProgress ? 'Spel bezig' : 'Start: ' + circleSession._startDate}}</p>
            <p class="black-text" *ngIf="!circleSession._isStopped">Einde: {{circleSession._endPoint == null ? 'Onbeperkt spel' : circleSession._endPoint + ' rondes resterend'}}</p>
            <p class="black-text" *ngIf="circleSession._isStopped">Spel afgesloten!</p>
        </div>
      </div>
      </div>
  `
})

export class CircleSessionCard implements OnInit, AfterViewInit {
    @Input() private circleSession:CircleSession;
    @Output() onDelete:EventEmitter<string> = new EventEmitter();

    private iamCreator:boolean;
    private doAdd:boolean = false;
    private email:string = "";

    private router:Router;
    private user:string;

    private snapshotService:SnapshotService;
    private userService:UserService;
    private circleService:CircleSessionService;

    constructor(userService:UserService, circleService:CircleSessionService, snapshotService:SnapshotService,router:Router){
        this.router = router;
        this.userService = userService;
        this.circleService = circleService;
        this.snapshotService = snapshotService;
        this.user = userService.getUserId();
    }

    deleteCircleSession() {
        this.onDelete.emit(this.circleSession._id);
    }

    openCard() {
        this.router.navigate(['/CircleSessionGame', {id: this.circleSession._id}]);
    }

    makeSnapshot() {
        this.snapshotService.createSnapshot(this.circleSession._id).subscribe((snapshot:Snapshot) => {
            if(snapshot != null){
                Materialize.toast('Snapshot aangemaakt', 3000, 'rounded');
                this.router.navigate(['/Home']);
            } else {
                Materialize.toast('Snapshot maken mislukt', 3000, 'rounded');
            }
        });
    }

    stopGame() {
        this.circleService.stopGame(this.circleSession._id).subscribe((a:any) =>{
            this.circleSession._isStopped = a._isStopped;
            this.router.navigate(['/Home']);
        }, (r: Response) => {
            Materialize.toast('Stoppen mislukt', 3000, 'rounded');
        });
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

    ngAfterViewInit() {
        $('.tooltipped').tooltip({delay: 50});
    }
}


