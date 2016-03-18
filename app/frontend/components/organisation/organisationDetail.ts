import {Component} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import {NgClass} from "angular2/common";

import {OrganisationService} from "../../services/organisationService";
import {UserService} from "../../services/userService";

import {Organisation} from "../../../backend/model/organisation";
import {Group} from "../../../backend/model/group";
import {User} from "../../../backend/model/user";
import {Theme} from "../../../backend/model/theme";
import {LoadingSpinner} from "../general/loadingSpinner";

@Component({
    selector: 'organisation-detail',
    template: `
    <loading *ngIf="!organisationLoaded"></loading>

    <div class="row container" *ngIf="organisationLoaded && organisation != null">
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
            <p># admins: {{organisation._organisatorIds.length}}</p>
            <p># leden: {{organisation._memberIds.length}}</p>
        </div></div>

        <div id="groupsHeader">
            <h5>Groepen</h5>

            <div id="groupsMenu">
                <a class="btn-floating waves-effect waves-light red" (click)="addGroup()" title="Voeg groep toe">
                    <i class="material-icons">add</i>
                </a>
            </div>
        </div>
        <loading *ngIf="!groupsLoaded"></loading>
        <div class="card" *ngIf="groupsLoaded" [ngClass]="{tableCard: organisation._groupIds.length!=0}"><div class="card-content">
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

        <div id="adminsHeader">
            <h5>Admins</h5>

            <div id="adminsMenu">
                <a class="btn-floating waves-effect waves-light red" (click)="addAdmin()" title="Voeg admin toe">
                    <i class="material-icons">add</i>
                </a>
            </div>
        </div>
        <loading *ngIf="!adminsLoaded"></loading>
        <div class="card" *ngIf="adminsLoaded" [ngClass]="{tableCard: organisation._organisatorIds.length!=0}"><div class="card-content">
            <table class="striped" *ngIf="organisation._organisatorIds.length!=0">
                <thead>
                    <tr>
                        <th data-field="name">Naam</th>
                        <th data-field="email">E-mail adres</th>
                    </tr>
                </thead>

                <tr *ngFor="#admin of admins" (click)="viewMember(admin._id)" class="clickable">
                    <td>{{admin._name}}</td>
                    <td>{{admin._email}}</td>
                </tr>
            </table>

            <p *ngIf="organisation._organisatorIds.length==0">{{organisation._name}} heeft momenteel nog geen admins.</p>
        </div></div>

        <div id="themesHeader">
            <h5>Thema's</h5>

            <div id="membersMenu">
                <a class="btn-floating waves-effect waves-light red" (click)="addTheme()" title="Voeg thema toe">
                    <i class="material-icons">add</i>
                </a>
            </div>
        </div>
        <loading *ngIf="!themesLoaded"></loading>
        <div class="card" *ngIf="themesLoaded" [ngClass]="{tableCard: themes.length!=0}"><div class="card-content">
            <table class="striped" *ngIf="themes.length!=0">
                <thead>
                    <tr>
                        <th data-field="name">Naam</th>
                        <th data-field="description">Beschrijving</th>
                    </tr>
                </thead>

                <tr *ngFor="#theme of themes" (click)="viewTheme(theme._id)" class="clickable">
                    <td>{{theme._name}}</td>
                    <td>{{theme._description}}</td>
                </tr>
            </table>

            <p *ngIf="themes.length==0">{{organisation._name}} heeft momenteel nog geen thema's.</p>
        </div></div>
    </div>

    <div class="row container" *ngIf="organisationLoaded && organisation == null">
        <div class="card"><div class="card-content">
            <p>ONGELDIG ID</p>
        </div></div>
    </div>
    `,
    directives: [NgClass, LoadingSpinner]
})

export class OrganisationDetail {
    private organisationLoaded:boolean = false;
    private groupsLoaded:boolean = false;
    private adminsLoaded:boolean = false;
    private themesLoaded:boolean = false;

    private router: Router;
    private organisation: Organisation;
    private groups: Group[];
    private admins: User[];
    private members: User[];
    private themes: Theme[] = [];

    public constructor(router: Router, routeParam: RouteParams, organisationService: OrganisationService) {
        var organisationId: string = routeParam.params["id"];

        this.router = router;

        organisationService.getOrganisationById(organisationId).subscribe((organisation: Organisation) => {
            this.organisationLoaded = true;
            if(organisation._groupIds.length != 0) {
                organisationService.getGroupsOfOrganisationById(organisationId).subscribe((groups: Group[]) => {
                    this.groups = groups;
                    this.groupsLoaded = true;
                });
            }

            if(organisation._organisatorIds.length != 0) {
                organisationService.getAdminsOfOrganisationById(organisationId).subscribe((admins: User[]) => {
                    this.admins = admins;
                    this.adminsLoaded = true;
                });
            }

            if(organisation._memberIds.length != 0) {
                organisationService.getMembersOfOrganisationById(organisationId).subscribe((members: User[]) => {
                    this.members = members;
                });
            }

            organisationService.getThemesOfOrganisationById(organisationId).subscribe((themes: Theme[]) => {
                this.themes = themes;
                this.themesLoaded = true;
            });

            this.organisation = organisation;
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
        this.router.navigate(["/CreateGroup", {organisationId: this.organisation._id}]);
    }

    private viewGroup(groupId: string): void {
        this.router.navigate(["/GroupDetail", {id: groupId}]);
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

    //TODO: styling van addTheme button
    private addTheme(): void {
        this.router.navigate(["/CreateTheme", {organisationId: this.organisation._id}]);
    }
}