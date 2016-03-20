import {Component} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";
import {Router} from "angular2/router";
import {OrganisationService} from "../../services/organisationService";
import {Organisation} from "../../../backend/model/organisation";
import {UserService} from "../../services/userService";
import {LoadingSpinner} from "../general/loadingSpinner";

@Component({
    selector: 'organisation-form',
    template: `
    <loading *ngIf="submitting"></loading>
    <div [hidden]="submitting" class="row container">
        <h5>Maak nieuwe organisatie aan</h5>

        <div class="card formCard"><div class="card-content">
            <p *ngIf="showError" class="error red-text">Er bestaat reeds een organisatie met de naam {{organisation._name}}. Gelieve een andere naam te kiezen.</p>
        
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
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, LoadingSpinner]
})

export class OrganisationForm {
    private submitting:boolean = false;

    private router: Router;
    private organisationService: OrganisationService;
    private userService: UserService;
    private organisation: Organisation = Organisation.empty();
    private showError: boolean = false;

    public constructor(router: Router, organisationService: OrganisationService, userService: UserService) {
        this.router = router;
        this.organisationService = organisationService;
        this.userService = userService;
    }

    private OnSubmit(){
        this.submitting = true;
        var userId: string = this.userService.getUserId();
        this.organisation._organisatorIds.push(userId);

        this.organisationService.createOrganisation(this.organisation).subscribe((o: Organisation) => {
            if(o != null) {
                this.router.navigate(["/OrganisationDetail", {id: o._id}]);
            } else {
                //FIXME: unexpected end of input
                this.showError = true;
            }
        });
    }
}