import {Component} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import {NgClass, NgIf} from "angular2/common";

import {OrganisationService} from "../../services/organisationService";
import {UserService} from "../../services/userService";

import {Organisation} from "../../../backend/model/organisation";
import {Group} from "../../../backend/model/group";
import {User} from "../../../backend/model/user";

@Component({
    selector: 'organisation-detail',
    template: `
    <div class="row container" *ngIf="organisation != null">
        <div id="organisationHeader">
            <h5>{{organisation._name}}</h5>

            <div id="organisationMenu">
                <a class="btn-floating waves-effect waves-light red"(click)="edit()" title="Bewerk organisatie">
                    <i class="material-icons">mode_edit</i>
                </a>
            </div>
        </div>

        <div class="card"><div class="card-content">
            <p># groepen: {{organisation._groupIds.length}}</p>
            <p># leden: {{organisation._memberIds.length}}</p>
        </div></div>


        <div id="groupsHeader">
            <h5>Groepen</h5>

            <div id="groupsMenu">
                <a class="btn-floating waves-effect waves-light red"(click)="addGroup()" title="Voeg groep toe">
                    <i class="material-icons">add</i>
                </a>
            </div>
        </div>

        <div class="card" [ngClass]="{tableCard: organisation._groupIds.length!=0}"><div class="card-content">
            <table class="striped" *ngIf="organisation._groupIds.length!=0">
                <thead>
                    <tr>
                        <th data-field="name">Naam</th>
                        <th data-field="amountOfMembers"># leden</th>
                        <th data-field="description">Beschrijving</th>
                    </tr>
                </thead>

                <tr *ngFor="#group of groups" (click)="viewGroup(group._id)" class="clickable">
                    <td>{{group._name}}</td>
                    <td>{{group._memberIds.length}}</td>
                    <td>{{group._description}}</td>
                </tr>
            </table>

            <p *ngIf="organisation._groupIds.length==0">{{organisation._name}} heeft momenteel nog geen groepen.</p>
        </div></div>


        <div id="membersHeader">
            <h5>Leden</h5>

            <div id="membersMenu">
                <a class="btn-floating waves-effect waves-light red"(click)="addMember()" title="Voeg lid toe">
                    <i class="material-icons">add</i>
                </a>
            </div>
        </div>

        <div class="card" [ngClass]="{tableCard: organisation._memberIds.length!=0}"><div class="card-content">
            <table class="striped" *ngIf="organisation._memberIds.length!=0">
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

            <p *ngIf="organisation._memberIds.length==0">{{organisation._name}} heeft momenteel nog geen leden.</p>
        </div></div>
    </div>

    <div class="row container" *ngIf="organisation == null">
        <div class="card"><div class="card-content">
            <p>ONGELDIG ID</p>
        </div></div>
    </div>
    `,
    directives: [NgClass, NgIf]
})

export class OrganisationDetail {
    private router: Router;
    private organisation: Organisation;
    private groups: Group[];
    private members: User[];

    public constructor(router: Router, routeParam: RouteParams, organisationService: OrganisationService) {
        var organisationId: string = routeParam.params["id"];

        this.router = router;

        organisationService.getOrganisationById(organisationId).subscribe((organisation: Organisation) => {
            this.organisation = organisation;

            if(organisation._groupIds.length != 0) {
                organisationService.getGroupsOfOrganisationById(organisationId).subscribe((groups:Group[]) => {
                    this.groups = groups;
                });
            }
        });
    }

    //TODO: styling van edit button
    //TODO: uitwerking edit methode
    private edit(): void {
        //this.router.navigate(["/EditOrganisation", {id: this.organisation._id}]);
        alert("Edit");
    }

    //TODO: styling van addGroup button
    private addGroup(): void {
        //this.router.navigate(["/CreateGroup", {organisationId: this.organisation._id}]);
        this.router.navigate(["/CreateGroup", {organisationId: "Albert Hein"}]);
    }

    private viewGroup(groupId: string): void {
        //this.router.navigate(["/GroupDetail", {id: groupId}]);
        this.router.navigate(["/GroupDetail", {id: 0}]);
    }

    //TODO: styling van addMember button
    //TODO: uitwerking addMember methode
    private addMember(): void {
        //this.router.navigate(["/CreateGroup", {organisationId: this.organisation._id}]);
        alert("addMember");
    }

    //TODO: uitwerking viewMember methode
    private viewMember(userId: string): void {
        //this.router.navigate(["/UserDetail", {id: userId}]);
        alert("viewMember: " + userId);
    }
}