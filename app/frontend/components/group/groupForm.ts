import {Component, AfterViewInit} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";
import {Router, RouteParams} from "angular2/router";

import {GroupService} from "../../services/groupService";
import {UserService} from "../../services/userService";

import {Group} from "../../../backend/model/group";
import {Organisation} from "../../../backend/model/organisation";

@Component({
    selector: 'group-form',
    template: `
    <div class="row container">
        <h5>Maak nieuwe groep aan</h5>

        <div class="card formCard"><div class="card-content">
            <form (submit)="OnSubmit()" class="col s12">
                <div class="row"><div class="input-field col s6">
                    <input [(ngModel)]="group._name" id="name" type="text">
                    <label for="name">Naam</label>
                </div></div>

                <div class="row"><div class="input-field col s12">
                    <textarea [(ngModel)]="group._description" id="description" class="materialize-textarea"></textarea>
                    <label for="description">Beschrijving</label>
                </div></div>

                <div class="row"><div class="input-field col s3">
                    <select class="browser-default" [(ngModel)]="group._organisationId" id="organisation">
                        <option value="" disabled>Organisatie</option>
                        <option *ngFor="#organisation of organisations" value="{{organisation._id}}">{{organisation._name}}</option>
                    </select>

                </div></div>

                <button type="submit" class="waves-effect waves-light btn red"><i class="material-icons center">add</i></button>
            </form>
        </div></div>
    </div>
    `,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class GroupForm implements AfterViewInit {
    router: Router;
    groupService: GroupService;
    userService: UserService;
    private group: Group = Group.empty();
    private organisations: Organisation[];

    public constructor(router: Router, routeParam: RouteParams, groupService: GroupService, userService: UserService) {
        this.router = router;
        this.groupService = groupService;
        this.userService = userService;

        if(routeParam.params["organisationId"]) {
            this.group._organisationId = routeParam.params["organisationId"];
        } else {
            this.group._organisationId = "";
        }

        var userId: string = userService.getUserId();
        userService.getAllOrganisationsOfUserById(userId).subscribe((organisations: Organisation[]) => {
            this.organisations = organisations;
        });
    }

    private OnSubmit() {
        var userId:string = this.userService.getUserId();
        this.group._memberIds.push(userId);

        this.groupService.createGroup(this.group).subscribe((g: Group) => {
            this.router.navigate(["/GroupDetail", {id: g._id}]);
        });
    }

    ngAfterViewInit(): any {
        $('select').material_select();
    }
}