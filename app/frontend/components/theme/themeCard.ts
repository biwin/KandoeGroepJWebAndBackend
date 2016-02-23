import {Theme} from "../../../backend/model/theme";
import {Component} from "angular2/core";
import {Input} from "angular2/core";

@Component({
    selector: 'theme-card',
    template: `
    <div class="col s4">
      <div class="card hoverable m4">
        <div class="card-content">
           <span class="card-title activator">{{theme._name}}<i class="material-icons right">info_outline</i></span>
           <p class="black-text">{{theme._description}}</p>
           <br/>
           <div *ngFor="#tag of theme._tags" class="chip">{{tag}}</div>
        </div>
        <div class="card-reveal">
           <span class="card-title">{{theme._name}}<i class="material-icons right">close</i></span>
           <div class="card-panel m12 white">
                ITEM 1
           </div>
        </div>
      </div>
      </div>
  `
})
export class ThemeCard {
    @Input() private theme:Theme;
}


