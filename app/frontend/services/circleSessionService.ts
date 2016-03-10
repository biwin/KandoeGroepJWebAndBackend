import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Inject} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Response} from "angular2/http";
import {Headers} from "angular2/http";
import "rxjs/add/operator/map";
import {CircleSession} from "../../backend/model/circleSession";
import {CircleSessionCreateWrapper} from "../../backend/model/circleSessionCreateWrapper";

@Injectable()
export class CircleSessionService {
    private http:Http = null;
    private path:string;

    constructor(http:Http, @Inject('App.BackendPath') path:string) {
        this.path = path;
        this.http = http;
    }

    getAll():Observable<CircleSession[]>{
        return this.http.get(this.path + 'circlesessions').map((res:Response) => res.json());
    }

    create(circleSession:CircleSession, emailadresses:string[]):Observable<CircleSession>{
        var header = new Headers();
        var circleSessionCreateWrapper:CircleSessionCreateWrapper = CircleSessionCreateWrapper.empty();
        circleSessionCreateWrapper._circleSession = circleSession;
        circleSessionCreateWrapper._userEmailAdresses = emailadresses;
        header.append('Content-Type', 'application/json');
        return this.http.post(this.path + 'circlesessions', JSON.stringify(circleSessionCreateWrapper), {headers:header}).map((res:Response) => res.json());
    }

    get(id:string):Observable<CircleSession>{
        return this.http.get(this.path + 'circlesessions/' + id).map((res:Response) => res.json());
    }
}

