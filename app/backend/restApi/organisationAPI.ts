import {Request, Response} from "express";

import {GroupAPI} from "./groupAPI";
import {UserApi} from "./userApi";

import {ThemeApi} from "./themeApi";

import {OrganisationManager} from "../logic/organisationManager";

import {Organisation} from "../model/organisation";

export class OrganisationAPI {
    private static mgr: OrganisationManager = new OrganisationManager();

    public static create(req: Request, res: Response){
        OrganisationAPI.mgr.createOrganisation(req.body, (o: Organisation) => {
           res.send(o);
        });
    }

    public static find(req: Request, res: Response) {
        OrganisationAPI.mgr.getOrganisationById(req.params.id, (organisation: Organisation) => {
            res.send(organisation);
        });
    }

    public static delete(req: Request, res: Response) {
        OrganisationAPI.mgr.removeOrganisationById(req.params.id, (deleted: boolean) => {
            res.send(deleted);
        });
    }

    public static getAdmins(req: Request, res: Response) {
        UserApi.getAdminsOfOrganisationById(req, res);
    }

    public static getGroups(req: Request, res: Response) {
        GroupAPI.getGroupsOfOrganisationById(req, res);
    }

    public static getMembers(req: Request, res: Response) {
        UserApi.getMembersOfOrganisationById(req, res);
    }

    public static getThemes(req: Request, res: Response) {
        ThemeApi.getThemesOfOrganisationById(req, res);
    }

    public static deleteMemberById(req: Request, res: Response) {
        OrganisationAPI.mgr.deleteMemberFromOrganisationById(req.params.memberId, req.params.id, (deleted: boolean) => {
            res.send(deleted);
        });
    }

    public static getOrganisationOfGroupById(req: Request, res: Response) {
        OrganisationAPI.mgr.getOrganisationOfGroupById(req.params.id, (organisation: Organisation) => {
            res.send(organisation)
        });
    }

    public static getAllOrganisationsOfCurrentUser(req: Request, res: Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId: string) =>{
            if(currentUserId != null){
                OrganisationAPI.mgr.getAllOrganisationsOfUserById(currentUserId, (organisations: Organisation[]) => {
                    res.send(organisations);
                });
            }
        });
    }
}