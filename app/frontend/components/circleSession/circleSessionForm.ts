import {Component, AfterViewInit, Input} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";

import {UserService} from "../../services/userService";
import {ThemeService} from "../../services/themeService";
import {CircleSessionService} from "../../services/circleSessionService";
import {OrganisationService} from "../../services/organisationService";

import {Group} from "../../../backend/model/group";
import {Theme} from "../../../backend/model/theme";
import {TagInput} from "../general/tagInput";
import {CircleSession} from "../../../backend/model/circleSession";

@Component({
    selector: 'circlesession-form',
    template: `
    <div class="row container">
    <h5>Nieuw Spel</h5>

    <div class="card formCard"><div class="card-content">
        <form (submit)="OnSubmit()" class="col s12">
      <div class="row">
        <div class="input-field col s3">
                    <select class="browser-default" required [(ngModel)]="circleSession._groupId" id="group">
                        <option value="" disabled>Groep</option>
                        <option *ngFor="#group of _groups" value="{{group._id}}">{{group._name}}</option>
                    </select>
        </div>
       <div class="input-field col s3">
                    <select class="browser-default" required [(ngModel)]="circleSession._themeId" id="theme">
                        <option value="" disabled>Thema</option>
                        <option *ngFor="#theme of _themes" value="{{theme._id}}">{{theme._name}}</option>
                    </select>
        </div>
      </div>

      <div class="divider"></div>

    <div class="row margin-top">
    <div class="col s5">
        <input [(ngModel)]="circleSession._realTime" type="checkbox" id="realtime" />
        <label for="realtime">Realtime</label>
     </div>
    </div>

    <div class="row" id="durationbox">
     <div class="input-field col s3">
          <input [(ngModel)]="circleSession._turnTimeMin" id="duration" type="number" min="0" class="validate">
          <label for="duration">Beurt duur</label>
     </div>
    </div>

    <div class="divider"></div>

    <div class="row">
    <div class="col input-field s3">
         <label for="startDate">Start datum</label>
         <input type="date" required class="datepicker" id="startDate">
    </div>
     <div class="input-field col s3">
          <input id="time" required placeholder="Beginuur" type="time" title="Gebruik een geldig 24h tijdformaat." class="validate active">
     </div>
    </div>

          <div class="divider"></div>

    <h6>Optionele intellingen</h6>

    <div class="row margin-top">
    <div class="col s5">
        <input type="checkbox" checked id="endpoint" />
        <label for="endpoint">Onbeperkt spel</label>
     </div>
    </div>

    <div class="row hide" id="turnbox">
     <div class="input-field col s3">
          <input [(ngModel)]="circleSession._endPoint" id="duration" type="number" min="0" class="validate">
          <label for="turns">Aantal rondes</label>
     </div>
    </div>

    <div class="row margin-top">
    <div class="col s5">
        <input [(ngModel)]="circleSession._allowComment" type="checkbox" id="allowcomment"/>
        <label for="allowcomment">Spelers kunnen commentaar geven op kaarten</label>
     </div>
    </div>

    <div class="row">
        <tags [title]="'Voeg extra spelers toe met hun e-mailadres (splits met een puntkomma)'" [tagArray]="emailadresses"></tags>
    </div>

      <button type="submit" class="waves-effect waves-light btn red"><i class="material-icons center">add</i></button>
    </form>
    </div></div>
  </div>
    `,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, TagInput]
})
export class CircleSessionForm implements AfterViewInit {
    circleSession:CircleSession = CircleSession.empty();
    emailadresses:string[] = [];
    service:CircleSessionService;
    router:Router;


    private _currentUserId:string;
    private _groups:Group[] = [];
    private _themes:Theme[] = [];

    ngAfterViewInit():any {
        $('select').material_select();

        $('.datepicker').pickadate({
            monthsFull: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
            weekdaysFull: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
            weekdaysShort: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
            today: 'Vandaag',
            clear: 'Leeg',
            close: 'Ok',
            closeOnSelect:true,
            selectMonths: true,
            selectYears: 2,
            format: 'yyyy-mm-dd',
            min: Date.now()
        });

        $('#realtime').change(()=> {
            $('#durationbox').toggleClass('hide');
        });

        $('#endpoint').change(()=> {
            $('#turnbox').toggleClass('hide');
        });
    }

    constructor(service:CircleSessionService, themeService:ThemeService, organisationService:OrganisationService, userService:UserService, router:Router, routeParam:RouteParams) {
        this.service = service;
        this.router = router;
        this._currentUserId = userService.getUserId();
        var organisationId = routeParam.params["organisationId"];

        if (organisationId == null) {
            userService.getAllGroupsOfUser(this._currentUserId).subscribe((grs:Group[]) => {
                this._groups = grs;
            });
        } else {
            organisationService.getGroupsOfOrganisationById(organisationId).subscribe((grs:Group[]) => {
                this._groups = grs;
            });
        }

        themeService.getAll().subscribe((ts:Theme[]) => {
            this._themes = ts;
        });
    }

    private OnSubmit() {
        this.circleSession._creatorId = this._currentUserId;

        if (this.circleSession._realTime)
            this.circleSession._turnTimeMin = null;

        this.circleSession._startDate = $('#startDate').val() + ' ' + $('#time').val();


        this.service.create(this.circleSession, this.emailadresses).subscribe((c:CircleSession) => {
            this.router.navigate(['CircleSessionOverview']);
        });
    }
}


