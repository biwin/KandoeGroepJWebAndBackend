import {Injectable, Inject} from "angular2/core";
import {Observable} from "rxjs/Observable";

import {HttpWrapperService} from "./httpWrapperService";

import {User} from "../../backend/model/user";
import {Group} from "../../backend/model/group";
import {Organisation} from "../../backend/model/organisation";

/**
 * Class that is responsible for a link between the frontend and the backend for groups.
 * Uses the group routes in the server.js file
 */
@Injectable()
export class GroupService {
    private http: HttpWrapperService = null;
    private path: string;

    constructor(http: HttpWrapperService, @Inject("App.BackendPath") path: string) {
        this.path = path;
        this.http = http;
    }

    createGroup(group: Group): Observable<Group> {
        return this.http.post(this.path + "groups/", JSON.stringify(group), true, true, true);
    }

    getGroupById(groupId: string): Observable<Group> {
        return this.http.get(this.path + "groups/" + groupId, false, true, true);
    }

    deleteGroupById(organisationId: string): Observable<boolean> {
        return this.http.delete(this.path + "groups/" + organisationId, false, false, true);
    }

    addMemberByEmailToGroupById(newUserMail: string, organisationId: string): Observable<string> {
        return this.http.post(this.path + 'organisations/' + organisationId, JSON.stringify({'email': newUserMail, 'isAdmin': isAdmin}), true, false, true);
    }

    getMembersOfGroupById(groupId: string): Observable<User[]> {
        return this.http.get(this.path + "groups/" + groupId + "/members", false, true, true);
    }

    getOrganisationOfGroupById(groupId: string): Observable<Organisation> {
        return this.http.get(this.path + "groups/" + groupId + "/organisation", false, true, true);
    }

    deleteMemberFromGroupById(userId: string, groupId: string): Observable<boolean> {
        return this.http.delete(this.path + "groups/" + groupId + "/members/" + userId, false, false, true);
    }
}