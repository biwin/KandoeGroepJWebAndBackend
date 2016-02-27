import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {NgClass} from "angular2/common";

import {Organisation} from "../../../backend/model/organisation";

@Component({
    selector: 'organisation-detail',
    template: `
    <div class="row container">
        <h5>{{organisation._name}}</h5>

        <div class="card"><div class="card-content">
            <p># groepen: {{organisation._groupIds.length}}</p>
            <p># leden: {{organisation._memberIds.length}}</p>
        </div></div>


        <h5>Groepen</h5>

        <div class="card" [ngClass]="{tableCard: organisation._groupIds.length!=0}"><div class="card-content">
            <table class="striped" *ngIf="organisation._groupIds.length!=0">
                <thead>
                    <tr>
                        <th data-field="name">Naam</th>
                        <th data-field="amountOfMembers"># leden</th>
                        <th data-field="description">Beschrijving</th>
                    </tr>
                </thead>

                <tr *ngFor="#group of organisation.groups" (click)="viewGroup(group._id)" class="clickable">
                    <td>{{group._name}}</td>
                    <td>{{group._memberIds.length}}</td>
                    <td>{{group._description}}</td>
                </tr>
            </table>

            <p *ngIf="organisation._groupIds.length==0">{{organisation._name}} heeft momenteel nog geen groepen.</p>
        </div></div>


        <h5>Leden</h5>

        <div class="card" [ngClass]="{tableCard: organisation._memberIds.length!=0}"><div class="card-content">
            <table class="striped" *ngIf="organisation._memberIds.length!=0">
                <thead>
                    <tr>
                        <th data-field="name">Naam</th>
                        <th data-field="email">E-mail adres</th>
                    </tr>
                </thead>

                <tr *ngFor="#member of organisation.members" (click)="viewMember(member._id)" class="clickable">
                    <td>{{member._name}}</td>
                    <td>{{member._email}}</td>
                </tr>
            </table>

            <p *ngIf="organisation._memberIds.length==0">{{organisation._name}} heeft momenteel nog geen leden.</p>
        </div></div>
    </div>
    `,
    directives: [NgClass]
})

export class OrganisationDetail {
    private router: Router;
    private organisation = new Organisation("Delhaize", ["Michaël", "Jan", "Jasper"]);

    public constructor(router: Router) {
        this.router = router;
    }

    private viewGroup(groupId: string):void {
        //this.router.navigate(["/GroupDetail", {id: groupId}]);
        alert("viewGroup: " + groupId);
    }

    private viewMember(userId: string):void {
        //this.router.navigate(["/UserDetail", {id: userId}]);
        alert("viewMembers: " + userId);
    }
}