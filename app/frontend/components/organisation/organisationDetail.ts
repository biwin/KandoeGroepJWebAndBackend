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
    <div class="modal" id="deleteOrganisationModal">
        <div class="modal-content">
            <h4 class="red-text">{{organisation._name}} verwijderen?</h4>
            <p>U staat op het punt {{organisation._name}} volledig te verwijderen.<br />
                Bent u zeker dat u alle groepen, thema's en sessies van deze organisatie wil verwijderen?</p>
        </div>

        <div class="modal-footer">
            <a class="modal-action modal-close waves-effect waves-red btn-flat red-text" (click)="doDeleteOrg = false">Nee, ga terug</a>
            <a class="modal-action modal-close waves-effect waves-greens btn-flat green-text" (click)="doDeleteOrg = true">Ja, verwijder</a>
        </div>
    </div>
    <div class="modal" id="deleteGroupModal">
        <div class="modal-content">
            <h4 class="red-text">{{groupToDelete._name}} verwijderen?</h4>
            <p>U staat op het punt {{groupToDelete._name}} volledig te verwijderen.<br />
                Bent u zeker dat u deze groep wil verwijderen uit {{organisation._name}}?"</p>
        </div>

        <div class="modal-footer">
            <a class="modal-action modal-close waves-effect waves-red btn-flat red-text" (click)="doDeleteGrp = false">Nee, ga terug</a>
            <a class="modal-action modal-close waves-effect waves-greens btn-flat green-text" (click)="doDeleteGrp = true">Ja, verwijder</a>
        </div>
    </div>
    <div class="modal" id="deleteUserModal">
        <div class="modal-content">
            <h4 class="red-text">{{userToDelete._name}} verwijderen?</h4>
            <p>{{contentText}}</p>
        </div>

        <div class="modal-footer">
            <a class="modal-action modal-close waves-effect waves-red btn-flat red-text" (click)="doDeleteUsr = false">Nee, ga terug</a>
            <a class="modal-action modal-close waves-effect waves-greens btn-flat green-text" (click)="doDeleteUsr = true">Ja, verwijder</a>
        </div>
    </div>
    <div class="modal" id="deleteThemeModal">
        <div class="modal-content">
            <h4 class="red-text">{{themeToDelete._name}} verwijderen?</h4>
            <p>U staat op het punt {{themeToDelete._name}} uit {{organisation._name}} te verwijderen.<br />
                Bent u zeker dat u dit thema uit deze  organisatie wil verwijderen?"</p>
        </div>

        <div class="modal-footer">
            <a class="modal-action modal-close waves-effect waves-red btn-flat red-text" (click)="doDeleteThm = false">Nee, ga terug</a>
            <a class="modal-action modal-close waves-effect waves-greens btn-flat green-text" (click)="doDeleteThm = true">Ja, verwijder</a>
        </div>
    </div>

    <loading *ngIf="organisationLoading"></loading>
    
    <div class="row container" *ngIf="!organisationLoading && organisation!=null">
        <div id="organisationHeader">
            <h5>{{organisation._name}}</h5>

            <div id="organisationMenu">
                <a *ngIf="isAdmin()" class="btn-floating waves-effect waves-light red" (click)="delete()" title="Verwijder {{organisation._name}}">
                    <i class="material-icons">delete_forever</i>
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
        <loading *ngIf="groupsLoading"></loading>
        <div class="card" *ngIf="!groupsLoading" [ngClass]="{tableCard: organisation._groupIds.length!=0}"><div class="card-content">
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
                    <td><i *ngIf="isAdmin()" (click)="deleteGroup(group)" class="material-icons red-text" title="Verwijder {{group._name}}">delete_forever</i></td>
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
                <a class="btn-floating waves-effect waves-light red" (click)="addMember(true)" title="Voeg admin toe">
                    <i class="material-icons">add</i>
                </a>
            </div>
        </div>
        <loading *ngIf="adminsLoading"></loading>
        <div class="card" *ngIf="!adminsLoading" [ngClass]="{tableCard: organisation._organisatorIds.length!=0}"><div class="card-content">
            <table class="striped" *ngIf="organisation._organisatorIds.length!=0">
                <thead>
                    <tr>
                        <th style="width: 2%;"></th>
                        <th data-field="name">Naam</th>
                        <th data-field="email">E-mail adres</th>
                    </tr>
                </thead>

                <tr *ngFor="#admin of admins" class="clickable">
                    <td><i *ngIf="isCurrentUser(admin._id)" (click)="deleteUser(admin, true)" class="material-icons red-text" title="Verwijder {{admin._name}}">delete_forever</i></td>
                    <td>{{admin._name}}</td>
                    <td>{{admin._email}}</td>
                </tr>
            </table>

            <p *ngIf="organisation._organisatorIds.length==0">{{organisation._name}} heeft momenteel nog geen admins.</p>
        </div></div>


        <div id="membersHeader">
            <h5>Leden</h5>

            <div id="membersMenu">
                <a class="btn-floating waves-effect waves-light red" (click)="addMember(false)" title="Voeg lid toe">
                    <i class="material-icons">add</i>
                </a>
            </div>
        </div>
        <loading *ngIf="membersLoading"></loading>
        <div class="card" *ngIf="!membersLoading" [ngClass]="{tableCard: organisation._memberIds.length!=0}"><div class="card-content">
            <table class="striped" *ngIf="organisation._memberIds.length!=0">
                <thead>
                    <tr>
                        <th style="width: 2%;"></th>
                        <th data-field="name">Naam</th>
                        <th data-field="email">E-mail adres</th>
                    </tr>
                </thead>

                <tr *ngFor="#member of members" class="clickable">
                    <td><i *ngIf="isAdmin() || isCurrentUser(member._id)" (click)="deleteUser(member, false)" class="material-icons red-text" title="Verwijder {{member._name}}">delete_forever</i></td>
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
        <loading *ngIf="themesLoading"></loading>
        <div class="card" *ngIf="!themesLoading" [ngClass]="{tableCard: themes.length!=0}"><div class="card-content">
            <table class="striped" *ngIf="themes.length!=0">
                <thead>
                    <tr>
                        <th style="width: 2%;"></th>
                        <th data-field="name">Naam</th>
                        <th data-field="description">Beschrijving</th>
                    </tr>
                </thead>

                <tr *ngFor="#theme of themes" class="clickable">
                    <td><i *ngIf="isAdmin()" (click)="deleteTheme(theme)" class="material-icons red-text" title="Verwijder {{theme._name}}">delete_forever</i></td>
                    <td>{{theme._name}}</td>
                    <td>{{theme._description}}</td>
                </tr>
            </table>

            <p *ngIf="themes.length==0">{{organisation._name}} heeft momenteel nog geen thema's.</p>
        </div></div>
    </div>

    <div class="row container" *ngIf="!organisationLoading && organisation==null">
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

    private organisationLoading: boolean = true;
    private groupsLoading:boolean = true;
    private adminsLoading:boolean = true;
    private membersLoading:boolean = true;
    private themesLoading:boolean = true;

    private doDeleteOrg: boolean = false;
    private groupToDelete: Group = Group.empty();
    private doDeleteGrp: boolean = false;
    private userToDelete: User = User.empty();
    private contentText: string;
    private isLastAdmin: boolean = false;
    private doDeleteUsr: boolean = false;
    private themeToDelete: Theme = Theme.empty();
    private doDeleteThm: boolean = false;

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
                    this.groupsLoading = false;
                });
            } else {
                this.groupsLoading = false;
            }

            if(organisation._organisatorIds.length != 0) {
                organisationService.getAdminsOfOrganisationById(organisationId).subscribe((admins: User[]) => {
                    this.admins = admins;
                    this.adminsLoading = false;
                });
            } else {
                this.adminsLoading = false;
            }

            if(organisation._memberIds.length != 0) {
                organisationService.getMembersOfOrganisationById(organisationId).subscribe((members: User[]) => {
                    this.members = members;
                    this.membersLoading = false;
                });
            } else {
                this.membersLoading = false;
            }

            organisationService.getThemesOfOrganisationById(organisationId).subscribe((themes: Theme[]) => {
                this.themes = themes;
                this.themesLoading = false;
            });
        });

        this.organisationLoading = false;
    }

    private isAdmin(): boolean {
        var userId: string = this.userService.getUserId();

        return this.organisation._organisatorIds.indexOf(userId) > -1;
    }

    private isCurrentUser(userId: string): boolean {
        var currentUserId: string = this.userService.getUserId();

        return currentUserId == userId;
    }

    private delete(): void {
        $('#deleteOrganisationModal').openModal({
            opacity: .75,
            complete: () => {
                this.doDeleteOrganisation();
            }
        });
    }

    private doDeleteOrganisation(): void {
        if (this.doDeleteOrg) {
            this.organisationService.deleteOrganisationById(this.organisation._id).subscribe(() => {
                this.router.navigate(["/OrganisationsOverview"]);
            });
        }
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
            this.organisationService.deleteGroupFromOrganisationById(this.groupToDelete._id, this.organisation._id).subscribe((deleted: boolean) => {
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
    private addMember(isAdmin: boolean): void {
        //this.router.navigate(["/CreateGroup", {organisationId: this.organisation._id}]);
        alert("addMember");
    }

    private deleteUser(user: User, isAdmin: boolean): void {
        this.userToDelete = user;

        this.isLastAdmin = isAdmin && this.organisation._organisatorIds.length==1;

        if(this.isLastAdmin) {
            this.contentText = "U staat op het punt " + this.organisation._name + " volledig te verwijderen.\n" +
                "Bent u zeker dat u alle groepen, thema's en sessies van deze organisatie wil verwijderen?";
        } else if (this.isCurrentUser(user._id)) {
            this.contentText = "U staat op het punt uzelf uit " + this.organisation._name + " te verwijderen.\n" +
                "Bent u zeker dat u zichzelf uit deze organisatie wil verwijderen?";
        } else {
            this.contentText = "U staat op het punt " + this.userToDelete._name + " uit " + this.organisation._name + " te verwijderen.\n" +
                "Bent u zeker dat u deze persoon wil verwijderen?";
        }

        $('#deleteUserModal').openModal({
            opacity: .75,
            complete: () => {
                this.doDeleteUser();
            }
        });
    }

    private doDeleteUser(): void {
        if(this.doDeleteUsr && !this.isLastAdmin) {
            this.organisationService.deleteMemberFromOrganisationById(this.userToDelete._id, this.organisation._id).subscribe((deleted: boolean) => {
                if(deleted) {
                    this.deleteUserFromArray(this.userToDelete._id);
                }
            });
        } else if (this.doDeleteUsr && this.isLastAdmin) {
            this.organisationService.deleteOrganisationById(this.organisation._id).subscribe(() => {
                this.router.navigate(["/OrganisationsOverview"]);
            })
        }
    }

    private deleteUserFromArray(userId: string): void {
        if(this.isAdmin()) {
            var index = this.admins.findIndex((user: User) => user._id == userId);

            this.admins.splice(index, 1);
        } else {
            var index = this.members.findIndex((user: User) => user._id == userId);

            this.members.splice(index, 1);
        }
    }

    //TODO: styling van addTheme button
    private addTheme(): void {
        this.router.navigate(["/CreateTheme", {organisationId: this.organisation._id}]);
    }

    private deleteTheme(theme: Theme): void {
        this.themeToDelete = theme;

        $('#deleteThemeModal').openModal({
            opacity: .75,
            complete: () => {
                this.doDeleteTheme();
            }
        });
    }

    private doDeleteTheme(): void {
        if(this.doDeleteThm) {
            this.organisationService.deleteThemeFromOrganisationById(this.themeToDelete._id, this.organisation._id).subscribe((deleted: boolean) => {
                if(deleted) {
                    this.deleteThemeFromArray(this.themeToDelete._id);
                }
            });
        }
    }

    private deleteThemeFromArray(themeId: string): void {
        var index = this.themes.findIndex((theme: Theme) => theme._id == themeId);

        this.themes.splice(index, 1);
    }
}