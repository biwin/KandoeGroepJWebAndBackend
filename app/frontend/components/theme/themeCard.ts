import {Theme} from "../../../backend/model/theme";
import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {Card} from "../../../backend/model/card";

@Component({
    selector: 'theme-card',
    template: `
    <div class="col s4">
      <div class="card hoverable m4">
        <div class="card-content">
           <span class="card-title activator">{{theme._name}}<i class="material-icons right">filter_none</i></span>
           <p class="black-text">{{theme._description}}</p>
           <br/>
           <div *ngFor="#tag of theme._tags" class="chip">{{tag}}</div>
        </div>
        <div class="card-reveal">
           <span class="card-title">{{theme._name}}<i class="material-icons right">close</i></span>
             <ul class="collection">
              <li class="collection-item" *ngFor="#card of cards">{{card._name}}</li>
              <li class="collection-item center red"><i class="material-icons white-text">add_to_photos</i></li>
            </ul>
        </div>
      </div>
      </div>
  `
})
export class ThemeCard {
    @Input() private theme:Theme;
    private cards:Card[] = [new Card("a", "a"), new Card("b", "b"), new Card("c", "c")];
}


