import {GroupDao} from "../dao/groupDao";

import {UserManager} from "./userManager";
import {OrganisationManager} from "./organisationManager";

import {Group} from "../model/group";

/**
 * Class that is responsible for managing what data will be send to the database layer for groups.
 * Gains information from usermanager and organisationmanager when needed for a group.
 */
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
        var userManager: UserManager = new UserManager();
        var organisationManager: OrganisationManager = new OrganisationManager();

        userManager.removeAllMembersFromGroupById(groupId, (membersDeleted: boolean) => {
            organisationManager.deleteGroupIdFromOrganisation(groupId, (referencesDeleted: boolean) => {
                this._dao.deleteGroupById(groupId, (groupDeleted: boolean) => {
                    callback(membersDeleted && referencesDeleted && groupDeleted);
                });
            });
        });
    }

    deleteMemberFromGroupById(memberId: string, groupId: string, callback: (deleted: boolean) => any) {
        this._dao.deleteMemberFromGroupById(memberId, groupId, (memberDeleted: boolean) => {
            var userManager: UserManager = new UserManager();

            userManager.deleteGroupFromUserById(groupId, memberId, (referenceDeleted: boolean) => {
                callback(referenceDeleted && memberDeleted);
            });
        });
    }

    addUserByEmailToGroupById(newUserMail, groupId, callback: (added: boolean, userId: string) => any) {
        var userManager = new UserManager();

        this.getGroupById(groupId, (group: Group) => {
            userManager.getUserIdForUserByEmail(newUserMail, (userId: string) => {
                if(group._memberIds.indexOf(userId) < 0) {
                    this._dao.addUserIdToGroupById(userId, groupId, (userAdded: boolean) => {
                        userManager.addGroupIdToUserById(groupId, userId, (referenceAdded: boolean) => {
                            callback(userAdded && referenceAdded, userId);
                        });
                    });
                } else {
                    callback(false, null);
                }
            });
        });
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