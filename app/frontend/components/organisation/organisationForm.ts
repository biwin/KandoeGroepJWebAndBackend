import {Component} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";
import {Router} from "angular2/router";

import {OrganisationService} from "../../services/organisationService";

import {Organisation} from "../../../backend/model/organisation";

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
    service: OrganisationService;
    organisation: Organisation = Organisation.empty();

    constructor(router: Router, service: OrganisationService) {
        this.router = router;
        this.service = service;
    }

    private OnSubmit(){
        //TODO: set correct userID
        this.organisation._organisatorIds.push("CURRENT_USER_ID");

        this.service.createOrganisation(this.organisation).subscribe((o: Organisation) => {
            this.router.navigate(["/OrganisationDetail", {id: o._id}]);
        });
    }
}