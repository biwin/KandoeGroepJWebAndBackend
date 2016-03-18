import {Injectable, Inject} from "angular2/core";
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
        return this.http.post(this.path + "organisations", JSON.stringify(organisation), true, true, true);
    }

    getOrganisationById(organisationId: string): Observable<Organisation> {
        return this.http.get(this.path + "organisations/" + organisationId, false, true, true);
    }

    deleteOrganisationById(organisationId: string): Observable<boolean> {
        return this.http.delete(this.path + "organisations/" + organisationId, false, false, true);
    }

    getAdminsOfOrganisationById(organisationId: string): Observable<User[]> {
        return this.http.get(this.path + "organisations/" + organisationId + "/admins", false, true, true);
    }

    getGroupsOfOrganisationById(organisationId: string): Observable<Group[]> {
        return this.http.get(this.path + "organisations/" + organisationId + "/groups", false, true, true);

    }

    getMembersOfOrganisationById(organisationId: string): Observable<User[]> {
        return this.http.get(this.path + "organisations/" + organisationId + "/members", false, true, true);
    }

    getThemesOfOrganisationById(organisationId: string): Observable<Theme[]> {
        return this.http.get(this.path + "organisations/" + organisationId + "/themes", false, true, true);
    }

    deleteMemberFromOrganisationById(userId: string, organisationId: string): Observable<boolean> {
        return this.http.delete(this.path + "organisations/" + organisationId + "/members/" + userId, false, false, true);
    }

    deleteGroupFromOrganisationById(groupId: string, organisationId: string): Observable<boolean> {
        return this.http.delete(this.path + "organisations/" + organisationId + "/groups/" + groupId, false, false, true);
    }

    deleteThemeFromOrganisationById(themeId: string, organisationId: string): Observable<boolean> {
        return this.http.delete(this.path + "organisations/" + organisationId + "/themes/" + themeId, false, false, true);
    }
}