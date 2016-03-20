import {Request, Response} from "express";

import {UserApi} from "./userApi";
import {OrganisationAPI} from "./organisationAPI";

import {GroupManager} from "../logic/groupManager";

import {Group} from "../model/group";

/**
 * Class that is responsible for exstracting data from the request and sending it to the groupmanager
 * Uses the organisationApi to get group information when needed
 * Uses the userApi where needed to check if the request is authorized
 */
export class GroupAPI {
    private static mgr: GroupManager = new GroupManager();

    public static create(req: Request, res: Response){
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId: string) => {
            if (currentUserId != null) {
                var group: Group = req.body;
                group._memberIds = [currentUserId];

                GroupAPI.mgr.createGroup(group, (g: Group) => {
                    res.send(g);
                });
            } else {
                res.status(401).send({error: 'Unauthorized'});
            }
        });
    }

    public static find(req: Request, res: Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId: string) => {
            if (currentUserId != null) {
                var groupId: string = req.params.id;

                GroupAPI.mgr.getGroupById(groupId, (group: Group) => {
                    res.send(group);
                });
            } else {
                res.status(401).send({error: 'Unauthorized'});
            }
        });
    }

    public static delete(req: Request, res: Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId: string) => {
            if (currentUserId != null) {
                var groupId: string = req.params.id;

                GroupAPI.mgr.removeGroupById(groupId, (deleted: boolean) => {
                    if(deleted) {
                        res.send(deleted);
                    } else {
                        res.status(404).send("Group not found");
                    }
                });
            } else {
                res.status(401).send({error: 'Unauthorized'});
            }
        });
    }

    public static getMembers(req: Request, res: Response) {
        UserApi.getMembersOfGroupById(req, res);
    }

    public static getOrganisation(req: Request, res: Response) {
        OrganisationAPI.getOrganisationOfGroupById(req, res);
    }

    public static getGroupsOfOrganisationById(req: Request, res: Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId: string) => {
            if (currentUserId != null) {
                var groupId: string = req.params.id;

                GroupAPI.mgr.getGroupsOfOrganisationById(groupId, (groups: Group[]) => {
                    res.send(groups);
                });
            } else {
                res.status(401).send({error: 'Unauthorized'});
            }
        });
    }

    public static getGroupsOfUserById(req: Request, res: Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId: string) => {
            if (currentUserId != null) {
                var groupId: string = req.params.id;

                GroupAPI.mgr.getGroupsOfUserById(groupId, (groups: Group[]) =>{
                    res.send(groups);
                });
            } else {
                res.status(401).send({error: 'Unauthorized'});
            }
        }); 
    }
}