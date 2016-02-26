import {Group} from "./group";

export class Organisation {
    private _groups: Group[];

    public _id: string;

    constructor(public _name: string,
                public _memberIds: string[]) {
        this._groups = [];
    }

    get groups(): Group[] {
        return this._groups;
    }

    public static empty(): Organisation {
        return new Organisation("", []);
    }
}