import {Injectable, Inject} from "angular2/core";
import {Observable} from "rxjs/Observable";

import {HttpWrapperService} from "./httpWrapperService";

import {Snapshot} from "../../backend/model/snapshot";

/**
 * Class that is responsible for a link between the frontend and the backend for snapshots.
 * Uses the snapshot routes in the server.js file
 */
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

    getById(snapshotId:string){
        return this.http.get(this.path + 'snapshots/' + snapshotId, false,true,true)
    }
}