import {Component} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import {NgClass} from "angular2/common";

import {GroupService} from "../../services/groupService";

import {Group} from "../../../backend/model/group";
import {User} from "../../../backend/model/user";
import {Organisation} from "../../../backend/model/organisation";

@Component({
    selector: 'group-detail',
    template: `
    <div class="row container" *ngIf="group != null">
        <h5>{{group._name}} [{{organisation._name}}]</h5>

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

                <tr *ngFor="#member of members" (click)="viewMember(member._id)" class="clickable">
                    <td>{{member._name}}</td>
                    <td>{{member._email}}</td>
                </tr>
            </table>

            <p *ngIf="group._memberIds.length==0">De groep "{{group._name}}" van organisatie "{{organisation._name}}" heeft momenteel nog geen leden.</p>
        </div></div>
    </div>

    <div class="row container" *ngIf="group == null">
        <div class="card"><div class="card-content">
            <p>ONGELDIG ID</p>
        </div></div>
    </div>
    `,
    directives: [NgClass]
})

export class GroupDetail {
    private router: Router;
    private group: Group;
    private members: User[];
    private organisation: Organisation = Organisation.empty();

    public constructor(router: Router, routeParam: RouteParams, groupService: GroupService) {
        var groupId: string = routeParam.params["id"];

        this.router = router;

        groupService.getGroupById(groupId).subscribe((group: Group) => {
            this.group = group;

            if(group._memberIds.length != 0) {
                groupService.getMembersOfGroupById(groupId).subscribe((members: User[]) => {
                    this.members = members;
                });
            }
        });
    }

    private viewMember(userId: string): void {
        //this.router.navigate(["/UserDetail", {id: userId}]);
        alert("viewMember: " + userId);
    }
}