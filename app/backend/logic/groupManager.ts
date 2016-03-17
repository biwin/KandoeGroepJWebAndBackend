import {GroupDao} from "../dao/groupDao";

import {OrganisationManager} from "./organisationManager";
import {UserManager} from "./userManager";

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
                this._dao.createGroup(group, (newGroup: Group) => {
                    var organisationManager: OrganisationManager = new OrganisationManager();
                    var userManager: UserManager = new UserManager();

                    organisationManager.addGroupIdToOrganisationById(newGroup._id, newGroup._organisationId, () => {
                        userManager.addGroupIdToUserById(newGroup._id, newGroup._memberIds[0], () => {
                            callback(newGroup);
                        });
                    });
                });
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
        //TODO: delete groupId from _memberOfGroupIds array in User-objects
        //TODO: delete groupId from _groupIds array in Organisation-object
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