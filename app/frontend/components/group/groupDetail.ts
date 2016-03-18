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
            <a class="modal-action modal-close waves-effect waves-greens btn-flat green-text" (click)="doDeleteGrp = true">Ja, verwijder</a>
        </div>
    </div>
    
    <loading *ngIf="loading"></loading>
    
    <div class="row container" *ngIf="!loading && group!=null">
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


        <h5>Leden</h5>

        <div class="card" [ngClass]="{tableCard: group._memberIds.length!=0}"><div class="card-content">
            <table class="striped" *ngIf="group._memberIds.length!=0">
                <thead>
                    <tr>
                        <th data-field="name">Naam</th>
                        <th data-field="email">E-mail adres</th>
                    </tr>
                </thead>

                <tr *ngFor="#member of members">
                    <td>{{member._name}}</td>
                    <td>{{member._email}}</td>
                </tr>
            </table>

            <p *ngIf="group._memberIds.length==0">De groep "{{group._name}}" van organisatie "{{organisation._name}}" heeft momenteel nog geen leden.</p>
        </div></div>
    </div>

    <div class="row container" *ngIf="!loading && group==null">
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
    private loading: boolean = true;
    private doDeleteGrp: boolean = false;

    public constructor(router: Router, routeParam: RouteParams, groupService: GroupService, userService: UserService) {
        var groupId: string = routeParam.params["id"];

        this.router = router;
        this.groupService = groupService;
        this.userService = userService;

        groupService.getGroupById(groupId).subscribe((group: Group) => {
            this.group = group;

            if(group._memberIds.length != 0) {
                groupService.getMembersOfGroupById(groupId).subscribe((members: User[]) => {
                    this.members = members;
                });
            }

            groupService.getOrganisationOfGroupById(groupId).subscribe((organisation: Organisation) => {
                this.organisation = organisation;
            });

            this.loading = false;
        });
    }

    private isAdmin(): boolean {
        var userId: string = this.userService.getUserId();

        return this.organisation._organisatorIds.indexOf(userId) > -1;
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
}