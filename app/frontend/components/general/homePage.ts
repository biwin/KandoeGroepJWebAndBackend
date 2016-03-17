import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {UserService} from "../../services/userService";

import {CircleSession} from "../../../backend/model/circleSession";
import {CORE_DIRECTIVES} from "angular2/common";
import {CircleSessionCard} from "../circleSession/circleSessionCard";
import {CircleSessionService} from "../../services/circleSessionService";
import {SnapshotCard} from "../snapshot/snapshotCard";
import {Snapshot} from "../../../backend/model/snapshot";
import {SnapshotService} from "../../services/snapshotService";

@Component({
    selector: 'home-page',
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

        <h5 *ngIf="!loading && circleSessionsInProgress.length > 0">Bezig</h5>
        <div class="row">
            <div *ngFor="#circleSession of circleSessionsInProgress">
                <circlesession-card [circleSession]="circleSession" (onDelete)="deleteCircleSession($event)"></circlesession-card>
            </div>
        </div>

        <h5 *ngIf="!loading && circleSessionsPlanned.length > 0">Gepland</h5>
        <div class="row">
            <div *ngFor="#circleSession of circleSessionsPlanned">
                <circlesession-card [circleSession]="circleSession" (onDelete)="deleteCircleSession($event)"></circlesession-card>
            </div>
        </div>

        <h5 *ngIf="!loading && circleSessionsStopped.length > 0">Gestopt</h5>
        <div class="row">
            <div *ngFor="#circleSession of circleSessionsStopped">
                <circlesession-card [circleSession]="circleSession" (onDelete)="deleteCircleSession($event)"></circlesession-card>
            </div>
        </div>

        <h5 *ngIf="!loading && snapshots.length > 0">Snapshots</h5>
        <div class="row">
            <div *ngFor="#snapshot of snapshots">
                <snapshot-card [snapshot]="snapshot"></snapshot-card>
            </div>
        </div>

     </div>
    `,
    directives: [CORE_DIRECTIVES, CircleSessionCard, SnapshotCard]
})

export class HomePage {
    private circleSessionsInProgress:CircleSession[] = [];
    private circleSessionsPlanned:CircleSession[] = [];
    private circleSessionsStopped:CircleSession[] = [];

    private snapshots:Snapshot[] = [];

    private circleService:CircleSessionService;
    private loading:boolean = true;
    private doDelete:boolean = false;

    public constructor(private router: Router, userService:UserService, circleService:CircleSessionService, snapshotService:SnapshotService) {
        this.circleService = circleService;
        userService.getCircleSessionsOfCurrentUser().subscribe((circleSessions:CircleSession[]) =>{
            circleSessions.forEach((circleSession:CircleSession) => {
                if(circleSession._inProgress && !circleSession._isStopped){
                    this.circleSessionsInProgress.push(circleSession);
                } else if(!circleSession._isStopped && !circleSession._inProgress) {
                    this.circleSessionsPlanned.push(circleSession);
                } else {
                    this.circleSessionsStopped.push(circleSession);
                }
            });
            snapshotService.getAll().subscribe((snapshots:Snapshot[])=> {
               this.snapshots = snapshots;
            });
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
        var planned = this.circleSessionsPlanned.findIndex((c:CircleSession) => c._id == id);
        var inProgress = this.circleSessionsInProgress.findIndex((c:CircleSession) => c._id == id);
        var stopped = this.circleSessionsStopped.findIndex((c:CircleSession) => c._id == id);

        if(planned != -1){
            this.circleSessionsPlanned.splice(planned, 1);
        } else if(stopped != -1){
            this.circleSessionsStopped.splice(stopped, 1);
        } else if(inProgress != -1){
            this.circleSessionsInProgress.splice(inProgress, 1);
        }
    }

}