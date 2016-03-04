import {GroupManager} from "../logic/groupManager";

import {Group} from "../model/group";

export class GroupAPI {
    private static mgr: GroupManager = new GroupManager();

    public static create(group :Group, res){
        this.mgr.createGroup(group, (g: Group) => {
            res.send(g);
        });
    }

    public static find(groupId: string, res) {
        this.mgr.getGroupById(groupId, (group: Group) => {
            res.send(group);
        });
    }
}