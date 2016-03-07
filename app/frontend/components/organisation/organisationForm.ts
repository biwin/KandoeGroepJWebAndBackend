import {Component} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";
import {Router} from "angular2/router";

import {OrganisationService} from "../../services/organisationService";

import {Organisation} from "../../../backend/model/organisation";
import {UserService} from "../../services/userService";

@Component({
    selector: 'organisation-form',
    template: `
    <div class="row container">
        <h5>Maak nieuwe organisatie aan</h5>

        <div class="card formCard"><div class="card-content">
            <form (submit)="OnSubmit()" class="col s12">
                <div class="row"><div class="input-field col s6">
                    <input [(ngModel)]="organisation._name" id="name" type="text">
                    <label for="name">Naam</label>
                </div></div>

                <button type="submit" class="waves-effect waves-light btn red"><i class="material-icons center">add</i></button>
            </form>
        </div></div>
    </div>
    `,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class OrganisationForm {
    router: Router;
    organisationService: OrganisationService;
    userService: UserService;
    organisation: Organisation = Organisation.empty();

    constructor(router: Router, organisationService: OrganisationService, userService: UserService) {
        this.router = router;
        this.organisationService = organisationService;
        this.userService = userService;
    }

    private OnSubmit(){
        this.userService.getUserId((userId: string) => {
            this.organisation._organisatorIds.push(userId);

            this.organisationService.createOrganisation(this.organisation).subscribe((o: Organisation) => {
                this.router.navigate(["/OrganisationDetail", {id: o._id}]);
            });
        });
    }
}