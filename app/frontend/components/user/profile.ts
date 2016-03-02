import {Component} from "angular2/core";
import {Router} from "angular2/router";

@Component({
    selector: 'profile',
    template: `
        <div class="row container">
            <h5>Profiel</h5>
            <div class="card formCard">
                <div class="card-content">
                    <div class="row">
                        <button (click)="logout()" class="btn waves-effect waves-light col s2 red"><p>Log uit</p></button>
                    </div>
                </div>
            </div>
        </div>
    `,
    directives: []
})

export class Profile {
    private router: Router;

    public constructor(router: Router) {
        this.router = router;
        var token = localStorage.getItem('token');
        if (token == null || token == "") {
            this.router.navigate(['UserLogin']);
        }
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['UserLogin']);
    }
}