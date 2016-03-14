import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {NgClass} from "angular2/common";

import {UserService} from "../../services/userService";

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
                        <th></th>
                        <th data-field="name">Naam</th>
                        <th data-field="amountOfMembers"># leden</th>
                    </tr>
                </thead>

                <tr *ngFor="#organisation of organisations" class="clickable">
                    <td><i class="material-icons red-text" (click)="deleteOrganisation(organisation._id)"  title="Verwijder {{organisation._name}}">delete</i></td>
                    <td (click)="viewOrganisation(organisation._id)">{{organisation._name}}</td>
                    <td (click)="viewOrganisation(organisation._id)">{{organisation._memberIds.length}}</td>
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
    private organisations: Organisation[] = [];

    public constructor(router: Router, userService: UserService) {
        this.router = router;

        //TODO: geen userId meesturen
        userService.getUserId((userId: string) => {
            userService.getAllOrganisationsOfUserById(userId).subscribe((organisations: Organisation[]) => {
                this.organisations = organisations;
            });
        });
    }

    private viewOrganisation(organisationId: string): void {
        this.router.navigate(["/OrganisationDetail", {id: organisationId}]);
    }

    //TODO: styling van delete button
    //TODO: uitwerking delete methode
    private deleteOrganisation(organisationId: string): void {
        alert("DELETED: " + organisationId);
    }
}