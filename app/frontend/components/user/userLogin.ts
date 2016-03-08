/// <reference path="../../../../typings/facebook.d.ts" />

import {Component, Output} from "angular2/core";
import {Router} from "angular2/router";
import {User} from "../../../backend/model/user";
import {UserService} from "../../services/userService";
import {NgIf} from "angular2/common";
import {CircleSessionForm} from "../circleSession/circleSessionForm";
import {Response} from "angular2/http";
import {OnChanges} from "angular2/core";

@Component({
    selector: 'user-login',
    template: `
    <div class="row container">
        <h5>Gebruiker log in</h5>
        <div class="card formCard"><div class="card-content">
            <form *ngIf="!service.isLoggedIn()" class="col s12" (ngSubmit)="onLoginSubmit()">

                <div class="row"><div class="input-field col s6">
                    <input id="email" type="email" [(ngModel)]="emailString" class="form-control validate" ngControl="_email" required #email="ngForm">
                    <label for="email" data-error="Oops!">Email</label>
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
    private passwordString: string;
    private emailString: string;
    private button: string;
    private service: UserService;
    private errorInfo: string;

    public constructor(router: Router, service: UserService) {
        this.router = router;
        this.service = service;
    }

    getFacebookStandardData(callback: (id: string, name: string, email: string, pictureSmall: string, pictureLarge: string) => any) {
        FB.api('/me?fields=email,name,picture.type(small)', function(res1) {
            FB.api('/me?fields=picture.type(large)', function(res2) {
                callback(res1.id, res1.name, res1.email, res1.picture.data.url, res2.picture.data.url);
            });
        });
    }

    facebookLogin() {
        FB.login((res) => {
            if (res.authResponse) {
                this.getFacebookStandardData((id, name, email, pictureSmall, pictureLarge) => {
                    this.service.loginUserFacebook(id, name, email, pictureSmall, pictureLarge).subscribe((token: Response) => {
                        if (token != null) {
                            if (token.text() == "nope") this.errorInfo = "Error";
                            else this.setLoggedIn(token);
                        }
                    });
                });
            } else {
                alert('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'public_profile'})
    }

    setLoggedIn(token) {
        localStorage.setItem('token', token.text());
        this.router.navigate(['Profile']);
        this.service.notifyLoggedIn();
    }

    onLoginSubmit() {
        if (this.button == "login") {
            this.service.getUser(this.emailString, this.passwordString).subscribe((token: Response) => {
                if (token != null) {
                    if (token.text() == "nope") this.errorInfo = "Incorrecte login informatie";
                    else this.setLoggedIn(token);
                }
            });
        } else if (this.button == "register") {
            this.service.registerUser("", this.passwordString, this.emailString, "web").subscribe((token: Response) => {
                if (token != null) {
                    if (token.text() == "nope") this.errorInfo = "Email is reeds in gebruik";
                    else this.setLoggedIn(token);
                }
            });
        }
    }

    onLogoutSubmit() {
        localStorage.removeItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }
}