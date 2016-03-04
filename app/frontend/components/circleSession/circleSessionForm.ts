import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {FORM_DIRECTIVES} from "angular2/common";
import {AfterViewInit} from "angular2/core";

import {Group} from "../../../backend/model/group";
import {Theme} from "../../../backend/model/theme";
import {CircleSession} from "../../../backend/model/circleSession";

import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";

import {ThemeService} from "../../services/themeService";
import {CircleSessionService} from "../../services/circleSessionService";
import {OrganisationService} from "../../services/organisationService";
import {UserService} from "../../services/userService";

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
          <input id="time" required type="text" class="validate">
          <label for="time">Beginuur</label>
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

      <button type="submit" class="waves-effect waves-light btn red"><i class="material-icons center">add</i></button>
    </form>
    </div></div>
  </div>
    `,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class CircleSessionForm implements AfterViewInit {
    circleSession:CircleSession = CircleSession.empty();
    service:CircleSessionService;
    router:Router;


    private _userId:string;
    private _groups: Group[] = [];
    private _themes: Theme[] = [];

    ngAfterViewInit():any {
        $('select').material_select();

        $('.datepicker').pickadate({
            monthsFull: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
            today: 'Vandaag',
            clear:'Leeg',
            close: 'Sluit',
            selectMonths: true,
            selectYears: 2,
            format: 'dd/mm/yyyy',
            min: Date.now()
        });

        $('#realtime').change( ()=>  {
            $('#durationbox').toggleClass('hide');
        });

        $('#endpoint').change( ()=>  {
            $('#turnbox').toggleClass('hide');
        });
    }

    constructor(service:CircleSessionService, themeService:ThemeService, organisationService:OrganisationService, userService:UserService, router:Router, routeParam:RouteParams) {
        this.service = service;
        this.router = router;
        userService.getUserId((u:string) => {
            this._userId = u;
            var organisationId = routeParam.params["organisationId"];

            if(organisationId == null){
                userService.getAllGroupsOfUser(this._userId).subscribe((grs:Group[]) => {
                    this._groups = grs;
                });
            }else{
                organisationService.getGroupsOfOrganisationById(organisationId).subscribe((grs:Group[]) => {
                    this._groups = grs;
                });
            }
        });


        themeService.getAll().subscribe((ts:Theme[]) =>{
            this._themes = ts;
        });
    }

    private OnSubmit(){
        this.circleSession._creatorId = this._userId;

        if(this.circleSession._realTime)
            this.circleSession._turnTimeMin = null;

        this.circleSession._startDate = $('#startDate').val() + ' ' + $('#time').val();

        this.service.create(this.circleSession).subscribe((c:CircleSession) =>{
            this.router.navigate(['CircleSessionOverview']);
        });
    }
}


