import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {AfterViewInit} from "angular2/core";
import {Group} from "../../../backend/model/group";
import {Theme} from "../../../backend/model/theme";
import {CircleSession} from "../../../backend/model/circleSession";
import {CORE_DIRECTIVES} from "angular2/common";
import {FORM_DIRECTIVES} from "angular2/common";
import {CircleSessionService} from "../../services/circleSessionService";
import {Router} from "angular2/router";


@Component({
    selector: 'circlesession-form',
    template: `
    <div class="row container">
    <h5>Nieuw Spel</h5>

    <div class="card formCard"><div class="card-content">
        <form (submit)="OnSubmit()" class="col s12">
      <div class="row">
        <div class="input-field col s3">
            <select>
              <option value="" disabled selected>Groep</option>
              <option *ngFor="#group of _groups" value="{{group._id}}">{{group._name}}</option>
            </select>
            <label>Groep</label>
        </div>
        <div class="input-field col s3">
            <select>
              <option value="" disabled selected>Thema</option>
              <option *ngFor="#theme of _themes" value="{{theme._id}}">{{theme._name}}</option>
            </select>
            <label>Thema</label>
        </div>

      </div>

      <div class="divider"></div>

    <div class="row margin-top">
    <div class="col s5">
        <input type="checkbox" id="realtime" />
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
         <input [(ngModel)]="circleSession._startDate" type="date" class="datepicker" id="startDate">
    </div>
     <div class="input-field col s3">
          <input id="time" type="text" class="validate">
          <label for="time">Beginuur</label>
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
    //TODO: bind the complete form
    circleSession:CircleSession = CircleSession.empty();
    service:CircleSessionService;
    router:Router;

    private _groups: Group[] = [
        new Group("Groep A","", "", [""]),
        new Group("Groep B", "", "",[""]),
        new Group("Groep C", "", "",[""])
    ];
    private _themes: Theme[] = [
        new Theme("Cafe's", "Cafes die we zouden kunnen bezoeken dit weekend", ["1"], ["love", "tits", "balls"]),
        new Theme("scholen", "scholen voor onze zoon", ["1"], ["howest", "ikleef"]),
        new Theme("De praat paal", "waarover gaan we nu weer praten?", ["1"])
    ];



    ngAfterViewInit():any {
        $('select').material_select();

        $('.datepicker').pickadate({
            monthsFull: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
            today: 'Vandaag',
            clear:'Leeg',
            close: 'Sluit',
            selectMonths: true,
            selectYears: 2
        });
        $('#realtime').change( ()=>  {
            $('#durationbox').toggleClass('hide');
        })
    }

    constructor(service:CircleSessionService, router:Router) {
        this.service = service;
        this.router = router;
    }

    private OnSubmit(){
        this.circleSession._creatorId = "CURRENT_USER_ID";

        this.service.create(this.circleSession).subscribe((c:CircleSession) =>{
            console.log(c + " created")
        })
    }
}


