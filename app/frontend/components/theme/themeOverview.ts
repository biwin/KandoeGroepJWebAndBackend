import {Theme} from "../../../backend/model/theme";
import {Component} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ThemeCard} from "./themeCard";
import {ThemeService} from "../../services/themeService";
import {Inject} from "angular2/core";

@Component({
    selector: 'theme-overview',
    template: `
        <div class="container">
            <div *ngIf="loading" class="row center margin-top">
                <div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-blue-only">
                      <div class="circle-clipper left">
                        <div class="circle"></div>
                      </div><div class="gap-patch">
                        <div class="circle"></div>
                      </div><div class="circle-clipper right">
                        <div class="circle"></div>
                      </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <theme-card *ngFor="#theme of themes" [theme]="theme">
                </theme-card>
            </div>
        </div>
    `,
    directives: [CORE_DIRECTIVES, ThemeCard]
})
export class ThemeOverview {
    private loading:boolean = true;
    private themes:Theme[] = [];

    constructor(service:ThemeService) {
        /*var a = [new Theme("Cafe's", "Cafes die we zouden kunnen bezoeken dit weekend", ["1"], ["love", "tits", "balls"]),new Theme("scholen", "scholen voor onze zoon", ["1"], ["howest", "ikleef"]), new Theme("De praat paal", "waarover gaan we nu weer praten?", ["1"])];

         a.forEach((t:Theme) => {
         service.create(t).subscribe((th:Theme) => {
         console.log(th);
         })
         });*/

        service.getAll().subscribe((themes:Theme[]) => {
            themes.forEach((t:Theme) => this.themes.push(t));
            this.loading = false;
        });
    }
}


