import {Theme} from "../../../backend/model/theme";
import {Component} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ThemeCard} from "./themeCard";

@Component({
    selector: 'theme-overview',
    template: `
    <div class="row container">
        <theme-card *ngFor="#theme of themes" [theme]="theme">
    </theme-card></div>
    `,
    directives: [CORE_DIRECTIVES, ThemeCard]
})
export class ThemeOverview {
    private themes:Theme[] = [new Theme("Cafe's", "Cafes die we zouden kunnen bezoeken dit weekend", ["1"], ["love", "tits", "balls"]),new Theme("scholen", "scholen voor onze zoon", ["1"], ["howest", "ikleef"]), new Theme("De praat paal", "waarover gaan we nu weer praten?", ["1"])];
}


