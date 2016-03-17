import {Request, Response} from "express";

import {GroupAPI} from "./groupAPI";
import {UserApi} from "./userApi";

import {ThemeApi} from "./themeApi";

import {OrganisationManager} from "../logic/organisationManager";

import {Organisation} from "../model/organisation";

export class OrganisationAPI {
    private static mgr: OrganisationManager = new OrganisationManager();

    public static create(req: Request, res: Response){
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId: string) => {
            if (currentUserId != null) {
                var organisation: Organisation = req.body;
                organisation._organisatorIds = [currentUserId];

                OrganisationAPI.mgr.createOrganisation(req.body, (o: Organisation) => {
                    res.send(o);
                });
            } else {
                res.status(401).send({error: 'Unauthorized'});
            }
        });
    }

    public static find(req: Request, res: Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId: string) => {
            if (currentUserId != null) {
                var organisationId: string = req.params.id;

                OrganisationAPI.mgr.getOrganisationById(organisationId, (organisation: Organisation) => {
                    res.send(organisation);
                });
            } else {
                res.status(401).send({error: 'Unauthorized'});
            }
        });
    }

    public static delete(req: Request, res: Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId: string) => {
            if (currentUserId != null) {
                var organisationId: string = req.params.id;

                OrganisationAPI.mgr.removeOrganisationById(organisationId, (deleted: boolean) => {
                    if(deleted) {
                        res.send(deleted);
                    } else {
                        res.status(404).send("Organisation not found");
                    }
                });
            } else {
                res.status(401).send({error: 'Unauthorized'});
            }
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
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId: string) => {
            if (currentUserId != null) {
                var memberId: string = req.params.memberId;
                var organisationId: string = req.params.id;

                OrganisationAPI.mgr.deleteMemberFromOrganisationById(memberId, organisationId, (deleted: boolean) => {
                    if(deleted) {
                        res.send(deleted);
                    } else {
                        res.status(404).send("Organisation not found");
                    }
                });
            } else {
                res.status(401).send({error: 'Unauthorized'});
            }
        });
    }

    public static deleteGroupById(req: Request, res: Response) {
        req.params.id = req.params.groupId;
        
        GroupAPI.delete(req, res);
    }

    public static getOrganisationOfGroupById(req: Request, res: Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId: string) => {
            if (currentUserId != null) {
                var groupId: string = req.params.id;

                OrganisationAPI.mgr.getOrganisationOfGroupById(groupId, (organisation: Organisation) => {
                    res.send(organisation);
                });
            } else {
                res.status(401).send({error: 'Unauthorized'});
            }
        });
    }

    public static getAllOrganisationsOfCurrentUser(req: Request, res: Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId: string) => {
            if(currentUserId != null){
                OrganisationAPI.mgr.getAllOrganisationsOfUserById(currentUserId, (organisations: Organisation[]) => {
                    res.send(organisations);
                });
            } else {
                res.status(401).send({error: 'Unauthorized'});
            }
        });
    }
}