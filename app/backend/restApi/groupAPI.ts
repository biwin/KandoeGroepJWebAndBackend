import {UserApi} from "./userApi";

import {GroupManager} from "../logic/groupManager";

import {Group} from "../model/group";
import {Request,Response} from "express";

export class GroupAPI {
    private static mgr: GroupManager = new GroupManager();

    public static create(group :Group, res:Response){
        GroupAPI.mgr.createGroup(group, (g: Group) => {
            res.send(g);
        });
    }

    public static find(groupId: string, res:Response) {
        GroupAPI.mgr.getGroupById(groupId, (group: Group) => {
            res.send(group);
        });
    }

    public static getMembers(groupId: string, res) {
        UserApi.getMembersOfGroupById(groupId, res);
    }

    public static getGroupsOfOrganisationById(organisationId: string, res:Response) {
        GroupAPI.mgr.getGroupsOfOrganisationById(organisationId, (groups: Group[]) => {
            res.send(groups);
        });
    }

    public static getGroupsOfUserById(req:Request, res:Response) {
        GroupAPI.mgr.getGroupsOfUserById(req.params.id, (groups:Group[]) =>{
            res.send(groups);
        });
    }
}