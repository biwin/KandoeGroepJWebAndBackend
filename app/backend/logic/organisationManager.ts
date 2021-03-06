import {OrganisationDao} from "../dao/organisationDao";

import {UserManager} from "./userManager";
import {GroupManager} from "./groupManager";
import {ThemeManager} from "./themeManager";

import {Organisation} from "../model/organisation";

/**
 * Class that is responsible for managing what data will be send to the database layer for organisations. 
 * Gains information from usermanager, groupmanager and thememanager when needed for an organisation.
 */
export class OrganisationManager {
    private _dao: OrganisationDao;

    constructor() {
        this._dao = new OrganisationDao();
    }

    createOrganisation(organisation: Organisation, callback: (o: Organisation) => any) {
        this.organisationExists(organisation._name, (exists) => {
            if (exists) {
                callback(null);
            } else {
                this._dao.createOrganisation(organisation, (newOrganisation: Organisation) => {
                    var userManager: UserManager = new UserManager();

                    userManager.addOrganisationIdToUserById(newOrganisation._id, newOrganisation._organisatorIds[0], true, () => {
                        callback(newOrganisation);
                    });
                });
            }
        });
    }

    private organisationExists(organisationName: string, callback: (exists: boolean) => any) {
        this._dao.getOrganisationByName(organisationName, (organisation: Organisation) => {
            callback(organisation != null);
        });
    }

    getOrganisationById(organisationId: string, callback: (organisation: Organisation) => any) {
        this._dao.getOrganisationById(organisationId, callback);
    }

    removeOrganisationById(organisationId: string, callback: (deleted: boolean) => any) {
        var groupManager: GroupManager = new GroupManager();
        var userManager: UserManager = new UserManager();
        var themeManager: ThemeManager = new ThemeManager();
        var groupsDeleted: boolean = true;

        this.getOrganisationById(organisationId, (organisation: Organisation) => {
            organisation._groupIds.forEach(function(groupId: string) {
                groupManager.removeGroupById(groupId, (groupDeleted: boolean) => {
                    groupsDeleted = groupsDeleted && groupDeleted;
                });
            });
        });

        userManager.removeAllUsersFromOrganisationById(organisationId, (usersDeleted: boolean) => {
            themeManager.removeAllThemesFromOrganisationById(organisationId, (themeReferencesDeleted: boolean) => {
                this._dao.deleteOrganisationById(organisationId, (organisationDeleted: boolean) => {
                    callback(groupsDeleted && usersDeleted && themeReferencesDeleted && organisationDeleted);
                });
            });
        });
    }

    deleteMemberFromOrganisationById(memberId: string, organisationId: string, callback: (deleted: boolean) => any) {
        this._dao.deleteMemberFromOrganisationById(memberId, organisationId, (deleted: boolean) => {
            var userManager: UserManager = new UserManager();

            userManager.deleteOrganisationFromUserById(organisationId, memberId, () => {
                callback(deleted);
            });
        });
    }

    deleteGroupIdFromOrganisation(groupId: string, callback: (deleted: boolean) => any) {
        this._dao.deleteGroupIdFromOrganisation(groupId, callback);
    }

    deleteThemeFromOrganisationById(themeId: string, organisationId: string, callback: (deleted: boolean) => any) {
        var themeManager: ThemeManager = new ThemeManager();

        themeManager.deleteOrganisationFromThemeById(themeId, callback);
    }

    addGroupIdToOrganisationById(groupId: string, organisationId: string, callback: (added: boolean) => any) {
        this._dao.addGroupIdToOrganisationById(groupId, organisationId, callback);
    }

    addUserByEmailToOrganisationById(newUserMail, isAdmin, organisationId, callback: (added: boolean, userId: string) => any) {
        var userManager = new UserManager();
        
        this.getOrganisationById(organisationId, (organisation: Organisation) => {
            userManager.getUserIdForUserByEmail(newUserMail, (userId: string) => {
                if(isAdmin && organisation._organisatorIds.indexOf(userId)<0 || !isAdmin && organisation._memberIds.indexOf(userId)<0) {
                    this._dao.addUserIdToOrganisationById(userId, isAdmin, organisationId, (userAdded: boolean) => {
                        userManager.addOrganisationIdToUserById(organisationId, userId, isAdmin, (referenceAdded: boolean) => {
                            callback(userAdded && referenceAdded, userId);
                        });
                    });
                } else {
                    callback(false, null);
                }
            });
        });
    }

    getOrganisationOfGroupById(groupId: string, callback: (organisation: Organisation) => any) {
        this._dao.getOrganisationOfGroupById(groupId, callback);
    }

    getAllOrganisationsOfUserById(userId: string, callback: (organisations: Organisation[]) => any) {
        this._dao.getAllOrganisationsOfUserById(userId, callback);
    }

    getAllOrganisationIdsOfUserById(userId:string, callback:(organisationIds:string[])=>any) {
        this._dao.getAllOrganisationIdsOfUserById(userId, callback);
    }
}