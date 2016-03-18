import {RouteParams} from "angular2/router";
import {Component} from "angular2/core";

import {SnapshotService} from "../../services/snapshotService";
import {Snapshot} from "../../../backend/model/snapshot";

@Component({
    selector: 'snapshot-detail',
    template: `
    <div class="row container">
        <h5>Snapshot</h5>
        
        <div class="card"><div class="card-content">
            <h6>{{snapshot._gameName}}</h6>
            <h6>{{snapshot._timestamp}}</h6>
        </div></div>
    
        <div class="card tableCard"><div class="card-content">
            
            <table class="striped">
                <thead>
                    <tr>
                        <th data-field="cardName">Spelers</th>
                    </tr>
                </thead>

                <tr *ngFor="#player of snapshot._playerNames" (click)="viewGroup(group._id)" class="clickable">
                    <td>{{player}}</td>
                </tr>
            </table>
            
        </div></div>
    
        <h5>Kaarten</h5>
        <div class="card tableCard"><div class="card-content">
            
            <table class="striped">
                <thead>
                    <tr>
                        <th data-field="cardName">Kaart</th>
                        <th data-field="position">Plaats</th>
                    </tr>
                </thead>

                <tr *ngFor="#card of snapshot._cards" (click)="viewGroup(group._id)" class="clickable">
                    <td>{{card._cardName}}</td>
                    <td>{{card._position}}</td>
                </tr>
            </table>
            
        </div></div>
        
        <div *ngIf="snapshot._chat.length != 0 ">
            <h5>Chat</h5>
            <div class="card tableCard"><div class="card-content">
            
                <table>
                    <thead>
                        <tr>
                            <th data-field="cardName">Speler</th>
                            <th data-field="cardName">Bericht</th>
                            <th data-field="position">Tijdstip</th>
                        </tr>
                    </thead>
                
                    <tr *ngFor="#message of snapshot._chat" (click)="viewGroup(group._id)" class="clickable">
                        <td>{{message._userName}}</td>
                        <td>{{message._message}}</td>
                        <td>{{message._timestamp}}</td>
                    </tr>
                </table>

            </div></div>
        </div>
    </div>
    `,
    directives: []
})


export class SnapshotDetail {
    private snapshot:Snapshot = Snapshot.empty();

    constructor(service:SnapshotService, route:RouteParams) {
        service.getById(route.get('id')).subscribe((snapshot:Snapshot) => {
            this.snapshot = snapshot;
        });
    }
}