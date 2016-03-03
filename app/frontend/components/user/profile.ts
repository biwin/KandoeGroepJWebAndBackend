import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {UserService} from "../../services/userService";
import {NgIf} from "angular2/common";

@Component({
    selector: 'profile',
    template: `
        <div class="row container">
            <h5>Profiel</h5>
            <div class="card formCard">
                <div class="card-content">
                    <form *ngIf="service.isLoggedIn()" class="col s12" (ngSubmit)="onChangeDetailsSubmit()">
                        <div class="row"><div class="input-field col s6">
                            <input id="username" type="text" [(ngModel)]="usernameString" class="form-control validate" pattern="([a-zA-Z0-9]{4,16})" ngControl="_username" required #username="ngForm">
                            <label for="username" data-error="Oops!">Gebruikersnaam</label>
                        </div></div>

                        <div class="row">
                            <button type="submit" id="submitButton" class="btn waves-effect teal waves-light col s2"><p>Submit<i class="material-icons right">send</i></p></button>
                        </div>
                    </form>

                    <div class="row">
                        <button (click)="logout()" class="btn waves-effect waves-light col s2 red"><p>Log uit</p></button>
                    </div>
                </div>
            </div>
        </div>
    `,
    directives: [NgIf]
})

export class Profile {
    private router: Router;
    private usernameString: string;

    public constructor(router: Router, private service: UserService) {
        this.router = router;
        var token = localStorage.getItem('token');
        if (token == null || token == "") {
            this.router.navigate(['UserLogin']);
        }
    }

    onChangeDetailsSubmit() {
        this.service.changeUsername(this.usernameString).subscribe((token: string) => {
            if (token != null && token != "") {
                if (token._body == "nope") this.errorInfo = "Email is reeds in gebruik";
                else {
                    localStorage.setItem('token', token._body);
                    this.router.navigate(['Profile']);
                }
            }
        });;
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['UserLogin']);
    }
}