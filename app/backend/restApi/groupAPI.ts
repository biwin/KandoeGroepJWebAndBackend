import {Request, Response} from "express";

import {UserApi} from "./userApi";
import {OrganisationAPI} from "./organisationAPI";

import {GroupManager} from "../logic/groupManager";

import {Group} from "../model/group";

export class GroupAPI {
    private static mgr: GroupManager = new GroupManager();

    public static create(req: Request, res: Response){
        GroupAPI.mgr.createGroup(req.body, (g: Group) => {
            res.send(g);
        });
    }

    public static find(req: Request, res: Response) {
        GroupAPI.mgr.getGroupById(req.params.id, (group: Group) => {
            res.send(group);
        });
    }

    public static getMembers(req: Request, res: Response) {
        UserApi.getMembersOfGroupById(req, res);
    }

    public static getOrganisation(req: Request, res: Response) {
        OrganisationAPI.getOrganisationOfGroupById(req, res);
    }

    public static getGroupsOfOrganisationById(req: Request, res: Response) {
        GroupAPI.mgr.getGroupsOfOrganisationById(req.params.id, (groups: Group[]) => {
            res.send(groups);
        });
    }

    public static getGroupsOfUserById(req: Request, res: Response) {
        GroupAPI.mgr.getGroupsOfUserById(req.params.id, (groups:Group[]) =>{
            res.send(groups);
        });
    }
}