import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {AfterViewInit} from "angular2/core";
import {Group} from "../../../backend/model/group";
import {Theme} from "../../../backend/model/theme";


@Component({
    selector: 'circlesession-form',
    template: `
    <div class="row container">
    <h5>Nieuw Spel</h5>
    <form (submit)="OnSubmit()" class="col s12">
      <div class="row">
        <div class="input-field col s3">
            <select>
              <option value="" disabled selected>Groep</option>
              <option *ngFor="#group of _groups" value="{{group._name}}">{{group._name}}</option>
            </select>
            <label>Groep</label>
        </div>
        <div class="input-field col s3">
            <select>
              <option value="" disabled selected>Thema</option>
              <option *ngFor="#theme of _themes" value="{{theme._name}}">{{theme._name}}</option>
            </select>
            <label>Thema</label>
        </div>

      </div>
    <div class="row">
    <div class="col s5">
      <div class="switch">
        <label>
          Uitgesteld
          <input type="checkbox">
          <span class="lever"></span>
          Realtime
        </label>
      </div>
     </div>
    </div>

    <div class="row">
    <div class="col">
         <label>Start datum</label>
         <input type="date" class="datepicker">
    </div>
     <div class="input-field col s6">
          <input id="time" type="text" class="validate">
          <label for="time">Beginuur</label>
     </div>
    </div>


      <button type="submit" class="waves-effect waves-light btn red"><i class="material-icons center">add</i></button>
    </form>
  </div>
    `
})
export class CircleSessionForm implements AfterViewInit {
    private _groups:Group[] = [new Group("","Groep A",""), new Group("", "Groep B", ""), new Group("", "Groep C", "")];
    private _themes:Theme[] = [new Theme("Cafe's", "Cafes die we zouden kunnen bezoeken dit weekend", ["1"], ["love", "tits", "balls"]),new Theme("scholen", "scholen voor onze zoon", ["1"], ["howest", "ikleef"]), new Theme("De praat paal", "waarover gaan we nu weer praten?", ["1"])];

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
    }
}


