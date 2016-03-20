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
                    <td><i *ngIf="isAdmin() || isCurrentUser(member._id)" (click)="deleteUser(member, false)" class="material-icons red-text clickable" title="Verwijder {{member._name}}">delete_forever</i></td>
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
    private doDeleteGrp: boolean = false;

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
        if(group._memberIds.length != 0) {
            groupService.getMembersOfGroupById(groupId).subscribe((members: User[]) => {
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

    //TODO: styling van addMember button
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
                    
                    this.addMemberToArray(userId);
                } else {
                    Materialize.toast("Lid toevoegen mislukt.", 3000, 'rounded');
                }
            }, (err: any) => {
                Materialize.toast("Lid toevoegen mislukt.", 3000, 'rounded');
            });
        }
    }

    private addMemberToArray(userId: string): void {
        this.group._memberIds.push(userId);
        this.membersLoading = true;
        
        this.loadMembers();
    }
}