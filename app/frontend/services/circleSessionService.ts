import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Inject} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Response} from "angular2/http";
import {Headers} from "angular2/http";
import "rxjs/add/operator/map";
import {CircleSession} from "../../backend/model/circleSession";
import {CircleSessionCreateWrapper} from "../../backend/model/circleSessionCreateWrapper";
import {CircleSessionCardWrapper} from "../../backend/model/circleSessionCardWrapper";
import {HttpWrapperService} from "./httpWrapperService";

@Injectable()
export class CircleSessionService {
    private http:HttpWrapperService = null;
    private path:string;

    constructor(http:HttpWrapperService, @Inject('App.BackendPath') path:string) {
        this.path = path;
        this.http = http;
    }

    getAll():Observable<CircleSession[]>{
        return this.http.get(this.path + 'circlesessions', false,true,false);
    }

    create(circleSession:CircleSession, emailadresses:string[]):Observable<CircleSession>{
        var circleSessionCreateWrapper:CircleSessionCreateWrapper = CircleSessionCreateWrapper.empty();
        circleSessionCreateWrapper._circleSession = circleSession;
        circleSessionCreateWrapper._userEmailAdresses = emailadresses;
        return this.http.post(this.path + 'circlesessions', JSON.stringify(circleSessionCreateWrapper), true,true,false);
    }

    get(id:string):Observable<CircleSession>{
        return this.http.get(this.path + 'circlesessions/' + id, false,true,false);
    }

    getCircleSessionCards(circleSessionId:string):Observable<CircleSessionCardWrapper[]>{
        return this.http.get(this.path + 'circlesessions/' + circleSessionId + '/cards', false,true,false);
    }

    initCards(circlesessionId:string, selectedCards:string[]):Observable<string> {
        return this.http.post(this.path + 'circlesessions/' + circlesessionId + '/cards', JSON.stringify(selectedCards),true,true,true);
    }
}

