import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {User} from "../../../backend/model/user";
import {UserService} from "../../services/userService";
import {NgIf} from "angular2/common";

@Component({
    selector: 'user-login',
    template: `
    <div class="row container">
        <h5>Gebruiker log in</h5>
        <div class="card formCard"><div class="card-content">
            <form *ngIf="!service.isLoggedIn()" class="col s12" (ngSubmit)="onLoginSubmit()">
                <div class="row"><div class="input-field col s6">
                    <input id="name" type="text" [(ngModel)]="usernameString" class="form-control validate" pattern="([a-zA-Z0-9]{4,16})" ngControl="_name" required #name="ngForm">
                    <label for="name" data-error="Oops!">Gebruikersnaam</label>
                </div></div>

                <div class="row"><div class="input-field col s6">
                    <input id="password" type="password" [(ngModel)]="passwordString" class="form-control validate" pattern="([a-zA-Z0-9]{4,16})" ngControl="_password" required #password="ngForm">
                    <label for="password" data-error="Oops!">Wachtwoord</label>
                </div></div>

                <div class="row">
                    <button (click)="logInPressed=true" type="submit" id="loginButton" class="btn waves-effect teal waves-light col s2"><p>Log in<i class="material-icons right">send</i></p></button>
                    <button type="submit" id="registerButton" class="btn waves-effect red waves-light col s2 offset-s1"><p>Registreer<i class="material-icons right">send</i></p></button>
                </div>
            </form>

            <form *ngIf="service.isLoggedIn()" class="col s12" (ngSubmit)="onLogoutSubmit()">
                <div class="row"><div class="input-field col s12">
                    <h2>U bent reeds ingelogd!</h2>
                    <p style="word-wrap: break-word;">Token: {{getToken()}}</p>
                </div></div>

                <div class="row">
                    <button type="submit" id="logoutButton" class="btn waves-effect teal waves-light col s2"><p>Log uit<i class="material-icons right">send</i></p></button>
                </div>
            </form>
        </div></div>
    </div>
    `,
    directives: [NgIf]
})

export class UserLogin {
    private router: Router;
    private usernameString: string;
    private passwordString: string;
    private logInPressed: boolean = false;
    private service: UserService;

    public constructor(router: Router, service: UserService) {
        this.router = router;
        this.service = service;
    }

    onLoginSubmit() {
        if (this.logInPressed) {
            this.service.getUser(this.usernameString, this.passwordString).subscribe((token: string) => {
                if (token != null && token != "" && token._body != "nope") localStorage.setItem('token', token._body);
            });
            this.logInPressed = false;
        } else {
            this.service.registerUser(this.usernameString, this.passwordString).subscribe((token: string) => {
                if (token != null && token != "" && token._body != "nope") localStorage.setItem('token', token._body);
            });
        }
    }

    onLogoutSubmit() {
        localStorage.removeItem('token');
        console.log("Removed token!");
    }

    getToken() {
        return localStorage.getItem('token');
    }
}