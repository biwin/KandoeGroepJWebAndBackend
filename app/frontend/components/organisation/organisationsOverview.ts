import {Component} from "angular2/core";
import {Router, ROUTER_DIRECTIVES} from "angular2/router";
import {NgClass} from "angular2/common";

import {OrganisationService} from "../../services/organisationService";
import {UserService} from "../../services/userService";

import {Organisation} from "../../../backend/model/organisation";

@Component({
    selector: 'organisations-overview',
    template: `
    <div class="row container">
        <div id="organisationsHeader">
            <h5>Mijn organisaties</h5>

            <div id="organisationsMenu">
                <a class="btn-floating waves-effect waves-light red" (click)="addOrganisation()" title="Voeg organisatie toe">
                    <i class="material-icons">add</i>
                </a>
            </div>
        </div>

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
                    <td><i class="material-icons red-text" (click)="deleteOrganisation(organisation)"  title="Verwijder {{organisation._name}}">delete</i></td>
                    <td (click)="viewOrganisation(organisation._id)">{{organisation._name}}</td>
                    <td (click)="viewOrganisation(organisation._id)">{{organisation._memberIds.length}}</td>
                </tr>
            </table>

            <p *ngIf="organisations.length==0">Je bent momenteel nog geen lid van een organisatie.</p>
        </div></div>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES, NgClass]
})

export class OrganisationsOverview {
    private router: Router;
    private organisationService: OrganisationService;
    private userService: UserService;
    private organisations: Organisation[] = [];

    public constructor(router: Router, organisationService: OrganisationService, userService: UserService) {
        this.router = router;
        this.organisationService = organisationService;
        this.userService = userService;

        userService.getAllOrganisationsOfCurrentUser().subscribe((organisations: Organisation[]) => {
            this.organisations = organisations;
        });
    }

    private viewOrganisation(organisationId: string): void {
        this.router.navigate(["/OrganisationDetail", {id: organisationId}]);
    }

    //TODO: styling van delete button
    private deleteOrganisation(organisation: Organisation): void {
        var userId = this.userService.getUserId();

        if(organisation._organisatorIds.length==1 && organisation._organisatorIds[0]==userId) {
            this.organisationService.deleteOrganisationById(organisation._id);
        } else {
            this.organisationService.deleteMemberFromOrganisationById(userId, organisation._id);
        }
    }
}