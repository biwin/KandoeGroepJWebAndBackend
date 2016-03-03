import {Injectable} from "angular2/core";
import {Inject} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {User} from "../../backend/model/user";
import {Headers, Response} from "angular2/http";
import {HttpWrapperService} from "./httpWrapperService";
import {Router} from "angular2/router";

@Injectable()
export class UserService {
    private http: HttpWrapperService = null;
    private path: string;

    constructor(private router: Router, http: HttpWrapperService, @Inject('App.BackendPath') path: string) {
        this.path = path;
        this.http = http;
    }

    isLoggedIn(): boolean {
        var token: string = localStorage.getItem('token');
        return token != null && token != "";
    }

    changeUsername(newName: string) {
        return this.http.post(this.path + 'user/change-username', JSON.stringify({'username': newName}), true, false, true);
    }

    getUser(email: string, password: string): Observable<Response> {
        return this.http.post(this.path + 'user/login', JSON.stringify({'email': email, 'password': password}), true, false, false);
    }

    registerUser(name: string, password: string, email: string, registrar: string): Observable<Response> {
        return this.http.post(this.path + 'user/register', JSON.stringify({'username': name, 'password': password, 'email': email, 'registrar': registrar}), true, false, false);
    }

    loginUserFacebook(id: number, name: string): Observable<Response> {
        return this.http.post(this.path + 'user/login-facebook', JSON.stringify({'name': name, 'facebookId': id, 'registrar': 'facebook'}), true, false, false);
    }
}