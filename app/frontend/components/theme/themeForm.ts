import {Component} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";
import {Router, RouteParams} from "angular2/router";

import {ThemeService} from "../../services/themeService";
import {UserService} from "../../services/userService";

import {TagInput} from "../general/tagInput";

import {Theme} from "../../../backend/model/theme";
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

                <div class="row">
                <div class="input-field col s3">
                    <select class="browser-default" [(ngModel)]="theme._organisationId" id="organisation">
                        <option value="">Prive</option>
                        <option *ngFor="#organisation of _organisations" value="{{organisation._id}}">{{organisation._name}}</option>
                    </select>
                </div>

                <div class="input-field col s3">
                    <select class="browser-default" [(ngModel)]="_parentId" id="parentTheme">
                        <option value="" disabled>Subthema van</option>
                        <option value="">Geen</option>
                        <option *ngFor="#theme of _themes" value="{{theme._id}}">{{theme._name}}</option>
                    </select>
                </div>
                </div>

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
    private router: Router;
    private themeService: ThemeService;
    private userService: UserService;
    private theme: Theme = Theme.empty();
    private _organisations: Organisation[];
    private _themes: Theme[] = [];
    private _parentId: string = "";

    constructor(router: Router, routeParam: RouteParams, themeService: ThemeService, userService: UserService) {
        this.router = router;
        this.themeService = themeService;
        this.userService = userService;

        if(routeParam.params["organisationId"]) {
            this.theme._organisationId = routeParam.params["organisationId"];
        } else {
            this.theme._organisationId = "";
        }

        userService.getAllOrganisationsOfCurrentUser().subscribe((organisations: Organisation[]) => {
            this._organisations = organisations;
        });

        themeService.getAll().subscribe((themes: Theme[])=>{
           this._themes = themes;
        });
    }

    private OnSubmit() {
        if(this._parentId != "") {
            this.themeService.createSubTheme(this.theme, this._parentId).subscribe(() => {
                this.router.navigate(['ThemeOverview']);
            });
        } else {
            this.themeService.create(this.theme).subscribe(() => {
                this.router.navigate(['ThemeOverview']);
            });
        }
    }
}