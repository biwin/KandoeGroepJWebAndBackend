import {GroupAPI} from "./groupAPI";

import {OrganisationManager} from "../logic/organisationManager";

import {Organisation} from "../model/organisation";

export class OrganisationAPI {
    private static mgr: OrganisationManager = new OrganisationManager();

    public static create(organisation :Organisation, res){
        this.mgr.createOrganisation(organisation, (o: Organisation) => {
           res.send(o);
        });
    }

    public static find(organisationId: string, res) {
        this.mgr.getOrganisationById(organisationId, (organisation: Organisation) => {
            res.send(organisation);
        });
    }

    public static getGroups(organisationId: string, res) {
        GroupAPI.getGroupsOfOrganisationById(organisationId, res);
    }

    public static getAllOrganisationsOfUserById(userId: string, res) {
        this.mgr.getAllOrganisationsOfUserById(userId, (organisations: Organisation[]) => {
            res.send(organisations);
        });
    }
}