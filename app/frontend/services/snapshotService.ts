import {Injectable} from "angular2/core";
import {HttpWrapperService} from "./httpWrapperService";
import {Observable} from "rxjs/Observable";
import {Snapshot} from "../../backend/model/snapshot";
import {Inject} from "angular2/core";

@Injectable()
export class SnapshotService {
    private http:HttpWrapperService = null;
    private path:string;

    constructor(http:HttpWrapperService, @Inject('App.BackendPath') path:string){
        this.path = path;
        this.http = http;
    }

    getAll():Observable<Snapshot[]>{
        return this.http.get(this.path + 'snapshots',  false, true, true);
    }

    createSnapshot(circleSessionId:string){
        return this.http.post(this.path + 'snapshots', JSON.stringify({_sessionId: circleSessionId}),true,true,true);
    }
}