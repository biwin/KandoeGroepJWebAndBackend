import {Component} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {Inject} from "angular2/core";
import {CircleSessionService} from "../../services/circleSessionService";
import {CircleSession} from "../../../backend/model/circleSession";
import {CircleSessionCard} from "./circleSessionCard";
import {UserService} from "../../services/userService";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: 'circlesession-overview',
    template: `
    <div class="container">
            <div class="modal" id="mDelCircleSession">
                <div class="modal-content">
                    <h4>Spel verwijderen?</h4>
                    <p>Bent u zeker dat u dit spel en alle bijhorende zetten wilt verwijderen?</p>
                </div>
                <div class="modal-footer">
                    <a class="modal-action modal-close waves-effect waves-green btn-flat" (click)="doDelete = false">Nee, ga terug</a>
                    <a class="modal-action modal-close waves-effect waves-red btn-flat" (click)="doDelete = true">Ja, verwijder</a>
                </div>
            </div>

            <h5>Jouw spellen</h5>
            <div>
                <a [routerLink]="['CreateSession']" class="btn-floating waves-effect waves-light red" title="Creëer circlespel">
                    <i class="material-icons">add</i>
                </a>
            </div>

            <div *ngIf="loading" class="row center margin-top">
                <div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-blue-only">
                      <div class="circle-clipper left">
                        <div class="circle"></div>
                      </div><div class="gap-patch">
                        <div class="circle"></div>
                      </div><div class="circle-clipper right">
                        <div class="circle"></div>
                      </div>
                    </div>
                </div>
            </div>


     <div class="row">
        <div *ngFor="#circleSession of circleSessions">
             <circlesession-card *ngIf="!circleSession._isStopped" [circleSession]="circleSession" (onDelete)="deleteCircleSession($event)"></circlesession-card>
        </div>

     </div>
    </div>
    `,
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, CircleSessionCard]
})

export class CircleSessionOverview {
    private circleSessions:CircleSession[] = [];
    private circleService:CircleSessionService;

    private loading:boolean = true;
    private doDelete:boolean = false;


    constructor(service:CircleSessionService, userService:UserService) {
        this.circleService = service;
            userService.getCircleSessionsOfCurrentUser().subscribe((circleSessions:CircleSession[]) =>{
                this.circleSessions = circleSessions;
                this.loading = false;
            });
    }

    deleteCircleSession(id:string) {
        $('#mDelCircleSession').openModal({
            opacity: .75,
            complete: () => {
                if(this.doDelete) {
                    this.circleService.deleteCircleSession(id).subscribe((b:boolean) => {
                        if (b) {
                            this.removeCircleSessionFromArray(id);
                            Materialize.toast('Spel verwijderd.', 3000, 'rounded');
                        } else {
                            Materialize.toast('Verwijderen mislukt.', 3000, 'rounded');
                        }

                        this.doDelete = false;
                    }, () => {
                        Materialize.toast('Verwijderen mislukt.', 3000, 'rounded');
                        console.warn('Delete theme failed, theme not found');
                    });
                }
            }
        });
    }

    private removeCircleSessionFromArray(id:string) {
        var i = this.circleSessions.findIndex((c:CircleSession) => c._id == id);
        this.circleSessions.splice(i, 1);
    }
}
