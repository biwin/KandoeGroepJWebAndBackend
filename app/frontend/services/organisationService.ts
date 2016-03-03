import {Injectable, Inject} from "angular2/core";
import {Http, Headers, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";

import {Organisation} from "../../backend/model/organisation";

@Injectable()
export class OrganisationService {
    private http: Http = null;
    private path: string;

    constructor(http: Http, @Inject("App.BackendPath") path: string) {
        this.path = path;
        this.http = http;
    }

    createOrganisation(organisation: Organisation): Observable<Organisation> {
        var header = new Headers();

        header.append("Content-Type", "application/json");

        return this.http.post(this.path + "organisations/", JSON.stringify(organisation), {headers: header}).map((res: Response) => res.json());
    }
}