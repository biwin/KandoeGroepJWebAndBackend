import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Inject} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Response} from "angular2/http";
import {Headers} from "angular2/http";
import "rxjs/add/operator/map";
import {CircleSession} from "../../backend/model/circleSession";

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

    create(circleSession:CircleSession):Observable<CircleSession>{
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post(this.path + 'circlesessions', JSON.stringify(circleSession), {headers:header}).map((res:Response) => res.json());
    }
}

