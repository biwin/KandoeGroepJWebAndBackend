import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {User} from "../../../backend/model/user";

@Component({
    selector: 'user-login',
    template: `
    <div class="row container">
        <h5>Gebruiker log in</h5>
        <div class="card formCard"><div class="card-content">
            <form class="col s12">
                <div class="row"><div class="input-field col s6">
                    <input id="name" type="text" class="form-control validate" pattern="([a-zA-Z0-9]{4,16})" ngControl="_name" required #name="ngForm" #name>
                        <div [hidden]="name.valid || name.pristine" class="alert alert-danger">
                            Name is required
                        </div>
                    <label>Naam</label>
                </div></div>

                <div class="row"><div class="input-field col s6">
                    <input id="password" type="password" class="form-control" required>
                    <label>Wachtwoord</label>
                </div></div>

                <div class="row">
                    <button type="submit" class="btn waves-effect teal waves-light col s2"><p>Log in<i class="material-icons right">send</i></p></button>
                    <button type="submit" class="btn waves-effect red waves-light col s2 offset-s1"><p>Registreer<i class="material-icons right">send</i></p></button>
                </div>
            </form>
        </div></div>
    </div>
    `,
    directives: []
})

export class UserLogin {
    private router: Router;
    private nameValid: boolean;
    private passwordValid: boolean;

    public constructor(router: Router) {
        this.router = router;
    }

    validate(test) {
        this.nameValid = true;
        console.log(this.nameValid);
    }
}