import {Component} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";

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
    organisation: Organisation = Organisation.empty();

    private OnSubmit(){
        this.organisation._organisatorIds.push("CURRENT_USER_ID");

        //TODO: call backend
        alert(this.organisation._name + "  " + this.organisation._organisatorIds.length);
    }
}