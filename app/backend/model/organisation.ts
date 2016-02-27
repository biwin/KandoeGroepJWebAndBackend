import {Group} from "./group";
import {User} from "./user";

export class Organisation {
    public _groupIds: string[] = [];
    public _organisatorIds: string[] = [];

    public _id: string;

    constructor(public _name: string,
                public _memberIds: string[]) {

    }

    get groups(): Group[] {
        //TODO: call backend
        var groups: Group[] = [];

        if(this._groupIds) {
            for (var i = 0; i < this._groupIds.length; i++) {
                var groupId = this._groupIds[i];
                var newGroup: Group = Group.empty();

                newGroup._name = groupId;
                newGroup._organisationId = this._id;

                groups.push(newGroup);
            }
        }

        return groups;
    }

    public static empty(): Organisation{
        return new Organisation("", []);
    }
}