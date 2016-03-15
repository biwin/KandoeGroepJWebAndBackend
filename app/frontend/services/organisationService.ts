import {Injectable, Inject} from "angular2/core";
import {Http, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";

import {HttpWrapperService} from "./httpWrapperService";

import {Organisation} from "../../backend/model/organisation";
import {Group} from "../../backend/model/group";
import {User} from "../../backend/model/user";
import {Theme} from "../../backend/model/theme";

@Injectable()
export class OrganisationService {
    private http: HttpWrapperService = null;
    private path: string;

    constructor(http: HttpWrapperService, @Inject("App.BackendPath") path: string) {
        this.path = path;
        this.http = http;
    }

    createOrganisation(organisation: Organisation): Observable<Organisation> {
        return this.http.post(this.path + "organisations", JSON.stringify(organisation), true, true, false);
    }

    getOrganisationById(organisationId: string): Observable<Organisation> {
        return this.http.get(this.path + "organisations/" + organisationId, false, true, false);
    }

    getAdminsOfOrganisationById(organisationId: string): Observable<User[]> {
        return this.http.get(this.path + "organisations/" + organisationId + "/admins", false, true, false);
    }

    getGroupsOfOrganisationById(organisationId: string): Observable<Group[]> {
        return this.http.get(this.path + "organisations/" + organisationId + "/groups", false, true, false);

    }

    getMembersOfOrganisationById(organisationId: string): Observable<User[]> {
        return this.http.get(this.path + "organisations/" + organisationId + "/members", false, true, false);
    }

    getThemesOfOrganisationById(organisationId: string): Observable<Theme[]> {
        return this.http.get(this.path + "organisations/" + organisationId + "/themes", false, true, false);
    }

    deleteMemberFromOrganisationById(userId: string, organisationId: string) {
        return this.http.delete(this.path + "organisations/" + organisationId + "/members/" + userId, false, false, false);
    }
}