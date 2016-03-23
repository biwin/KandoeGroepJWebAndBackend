///<reference path="../../../../typings/jquery/jquery.d.ts" />
///<reference path="../../../../typings/materialize-css/materialize-css.d.ts"/>

import {Component} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import {NgClass} from "angular2/common";

import {LoadingSpinner} from "../general/loadingSpinner";

import {GroupService} from "../../services/groupService";
import {UserService} from "../../services/userService";

import {Group} from "../../../backend/model/group";
import {User} from "../../../backend/model/user";
import {Organisation} from "../../../backend/model/organisation";

@Component({
    selector: 'group-detail',
    template: `
    <div class="modal" id="addUserModal">
        <div class="modal-content">
            <h4>{{headerText}} toevoegen?</h4>
            
            <div class="input-field col s12">
                <input id="email" type="email" class="validate" [(ngModel)]="newUserEmail">
                <label for="email">Email</label>
            </div>
        </div>
        
        <div class="modal-footer">
            <a class="modal-action modal-close waves-effect waves-red btn-flat red-text" (click)="doAddMembr = false">Annuleren</a>
            <a class="modal-action modal-close waves-effect waves-green btn-flat green-text" (click)="doAddMembr = true">Toevoegen</a>
        </div>
    </div>
    <div class="modal" id="deleteMemberModal">
        <div class="modal-content">
            <h4 class="red-text">{{memberToDelete._name}} verwijderen?</h4>
            <p>{{contentText}}</p>
        </div>

        <div class="modal-footer">
            <a class="modal-action modal-close waves-effect waves-red btn-flat red-text" (click)="doDeleteMmbr = false">Nee, ga terug</a>
            <a class="modal-action modal-close waves-effect waves-greens btn-flat green-text" (click)="doDeleteMmbr = true">Ja, verwijder</a>
        </div>
    </div>
    <div class="modal" id="deleteGroupModal">
        <div class="modal-content">
            <h4 class="red-text">{{group._name}} verwijderen?</h4>
            <p>U staat op het punt {{group._name}} volledig te verwijderen.<br />
                Bent u zeker dat u deze groep wil verwijderen?</p>
        </div>

        <div class="modal-footer">
            <a class="modal-action modal-close waves-effect waves-red btn-flat red-text" (click)="doDeleteGrp = false">Nee, ga terug</a>
            <a class="modal-action modal-close waves-effect waves-green btn-flat green-text" (click)="doDeleteGrp = true">Ja, verwijder</a>
        </div>
    </div>
    
    <loading *ngIf="groupLoading"></loading>
    
    <div class="row container" *ngIf="!groupLoading && group!=null">
        <div id="organisationHeader">
            <h5>{{group._name}}</h5>

            <div id="organisationMenu">
                <a *ngIf="isAdmin()" class="btn-floating waves-effect waves-light red" (click)="delete()" title="Verwijder {{organisation._name}}">
                    <i class="material-icons">delete_forever</i>
                </a>
            </div>
        </div>

        <div class="card"><div class="card-content">
            # leden: {{group._memberIds.length}}
        </div></div>


        <div id="membersHeader">
            <h5>Leden</h5>

            <div id="membersMenu">
                <a *ngIf="isAdmin()" class="btn-floating waves-effect waves-light red" (click)="addMember()" title="Voeg lid toe">
                    <i class="material-icons">add</i>
                </a>
            </div>
        </div>
        <loading *ngIf="groupLoading"></loading>
        <div *ngIf="!groupLoading" class="card" [ngClass]="{tableCard: group._memberIds.length!=0}"><div class="card-content">
            <table class="striped" *ngIf="group._memberIds.length!=0">
                <thead>
                    <tr>
                        <th style="width: 2%;"></th>
                        <th data-field="name">Naam</th>
                        <th data-field="email">E-mail adres</th>
                    </tr>
                </thead>

                <tr *ngFor="#member of members">
                    <td><i *ngIf="isAdmin() || isCurrentUser(member._id)" (click)="deleteMember(member)" class="material-icons red-text clickable" title="Verwijder {{member._name}}">delete_forever</i></td>
                    <td>{{member._name}}</td>
                    <td>{{member._email}}</td>
                </tr>
            </table>

            <p *ngIf="group._memberIds.length==0">De groep "{{group._name}}" van organisatie "{{organisation._name}}" heeft momenteel nog geen leden.</p>
        </div></div>
    </div>

    <div class="row container" *ngIf="!groupLoading && group==null">
        <div class="card"><div class="card-content">
            <p>ONGELDIG ID</p>
        </div></div>
    </div>
    `,
    directives: [NgClass, LoadingSpinner]
})

export class GroupDetail {
    private router: Router;
    private groupService: GroupService;
    private userService: UserService;
    private group: Group = Group.empty();
    private members: User[] = [];
    private organisation: Organisation = Organisation.empty();
    private groupLoading: boolean = true;
    private membersLoading: boolean = true;

    private memberToDelete: User = User.empty();
    private newUserEmail:string = "";
    private contentText: string;
    private isLastAdmin: boolean = false;
    private doDeleteMmbr: boolean = false;
    private doDeleteGrp: boolean = false;
    private doAddMembr: boolean = false;

    public constructor(router: Router, routeParam: RouteParams, groupService: GroupService, userService: UserService) {
        var groupId: string = routeParam.params["id"];

        this.router = router;
        this.groupService = groupService;
        this.userService = userService;

        groupService.getGroupById(groupId).subscribe((group: Group) => {
            this.group = group;

            this.loadMembers();

            groupService.getOrganisationOfGroupById(groupId).subscribe((organisation: Organisation) => {
                this.organisation = organisation;
            });

            this.groupLoading = false;
        });
    }

    private loadMembers(): void {
        if(this.group._memberIds.length != 0) {
            this.groupService.getMembersOfGroupById(this.group._id).subscribe((members: User[]) => {
                this.members = members;
                this.membersLoading = false;
            });
        } else {
            this.membersLoading = false;
        }
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
        $('#deleteGroupModal').openModal({
            opacity: .75,
            complete: () => {
                this.doDeleteGroup();
            }
        });
    }

    private doDeleteGroup(): void {
        if (this.doDeleteGrp) {
            this.groupService.deleteGroupById(this.group._id).subscribe(() => {
                this.router.navigate(["/OrganisationDetails", {id: this.group._organisationId}]);
            });
        }
    }

    private addMember(): void {
        $('#addMemberModal').openModal({
            opacity: .75,
            complete: () => {
                this.doAddMember();
            }
        });
    }

    private doAddMember(): void {
        if(this.doAddMembr) {
            this.groupService.addMemberByEmailToGroupById(this.newUserEmail, this.group._id).subscribe((userId: string) => {
                if(userId != null) {
                    Materialize.toast("Lid toegevoegd.", 3000, 'rounded');
                    this.doAddMembr = false;
                    this.addMemberToArray(userId);
                } else {
                    Materialize.toast("Lid toevoegen mislukt.", 3000, 'rounded');
                    this.doAddMembr = false;
                }
            }, (err: any) => {
                Materialize.toast("Lid toevoegen mislukt.", 3000, 'rounded');
                this.doAddMembr = false;
            });
        }
    }

    private addMemberToArray(userId: string): void {
        this.group._memberIds.push(userId);
        this.membersLoading = true;
        
        this.loadMembers();
    }

    private deleteMember(user: User, isAdmin: boolean): void {
        this.memberToDelete = user;

        this.isLastAdmin = isAdmin && this.organisation._organisatorIds.length==1;

        if(this.isLastAdmin) {
            this.contentText = "U staat op het punt " + this.group._name + " volledig te verwijderen.\n" +
                "Bent u zeker dat u deze groep wil verwijderen?";
        } else if (this.isCurrentUser(user._id)) {
            this.contentText = "U staat op het punt uzelf uit " + this.group._name + " te verwijderen.\n" +
                "Bent u zeker dat u zichzelf uit deze groep wil verwijderen?";
        } else {
            this.contentText = "U staat op het punt " + this.memberToDelete._name + " uit " + this.group._name + " te verwijderen.\n" +
                "Bent u zeker dat u deze persoon wil verwijderen?";
        }

        $('#deleteMemberModal').openModal({
            opacity: .75,
            complete: () => {
                this.doDeleteMember();
            }
        });
    }

    private doDeleteMember(): void {
        if(this.doDeleteMmbr && !this.isLastAdmin) {
            this.groupService.deleteMemberFromGroupById(this.memberToDelete._id, this.group._id).subscribe((deleted: boolean) => {
                if(deleted) {
                    this.deleteMemberFromArray(this.memberToDelete._id);
                }
            });
        } else if (this.doDeleteMmbr && this.isLastAdmin) {
            this.groupService.deleteGroupById(this.group._id).subscribe(() => {
                this.router.navigate(["/OrganisationsOverview"]);
            });
        }
    }

    private deleteMemberFromArray(userId: string): void {
        if(this.isAdmin()) {
            var index = this.admins.findIndex((user: User) => user._id == userId);

            this.admins.splice(index, 1);
        } else {
            var index = this.members.findIndex((user: User) => user._id == userId);

            this.members.splice(index, 1);
        }
    }
}