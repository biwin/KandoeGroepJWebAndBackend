///<reference path="../../../../typings/jquery/jquery.d.ts" />
///<reference path="../../../../typings/materialize-css/materialize-css.d.ts"/>

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
        <div class="modal" id="deleteOrganisationModal">
            <div class="modal-content">
                <h4 class="red-text">{{organisationToDelete._name}} verwijderen?</h4>
                <p>{{contentText}}</p>
            </div>

            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-red btn-flat red-text" (click)="doDelete = false">Nee, ga terug</a>
                <a class="modal-action modal-close waves-effect waves-greens btn-flat green-text" (click)="doDelete = true">Ja, verwijder</a>
            </div>
        </div>

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
                        <th style="width: 2%;"></th>
                        <th data-field="name">Naam</th>
                        <th data-field="amountOfMembers"># leden</th>
                        <th style="width: 2%;" data-field="isAdmin">Admin?</th>
                    </tr>
                </thead>

                <tr *ngFor="#organisation of organisations" class="clickable">
                    <td><i class="material-icons red-text" (click)="deleteOrganisation(organisation)"  title="Verwijder {{organisation._name}}">{{isAdmin(organisation)?"delete_forever":"delete"}}</i></td>
                    <td (click)="viewOrganisation(organisation._id)">{{organisation._name}}</td>
                    <td (click)="viewOrganisation(organisation._id)">{{getAmountOfMembers(organisation)}}</td>
                    <td (click)="viewOrganisation(organisation._id)"><i *ngIf="isAdmin(organisation)" class="material-icons green-text">check</i></td>
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
    private organisationToDelete: Organisation = Organisation.empty();
    private contentText: string;
    private isLastAdmin: boolean = false;
    private doDelete: boolean = false;

    public constructor(router: Router, organisationService: OrganisationService, userService: UserService) {
        this.router = router;
        this.organisationService = organisationService;
        this.userService = userService;

        userService.getAllOrganisationsOfCurrentUser().subscribe((organisations: Organisation[]) => {
            this.organisations = organisations;
        });
    }

    private getAmountOfMembers(organisation: Organisation): number {
        return organisation._organisatorIds.length + organisation._memberIds.length;
    }

    private isAdmin(organisation: Organisation): boolean {
        var userId: string = this.userService.getUserId();

        return organisation._organisatorIds.indexOf(userId) > -1;
    }

    //TODO: styling van add button
    private addOrganisation(): void {
        this.router.navigate(["/CreateOrganisation"]);
    }

    private viewOrganisation(organisationId: string): void {
        this.router.navigate(["/OrganisationDetail", {id: organisationId}]);
    }

    private deleteOrganisation(organisation: Organisation): void {
        var userId: string = this.userService.getUserId();

        this.organisationToDelete = organisation;
        this.isLastAdmin = this.organisationToDelete._organisatorIds.length==1 && this.organisationToDelete._organisatorIds[0]==userId;

        if(this.isLastAdmin) {
            this.contentText = "U staat op het punt " + this.organisationToDelete._name + " volledig te verwijderen.\n" +
                "Bent u zeker dat u alle groepen, thema's en sessies van deze organisatie wil verwijderen?";
        } else {
            this.contentText = "U staat op het punt uzelf uit {{organisationToDelete._name}} te verwijderen.\n" +
                "Bent u zeker dat u zichzelf uit deze organisatie wil verwijderen?";
        }

        $('#deleteOrganisationModal').openModal({
            opacity: .75,
            complete: () => {
                this.doDeleteOrganisation(userId);
            }
        });
    }

    private doDeleteOrganisation(userId: string): void {
        if(this.doDelete) {
            if(this.isLastAdmin) {
                this.organisationService.deleteOrganisationById(this.organisationToDelete._id).subscribe((deleted: boolean) => {
                    if(deleted) {
                        this.deleteOrganisationFromArray(this.organisationToDelete._id);
                    }
                });
            } else {
                this.organisationService.deleteMemberFromOrganisationById(userId, this.organisationToDelete._id).subscribe((deleted: boolean) => {
                    if(deleted) {
                        this.deleteOrganisationFromArray(this.organisationToDelete._id);
                    }
                });
            }
        }
    }

    private deleteOrganisationFromArray(organisationId: string): void {
        var index = this.organisations.findIndex((organisation: Organisation) => organisation._id == organisationId);

        this.organisations.splice(index, 1);
    }
}