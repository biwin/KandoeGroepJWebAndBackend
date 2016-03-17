import {Injectable, Inject} from "angular2/core";
import {Observable} from "rxjs/Observable";

import {HttpWrapperService} from "./httpWrapperService";

import {Group} from "../../backend/model/group";
import {User} from "../../backend/model/user";
import {Organisation} from "../../backend/model/organisation";

@Injectable()
export class GroupService {
    private http: HttpWrapperService = null;
    private path: string;

    constructor(http: HttpWrapperService, @Inject("App.BackendPath") path: string) {
        this.path = path;
        this.http = http;
    }

    createGroup(group: Group): Observable<Group> {
        return this.http.post(this.path + "groups/", JSON.stringify(group), true, true, false);
    }

    getGroupById(groupId: string): Observable<Group> {
        return this.http.get(this.path + "groups/" + groupId, false, true, false);
    }

    getMembersOfGroupById(groupId: string): Observable<User[]> {
        return this.http.get(this.path + "groups/" + groupId + "/members", false, true, false);
    }

    getOrganisationOfGroupById(groupId: string): Observable<Organisation> {
        return this.http.get(this.path + "groups/" + groupId + "/organisation", false, true, false);
    }
}