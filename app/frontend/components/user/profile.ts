import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {UserService} from "../../services/userService";
import {NgIf} from "angular2/common";
import Request = Express.Request;
import {Response} from "angular2/http";

@Component({
    selector: 'profile',
    template: `
        <div class="row container">
            <h5>Profiel</h5>
            <div class="card formCard">
                <div class="card-content">
                    <form *ngIf="service.isLoggedIn()" class="col s12" (ngSubmit)="onChangeDetailsSubmit()">
                        <img style="max-width: 200px; max-height: 200px;" src="{{imageSource}}" />

                        <div class="row"><div class="input-field col s6">
                            <input id="smallImageLink" [(ngModel)]="smallImageLinkString" type="text" class="form-control validate" ngControl="_smallImageLink" required #smallImageLink="ngForm">
                            <label for="smallImageLink" [class.active]="smallImageLinkString" data-error="Oops!">Naam afbeelding</label>
                        </div></div>

                        <div class="row"><div class="input-field col s6">
                            <input id="largeImageLink" [(ngModel)]="largeImageLinkString" type="text" class="form-control validate" ngControl="_largeImageLink" required #largeImageLink="ngForm">
                            <label for="largeImageLink" [class.active]="largeImageLinkString" data-error="Oops!">Profiel afbeelding</label>
                        </div></div>

                        <div class="row"><div class="input-field col s6">
                            <input id="username" [(ngModel)]="usernameString" type="text" class="form-control validate" pattern="([a-zA-Z0-9]{4,16})" ngControl="_username" required #username="ngForm">
                            <label for="username" [class.active]="usernameString" data-error="Oops!">Gebruikersnaam</label>
                        </div></div>

                        <div class="row">
                            <button type="submit" id="submitButton" class="btn waves-effect teal waves-light col s2"><p>Submit<i class="material-icons right">send</i></p></button>
                        </div>

                        <div class="row">
                            <button (click)="logout()" class="btn waves-effect waves-light col s2 red"><p>Log uit</p></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    directives: [NgIf]
})

export class Profile {
    private router: Router;
    private usernameString: string;
    private imageSource: string;
    private smallImageLinkString: string;
    private largeImageLinkString: string;

    public constructor(router: Router, private service: UserService) {
        this.router = router;
        var token = localStorage.getItem('token');
        if (token == null || token == "") {
            this.router.navigate(['UserLogin']);
        } else {
            this.usernameString = service.getUsername();
            service.getImageLinks((smallImageLink: string, largeImageLink: string) => {this.smallImageLinkString = smallImageLink; this.largeImageLinkString = largeImageLink});
            service.getUserPicture('large').subscribe((url: string) => this.imageSource = url);
        }
    }

    onChangeDetailsSubmit() {
        this.service.changeProfile(this.usernameString, this.smallImageLinkString, this.largeImageLinkString).subscribe((token: string) => {
            if (token != null) {
                if (token != "nope") {
                    localStorage.setItem('token', token);
                    this.imageSource = this.largeImageLinkString;
                    this.service.notifyProfileUpdated();
                }
            }
        });
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['UserLogin']);
        this.service.notifyLoggedOut();
    }
}