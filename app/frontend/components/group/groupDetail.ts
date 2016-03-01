import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {NgClass} from "angular2/common";

import {Group} from "../../../backend/model/group";
import {User} from "../../../backend/model/user";

@Component({
    selector: 'group-detail',
    template: `
    <div class="row container">
        <h5>{{group._name}} [{{group.getOrganisation()._name}}]</h5>

        <div class="card"><div class="card-content">
            # leden: {{group._memberIds.length}}
        </div></div>


        <h5>Leden</h5>

        <div class="card" [ngClass]="{tableCard: group._memberIds.length!=0}"><div class="card-content">
            <table class="striped" *ngIf="group._memberIds.length!=0">
                <thead>
                    <tr>
                        <th data-field="name">Naam</th>
                        <th data-field="email">E-mail adres</th>
                    </tr>
                </thead>

                <tr *ngFor="#member of members" (click)="viewMember(member._id)" class="clickable">
                    <td>{{member._name}}</td>
                    <td>{{member._email}}</td>
                </tr>
            </table>

            <p *ngIf="group._memberIds.length==0">De groep "{{group._name}}" van organisatie "{{group.getOrganisation()._name}}" heeft momenteel nog geen leden.</p>
        </div></div>
    </div>
    `,
    directives: [NgClass]
})

export class GroupDetail {
    private router: Router;
    private group: Group;
    private members: User[];

    public constructor(router: Router) {
        this.router = router;

        this.group = new Group(
            "Voeding",
            "De groep van alle medewerkers Voeding",
            "Delhaize",
            ["Gunther De Wilde", "Michaël De Boey", "Olivier De Poortere"]
        );

        this.members = this.group.getMembers();
    }

    private viewMember(userId: string): void {
        //this.router.navigate(["/UserDetail", {id: userId}]);
        alert("viewMember: " + userId);
    }
}