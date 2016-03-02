/// <reference path="../../../../typings/facebook.d.ts" />

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

                <div class="row"><div class="col s6">
                    <p style="color: #FF0000;">{{errorInfo}}</p>
                </div></div>

                <div class="row">
                    <button (click)="button='login'" type="submit" id="loginButton" class="btn waves-effect teal waves-light col s2"><p>Log in<i class="material-icons right">send</i></p></button>
                    <button (click)="button='register'" type="submit" id="registerButton" class="btn waves-effect red waves-light col s2 offset-s1"><p>Registreer<i class="material-icons right">send</i></p></button>
                </div>

                <div class="row"><div class="col s6">
                    <h3>OF</h3>
                </div></div>

                <div class="row">
                    <button (click)="facebookLogin()" id="facebookButton" class="btn waves-effect blue waves-light col s2"><p>Facebook</p></button>
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
    private button: string;
    private service: UserService;
    private errorInfo: string;

    public constructor(router: Router, service: UserService) {
        this.router = router;
        this.service = service;

    }

    getFacebookData(callback: (id: number, name: string) => any) {
        FB.api('/me', function(res) {callback(res.id, res.name)});
    }

    facebookLogin() {
        FB.login((response) => {
            if (response.authResponse) {
                this.getFacebookData((id, name) => {
                    this.service.loginUserFacebook(id, name).subscribe((token: string) => {
                        if (token != null && token != "") {
                            if (token._body == "nope") this.errorInfo = "Error";
                            else {
                                console.log(token);
                                localStorage.setItem('token', token._body);
                                this.router.navigate(['Profile']);
                            }
                        }
                    });
                });
            } else {
                alert('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'public_profile,email'})
    }

    onLoginSubmit() {
        if (this.button == "login") {
            this.service.getUser(this.usernameString, this.passwordString).subscribe((token: string) => {
                if (token != null && token != "") {
                    if (token._body == "nope") this.errorInfo = "Incorrecte login informatie";
                    else {
                        localStorage.setItem('token', token._body);
                        this.router.navigate(['Profile']);
                    }
                }
            });
        } else if (this.button == "register") {
            this.service.registerUser(this.usernameString, this.passwordString, "email", "web").subscribe((token: string) => {
                if (token != null && token != "") {
                    if (token._body == "nope") this.errorInfo = "Gebruikersnaam is reeds in gebruik";
                    else {
                        localStorage.setItem('token', token._body);
                        this.router.navigate(['Profile']);
                    }
                }
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