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

    }

    removeGroupById(groupId: string, callback: (deleted: boolean) => any) {

    }
}