import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: 'about-card',
    template: `
    <div class="col s5">
         <div class="card">
            <div class="card-content">
                <span class="card-title">Wat is KanDoe?</span>
                <p>
                    Kandoe is een methodiek van de UAB, die een groep
                    toelaat om gezamenlijk tot een prioritering van items rond een bepaald thema te komen. Het
                    wordt bijvoorbeeld gebruikt om na te gaan wat er leeft en kan aangepakt worden in een buurt of
                    organisatie, om vertegenwoordigers te kiezen,... Het kan echter evengoed gebruikt worden om samen te bepalen naar welk café er
                    gegaan zal worden of wat het diner zal zijn voor nieuwjaar. Kortom alle levensbelangrijke
                    beslissingen kunnen met deze tool gefaciliteerd worden!
                </p><br/>
                <p>
                    Ga van start met deze online oplossing. <a [routerLink]="['OrganisationsOverview']">Word lid van een organisatie</a> of maak er één. 
                    <a [routerLink]="['ThemeOverview']">Kies een thema</a>. Nodig je vrienden uit. <a [routerLink]="['CircleSessionOverview']">En start met spelen!</a>
                </p><br/>
                <p>
                    Nieuw hier? <a [routerLink]="['Profile']">Vergeet dan ook niet je profiel aan te passen!</a>
                </p>
            </div>
        </div>
    </div>
  `,
    directives: [ROUTER_DIRECTIVES]
})
export class About {}