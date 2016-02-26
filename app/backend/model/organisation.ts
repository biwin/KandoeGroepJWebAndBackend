import {Group} from "./group";
import {User} from "./user";

export class Organisation {
    private _groups: Group[];
    private _members: User[];

    public _id: string;

    constructor(public _name: string,
                public _memberIds: string[]) {
        this._groups = [];
        this._members = [];

        for (var i = 0; i < this._memberIds.length; i++) {
            var organisatorId = this._memberIds[i];
            var newUser: User = User.empty();

            newUser._name = organisatorId;

            this._members.push(newUser);
        }
    }

    get groups(): Group[] {
        return this._groups;
    }

    get members():User[] {
        return this._members;
    }

    public static empty(): Organisation {
        return new Organisation("", []);
    }
}