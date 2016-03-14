import {OrganisationDao} from "../dao/organisationDao";

import {UserManager} from "./userManager";

import {Organisation} from "../model/organisation";

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

                    userManager.addOrganisationIdToUserById(newOrganisation._id, newOrganisation._memberIds[0], true, () => {
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
        this._dao.deleteOrganisationById(organisationId, callback);
    }

    addGroupIdToOrganisationById(groupId: string, organisationId: string, callback: (added: boolean) => any) {
        this._dao.addGroupIdToOrganisationById(groupId, organisationId, callback);
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