import {Group} from "./group";
import {User} from "./user";

export class Organisation {
    public _groups: string[] = [];
    public _organisators: string[] = [];

    public _id: string;

    constructor(public _name: string, public _members: string[]) {

    }
}