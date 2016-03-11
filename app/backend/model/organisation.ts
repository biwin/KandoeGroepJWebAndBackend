import {Group} from "./group";
import {User} from "./user";

export class Organisation {
    public _groupIds: string[] = [];
    public _organisatorIds: string[] = [];

    public _id: string;

    constructor(public _name: string,
                public _memberIds: string[]) {

    }

    public static empty(): Organisation{
        return new Organisation("", []);
    }
}