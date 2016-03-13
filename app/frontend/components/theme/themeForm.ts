import {Component} from "angular2/core";
import {Theme} from "../../../backend/model/theme";
import {CORE_DIRECTIVES} from "angular2/common";
import {FORM_DIRECTIVES} from "angular2/common";
import {TagInput} from "../general/tagInput";
import {ThemeService} from "../../services/themeService";
import {Router} from "angular2/router";
import {Organisation} from "../../../backend/model/organisation";

@Component({
    selector: 'theme-form',
    template: `
    <div class="row container">
        <h5>Nieuw Thema</h5>
        <div class="card formCard"><div class="card-content">
            <form (submit)="OnSubmit()" class="col s12">
                <div class="row"><div class="input-field col s6">
                    <input [(ngModel)]="theme._name" id="name" type="text">
                    <label for="name">Naam</label>
                </div></div>

                <div class="row"><div class="input-field col s12">
                    <input [(ngModel)]="theme._description" id="description" type="text">
                    <label for="description">Beschrijving</label>
                </div></div>

                <!--<div class="row"><div class="input-field col s3">
                    <select class="browser-default" [(ngModel)]="theme._organisationId" id="organisation">
                        <option value="" disabled>Prive</option>
                        <option *ngFor="#organisation of _organisations" value="{{organisation._id}}">{{organisation._name}}</option>
                    </select>
                </div></div>-->

                <div class="row">
                    <tags [title]="'Tags (splits met een puntkomma)'" [tagArray]="theme._tags"></tags>
                </div>

                <button type="submit" class="waves-effect waves-light btn red"><i class="material-icons center">add</i></button>
            </form>
        </div></div>
    </div>
    `,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, TagInput]
})

export class ThemeForm {
    private theme:Theme = Theme.empty();
    private service:ThemeService;
    private router:Router;
    private _organisations:Organisation[];

    constructor(service:ThemeService, router:Router) {
        this.service = service;
        this.router = router;
    }

    private OnSubmit(){
        this.service.create(this.theme).subscribe((t:Theme) => {
            this.router.navigate(['ThemeOverview']);
        });
    }
}