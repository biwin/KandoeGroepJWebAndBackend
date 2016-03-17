///<reference path="../../../../typings/jquery/jquery.d.ts" />
///<reference path="../../../../typings/materialize-css/materialize-css.d.ts"/>

import {Component} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import {NgClass} from "angular2/common";

import {LoadingSpinner} from "../general/loadingSpinner";

import {OrganisationService} from "../../services/organisationService";
import {UserService} from "../../services/userService";

import {Organisation} from "../../../backend/model/organisation";
import {Group} from "../../../backend/model/group";
import {User} from "../../../backend/model/user";
import {Theme} from "../../../backend/model/theme";

@Component({
    selector: 'organisation-detail',
    template: `
    <div class="modal" id="deleteGroupModal">
        <div class="modal-content">
            <h4 class="red-text">{{groupToDelete._name}} verwijderen?</h4>
            <p>U staat op het punt {{groupToDelete._name}} volledig te verwijderen.<br />
                Bent u zeker dat u deze groep wil verwijderen uit {{organisation._name}}?"</p>
        </div>

        <div class="modal-footer">
            <a class="modal-action modal-close waves-effect waves-red btn-flat red-text" (click)="doDelete = false">Nee, ga terug</a>
            <a class="modal-action modal-close waves-effect waves-greens btn-flat green-text" (click)="doDelete = true">Ja, verwijder</a>
        </div>
    </div>

    <loading *ngIf="loading"></loading>
    
    <div class="row container" *ngIf="!loading && organisation!=null">
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
            <p># thema's: {{themes.length}}</p>
        </div></div>


        <div id="groupsHeader">
            <h5>Groepen</h5>

            <div id="groupsMenu">
                <a class="btn-floating waves-effect waves-light red" (click)="addGroup()" title="Voeg groep toe">
                    <i class="material-icons">add</i>
                </a>
            </div>
        </div>

        <div class="card" [ngClass]="{tableCard: organisation._groupIds.length!=0}"><div class="card-content">
            <table class="striped" *ngIf="organisation._groupIds.length!=0">
                <thead>
                    <tr>
                        <th style="width: 2%;"></th>
                        <th data-field="name">Naam</th>
                        <th data-field="amountOfMembers"># leden</th>
                        <th data-field="description">Beschrijving</th>
                    </tr>
                </thead>

                <tr *ngFor="#group of groups" class="clickable">
                    <td><i *ngIf="isAdmin(group)" (click)="deleteGroup(group)" class="material-icons red-text" title="Verwijder {{group._name}}">delete_forever</i></td>
                    <td (click)="viewGroup(group._id)">{{group._name}}</td>
                    <td (click)="viewGroup(group._id)">{{group._memberIds.length}}</td>
                    <td (click)="viewGroup(group._id)">{{group._description}}</td>
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

        <div class="card" [ngClass]="{tableCard: organisation._organisatorIds.length!=0}"><div class="card-content">
            <table class="striped" *ngIf="organisation._organisatorIds.length!=0">
                <thead>
                    <tr>
                        <th data-field="name">Naam</th>
                        <th data-field="email">E-mail adres</th>
                    </tr>
                </thead>

                <tr *ngFor="#admin of admins" class="clickable">
                    <td>{{admin._name}}</td>
                    <td>{{admin._email}}</td>
                </tr>
            </table>

            <p *ngIf="organisation._organisatorIds.length==0">{{organisation._name}} heeft momenteel nog geen admins.</p>
        </div></div>


        <div id="membersHeader">
            <h5>Leden</h5>

            <div id="membersMenu">
                <a class="btn-floating waves-effect waves-light red" (click)="addMember()" title="Voeg lid toe">
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

                <tr *ngFor="#member of members" class="clickable">
                    <td>{{member._name}}</td>
                    <td>{{member._email}}</td>
                </tr>
            </table>

            <p *ngIf="organisation._memberIds.length==0">{{organisation._name}} heeft momenteel nog geen leden.</p>
        </div></div>


        <div id="themesHeader">
            <h5>Thema's</h5>

            <div id="themesMenu">
                <a class="btn-floating waves-effect waves-light red" (click)="addTheme()" title="Voeg thema toe">
                    <i class="material-icons">add</i>
                </a>
            </div>
        </div>

        <div class="card" [ngClass]="{tableCard: themes.length!=0}"><div class="card-content">
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

    <div class="row container" *ngIf="!loading && organisation==null">
        <div class="card"><div class="card-content">
            <p>ONGELDIG ID</p>
        </div></div>
    </div>
    `,
    directives: [NgClass, LoadingSpinner]
})

export class OrganisationDetail {
    private router: Router;
    private organisationService: OrganisationService;
    private userService: UserService;
    private organisation: Organisation = Organisation.empty();
    private groups: Group[];
    private admins: User[];
    private members: User[];
    private themes: Theme[] = [];
    private loading: boolean = true;
    private groupToDelete: Group = Group.empty();
    private doDeleteGrp: boolean = false;

    public constructor(router: Router, routeParam: RouteParams, organisationService: OrganisationService, userService: UserService) {
        var organisationId: string = routeParam.params["id"];

        this.router = router;
        this.organisationService = organisationService;
        this.userService = userService;

        organisationService.getOrganisationById(organisationId).subscribe((organisation: Organisation) => {
            this.organisation = organisation;

            if(organisation._groupIds.length != 0) {
                organisationService.getGroupsOfOrganisationById(organisationId).subscribe((groups: Group[]) => {
                    this.groups = groups;
                });
            }

            if(organisation._organisatorIds.length != 0) {
                organisationService.getAdminsOfOrganisationById(organisationId).subscribe((admins: User[]) => {
                    this.admins = admins;
                });
            }

            if(organisation._memberIds.length != 0) {
                organisationService.getMembersOfOrganisationById(organisationId).subscribe((members: User[]) => {
                    this.members = members;
                });
            }

            organisationService.getThemesOfOrganisationById(organisationId).subscribe((themes: Theme[]) => {
                this.themes = themes;
            });
        });

        this.loading = false;
    }

    private isAdmin(): boolean {
        var userId: string = this.userService.getUserId();

        return this.organisation._organisatorIds.indexOf(userId) > -1;
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

    private deleteGroup(group: Group): void {
        this.groupToDelete = group;

        $('#deleteGroupModal').openModal({
            opacity: .75,
            complete: () => {
                this.doDeleteGroup();
            }
        });
    }

    private doDeleteGroup(): void {
        if(this.doDeleteGrp) {
            this.organisationService.deleteGroupFromOrganisationById(this.groupToDelete._id, this.groupToDelete._organisationId).subscribe((deleted: boolean) => {
                if(deleted) {
                    this.deleteGroupFromArray(this.groupToDelete._id);
                }
            });
        }
    }

    private deleteGroupFromArray(groupId: string): void {
        var index = this.groups.findIndex((group: Group) => group._id == groupId);

        this.groups.splice(index, 1);
    }

    //TODO: styling van addMember button
    //TODO: uitwerking addMember methode
    private addMember(): void {
        //this.router.navigate(["/CreateGroup", {organisationId: this.organisation._id}]);
        alert("addMember");
    }

    //TODO: styling van addTheme button
    private addTheme(): void {
        this.router.navigate(["/CreateTheme", {organisationId: this.organisation._id}]);
    }
}