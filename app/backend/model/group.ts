import {User} from "./user";
import {Organisation} from "./organisation";

export class Group {
    public _id: string;

    constructor(public _name: string,
                public _description: string,
                public _organisationId: string,
                public _memberIds: string[]) {

    }

    public getMembers(): User[] {
        //TODO: call backend
        var members: User[] = [];

        if(this._memberIds) {
            for (var i = 0; i < this._memberIds.length; i++) {
                var memberId = this._memberIds[i];
                var newUser: User = User.empty();

                newUser._name = memberId;

                members.push(newUser);
            }
        }

        return members;
    }

    get organisation(): Organisation {
        //TODO: call backend
        var organisation: Organisation = Organisation.empty();

        organisation._name = this._organisationId;

        return organisation;
    }

    public static empty(): Group{
        return new Group("", "", "", []);
    }
}