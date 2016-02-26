import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {NgClass} from "angular2/common";

import {Organisation} from "../../../backend/model/organisation";

@Component({
    selector: 'organisations-overview',
    template: `
    <div class="row container">
        <h5>Mijn organisaties</h5>

        <div class="card" [ngClass]="{tableCard: organisations.length!=0}"><div class="card-content">
            <table class="striped" *ngIf="organisations.length!=0">
                <thead>
                    <tr>
                        <th data-field="name">Naam</th>
                        <th data-field="amountOfMembers"># leden</th>
                    </tr>
                </thead>

                <tr *ngFor="#organisation of organisations" (click)="onClick(organisation._id)" class="clickable">
                    <td>{{organisation._name}}</td>
                    <td>{{organisation._organisatorIds.length}}</td>
                </tr>
            </table>

            <p *ngIf="organisations.length==0">Je bent momenteel nog geen lid van een organisatie.</p>
        </div></div>
    </div>
    `,
    directives: [NgClass]
})

export class OrganisationsOverview {
    private router: Router;

    public constructor(router: Router) {
        this.router = router;
    }

    private organisations: Organisation[] = [
        new Organisation("Delhaize", ["Michaël", "Jan"]),
        new Organisation("Colruyt", ["Michaël"]),
        new Organisation("Albert Hein", ["Michaël", "Jan", "Jasper"]),
        new Organisation("Aldi", ["Michaël", "Michaël", "Michaël", "Michaël", "Michaël"]),
        new Organisation("Euroshop", ["Michaël", "Michaël", "Michaël", "Michaël", "Michaël", "Michaël", "Michaël"])
    ];

    private onClick(organisationId: string): void {
        //this.router.navigate(["/OrganisationDetail", {id: organisationId}]);
    }
}