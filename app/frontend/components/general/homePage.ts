import {Component} from "angular2/core";
import {Router} from "angular2/router";

@Component({
    selector: 'home-page',
    template: `
     <div class="row container">
            <h5>Home</h5>
            <div class="card formCard">
                <div class="card-content">
                    <div class="row">
                        <p>Am I fabulous yet?</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    directives: []
})

export class HomePage {

    public constructor(private router: Router) {

    }

}