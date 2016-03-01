import {Injectable} from "angular2/core";
import {Inject} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {User} from "../../backend/model/user";
import {Headers, Response} from "angular2/http";
import {HttpWrapperService} from "./httpWrapperService";

@Injectable()
export class UserService {
    private http: HttpWrapperService = null;
    private path: string;

    constructor(http: HttpWrapperService, @Inject('App.BackendPath') path: string) {
        this.path = path;
        this.http = http;
    }

    isLoggedIn(): boolean {
        var token: string = localStorage.getItem('token');
        return token != null && token != "";
    }

    getUser(name: string, password: string): Observable<Response> {
        return this.http.post(this.path + 'user/login', JSON.stringify({'username': name, 'password': password}), true, false, true);
    }

    registerUser(name: string, password: string): Observable<Response> {
        return this.http.post(this.path + 'user/register', JSON.stringify({'username': name, 'password': password}), true, false, true);
    }
}