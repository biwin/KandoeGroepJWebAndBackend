import {OrganisationDao} from "../dao/organisationDao";

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
                this._dao.createOrganisation(organisation, callback);
            }
        });
    }

    private organisationExists(organisationName: string, callback: (exists: boolean) => any) {
        this._dao.readOrganisationByName(organisationName, (organisation: Organisation) => {
            callback(organisation != null);
        });
    }

    getOrganisationById(organisationId: string, callback: (organisation: Organisation) => any) {

    }

    removeOrganisationById(organisationId: string, callback: (deleted: boolean) => any) {

    }
}