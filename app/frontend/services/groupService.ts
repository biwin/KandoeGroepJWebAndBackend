import {Injectable, Inject} from "angular2/core";
import {Http, Headers, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";

import {Group} from "../../backend/model/group";

@Injectable()
export class GroupService {
    private http: Http = null;
    private path: string;

    constructor(http: Http, @Inject("App.BackendPath") path: string) {
        this.path = path;
        this.http = http;
    }

    createGroup(group: Group): Observable<Group> {
        var header = new Headers();

        header.append("Content-Type", "application/json");

        return this.http.post(this.path + "groups/", JSON.stringify(group), {headers: header}).map((res: Response) => res.json());
    }
}