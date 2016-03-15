///<reference path="../../../../typings/jquery/jquery.d.ts" />
///<reference path="../../../../typings/materialize-css/materialize-css.d.ts"/>

import {Theme} from "../../../backend/model/theme";
import {Component, Input, AfterViewInit, EventEmitter} from "angular2/core";
import {Card} from "../../../backend/model/card";
import {ThemeService} from "../../services/themeService";
import {Output} from "angular2/core";
import {OnInit} from "angular2/core";

@Component({
    selector: 'theme-card',
    template: `

    <div class="col s4">
      <div class="modal" id="{{'m' + theme._id}}">
        <div class="modal-content">
            <h4>Kaart verwijderen?</h4>
            <p>Bent u zeker dat u deze kaart wil verwijderen van dit thema?</p>
        </div>
        <div class="modal-footer">
            <a class="modal-action modal-close waves-effect waves-green btn-flat" (click)="doDelete = false">Nee, ga terug</a>
            <a class="modal-action modal-close waves-effect waves-red btn-flat" (click)="doDelete = true">Ja, verwijder</a>
        </div>
      </div>


      <div class="card hoverable small">
          <div class="card-action">
                <a (click)="deleteTheme()" class="red-text clickable"><i class="material-icons">delete</i></a>
          </div>

          <div class="card-content scrollable">
           <span class="card-title activator">{{theme._name}}<i class="material-icons right">filter_none</i></span>

           <p class="black-text">{{theme._description}}</p>
           <br/>

           <div *ngIf="subThemeNames.length > 0">
             <p class="black-text">Subthema's:</p>
             <ul class="collection">
                <li *ngFor="#subThemeName of subThemeNames" class="collection-item">{{subThemeName}}</li>
             </ul>
           </div>

           <br/>
           <div *ngFor="#tag of theme._tags" class="chip">{{tag}}</div>
        </div>

        <div class="card-reveal">
           <span class="card-title">{{theme._name}}<i class="material-icons right">close</i></span>
           <h5>Kaartjes</h5>
           <div>
               <p *ngIf="cards.length == 0">Nog geen kaartjes...</p>
               <ul class="collection" *ngIf="cards.length > 0">
                  <li class="collection-item" *ngFor="#card of cards"><i class="material-icons red-text clickable" (click)="deleteCard(card._id)">delete</i> {{card._name}}</li>
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

export class ThemeCard implements OnInit {
    @Input() private theme:Theme;
    @Output() onDelete:EventEmitter<string> = new EventEmitter();
    private cards:Card[] = [];
    private subThemeNames:string[] = [];
    private doDelete:boolean = false;
    private cardsLoaded:boolean = false;

    private service:ThemeService;

    constructor(themeService:ThemeService) {
        this.service = themeService;
    }

    addCard(input) {
        if (input.value.trim().length > 0) {
            this.service.createCard(input.value.trim(), this.theme._id).subscribe((c:Card) => {
                this.cards.push(c);
                input.value = "";
            });
        }
    }

    ngOnInit() {
        if (this.theme != undefined && !this.cardsLoaded) {
            this.service.getCards(this.theme._id).subscribe((c:Card[]) => {
                c.forEach((card:Card) => this.cards.push(card));
                this.cardsLoaded = true;
            });

            this.theme._subThemes.forEach((themeId:string) =>{
               this.service.getTheme(themeId).subscribe((theme:Theme) =>{
                   this.subThemeNames.push(theme._name);
                   console.log(this.subThemeNames);
               });
            });
        }
    }

    private deleteCard(cId:string) {
        $('#m' + this.theme._id).openModal({
            opacity: .75,
            complete: () => {
                if (this.doDelete) {
                    this.service.unlinkCard(this.theme._id, cId).subscribe((b:boolean) => {
                        if (b) {
                            Materialize.toast('Kaart verwijderd.', 3000, 'rounded');
                            this.removeCardFromArray(cId);
                        } else {
                            Materialize.toast('Verwijderen kaart mislukt.', 3000, 'rounded');
                        }
                        this.doDelete = false;
                    }, (err:any) => {
                        Materialize.toast('Verwijderen kaart mislukt.', 3000, 'rounded');
                        console.warn('Delete card failed, card not found');
                    });
                }
            }
        });
    }

    private removeCardFromArray(id:string) {
        var i = this.cards.findIndex((c:Card) => c._id == id);
        this.cards.splice(i, 1);
    }

    private deleteTheme() {
        this.onDelete.emit(this.theme._id);
    }
}


