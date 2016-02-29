import {Theme} from "../../../backend/model/theme";
import {Component, Input, AfterViewInit} from "angular2/core";
import {Card} from "../../../backend/model/card";
import {ThemeService} from "../../services/themeService";

@Component({
    selector: 'theme-card',
    template: `
    <div class="col s4">
      <div class="card hoverable">
        <div class="card-content">
           <span class="card-title activator">{{theme._name}}<i class="material-icons right">filter_none</i></span>
           <p class="black-text">{{theme._description}}</p>
           <br/>
           <div *ngFor="#tag of theme._tags" class="chip">{{tag}}</div>
        </div>
        <div class="card-reveal">
           <span class="card-title">{{theme._name}}<i class="material-icons right">close</i></span>
           <h5>Kaartjes</h5>
           <div class="container">
               <p *ngIf="cards.length == 0">Nog geen kaartjes...</p>
               <ul class="collection" *ngIf="cards.length > 0">
                  <li class="collection-item" *ngFor="#card of cards">{{card._name}}</li>
                </ul>

            <div class="row">
                <div class="col s8 input-field">
                    <label for="cardname">Nieuw</label>
                    <input #cardname type="text" id="cardname">
                </div>
                <div class="col s2 margin-top">
                    <a [class.disabled]="cardname.value.trim().length == 0" (click)="addCard(cardname)" href="#" class="btn-floating"><i class="material-icons">add</i></a>
                </div>
            </div>
           </div>
        </div>
      </div>
      </div>
  `
})
export class ThemeCard implements AfterViewInit {
    @Input() private theme:Theme;
    private cards:Card[] = [];
    private cardsLoaded:boolean = false;

    private service:ThemeService;

    constructor(themeService:ThemeService) {
        this.service = themeService;
    }

    addCard(input) {
        if(input.value.trim().length > 0) {
            this.service.createCard(input.value.trim(), this.theme._id).subscribe((c:Card) => {
                this.cards.push(c);
                input.value = "";
            });
        }
    }

    ngAfterViewInit() {
        if(this.theme != undefined && !this.cardsLoaded) {
            this.service.getCards(this.theme._id).subscribe((c:Card[]) => {
                c.forEach((card:Card) => this.cards.push(card));
                this.cardsLoaded = true;
            });
        }
    }
}


