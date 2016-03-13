import {Injectable, Inject} from "angular2/core";
import {Http, Headers, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";

import {Organisation} from "../../backend/model/organisation";
import {Group} from "../../backend/model/group";
import {User} from "../../backend/model/user";

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

    getOrganisationById(organisationId: string): Observable<Organisation> {
        var header = new Headers();

        header.append("Content-Type", "application/json");

        return this.http.get(this.path + "organisations/" + organisationId).map((res: Response) => res.json());
    }

    getGroupsOfOrganisationById(organisationId: string): Observable<Group[]> {
        var header = new Headers();

        header.append("Content-Type", "application/json");

        return this.http.get(this.path + "organisations/" + organisationId + "/groups").map((res: Response) => res.json());
    }

    getMembersOfOrganisationById(organisationId: string): Observable<User[]> {
        var header = new Headers();

        header.append("Content-Type", "application/json");

        return this.http.get(this.path + "organisations/" + organisationId + "/members").map((res: Response) => res.json());
    }
}