import {Component} from "angular2/core";
import {Theme} from "../../../backend/model/theme";
import {CORE_DIRECTIVES} from "angular2/common";
import {FORM_DIRECTIVES} from "angular2/common";
import {TagInput} from "../general/tagInput";

@Component({
    selector: 'theme-form',
    template: `
    <div class="row container">
    <h5>Create Theme</h5>
    <form (submit)="OnSubmit()" class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <input [(ngModel)]="theme._name" id="name" type="text">
          <label for="name">Naam</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input [(ngModel)]="theme._description" id="description" type="text">
          <label for="description">Beschrijving</label>
        </div>
      </div>
      <div class="row">
        <tags [title]="'Tags (end each tag with a semicolon)'" [tagArray]="theme._tags"></tags>
      </div>
      <button type="submit" class="waves-effect waves-light btn red"><i class="material-icons center">add</i></button>
    </form>
  </div>
    `,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, TagInput]
})

export class ThemeForm {
    theme:Theme = Theme.empty();
    private OnSubmit(){
        this.theme._organisatorIds = ["CURRENT_USER_ID"]
        //TODO: call backend
        alert(this.theme._name + "  " + this.theme._description);
        alert(this.theme._tags);
    }
}