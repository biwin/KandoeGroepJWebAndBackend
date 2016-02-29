import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Inject} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {User} from "../../backend/model/user";
import {Headers, Response} from "angular2/http";
@Injectable()
export class UserService {
    private http: Http = null;
    private path: string;

    constructor(http: Http, @Inject('App.BackendPath') path: string) {
        this.path = path;
        this.http = http;
    }

    getUser(name: string, password: string): Observable<string> {
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post(this.path + 'user/login', JSON.stringify({'username': name, 'password': password}), {headers: header});
    }

    registerUser(name: string, password: string): Observable<string> {
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post(this.path + 'user/register', JSON.stringify({'username': name, 'password': password}), {headers: header});
    }
}