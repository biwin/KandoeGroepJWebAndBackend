import {Group} from "./group";
export class Organisation {

    public _id: string;
    private _groups: Group[];
    constructor(public _name: string, public _organisators?: string[]) {

    }

    get groups():Group[] {
        return this._groups;
    }
}