import {Request, Response} from "express";

import {GroupAPI} from "./groupAPI";
import {UserApi} from "./userApi";

import {OrganisationManager} from "../logic/organisationManager";

import {Organisation} from "../model/organisation";

export class OrganisationAPI {
    private static mgr: OrganisationManager = new OrganisationManager();

    public static create(organisation: Organisation, res){
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

    public static getMembers(organisationId: string, res) {
        UserApi.getMembersOfOrganisationById(organisationId, res);
    }

    public static deleteMemberById(organisationId: string, memberId: string, res) {
        this.mgr.deleteMemberFromOrganisationById(memberId, organisationId, (deleted: boolean) => {
            res.send(deleted);
        });
    }

    public static getOrganisationOfGroupById(groupId: string, res) {
        this.mgr.getOrganisationOfGroupById(groupId, (organisation: Organisation) => {
            res.send(organisation)
        });
    }

    public static getAllOrganisationsOfCurrentUser(req: Request, res: Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId: string) =>{
            if(currentUserId != null){
                this.mgr.getAllOrganisationsOfUserById(currentUserId, (organisations: Organisation[]) => {
                    res.send(organisations);
                });
            }
        });
    }
}