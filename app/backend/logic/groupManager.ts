import {GroupDao} from "../dao/groupDao";

import {Group} from "../model/group";

export class GroupManager {
    private _dao: GroupDao;

    constructor() {
        this._dao = new GroupDao();
    }

    createGroup(group: Group, callback: (g: Group) => any) {
        this.groupExists(group._name, group._organisationId, (exists) => {
            if (exists) {
                callback(null);
            } else {
                this._dao.createGroup(group, callback);
            }
        });
    }

    private groupExists(groupName: string, organisationId: string, callback: (exists: boolean) => any) {
        this._dao.getGroupByNameAndOrganisationId(groupName, organisationId, (group: Group) => {
            callback(group != null);
        });
    }

    getGroupById(groupId: string, callback: (group: Group) => any) {
        this._dao.getGroupById(groupId, callback);
    }

    removeGroupById(groupId: string, callback: (deleted: boolean) => any) {
        this._dao.deleteGroupById(groupId, callback);
    }

    getGroupsOfOrganisationById(organisationId: string, callback: (groups: Group[]) => any) {
        this._dao.getGroupsOfOrganisationById(organisationId, callback);
    }

    getGroupsOfUserById(userId:string, callback:(groups:Group[]) => any) {
        this._dao.getGroupsOfUserById(userId, callback);
    }

    getUserIdsInGroup(groupId:string, callback:(users:string[]) => any) {
        this._dao.getUserIdsInGroup(groupId, callback);
    }
}