export class Group {
    public _id: string;

    constructor(public _name: string,
                public _description: string,
                public _organisationId: string,
                public _memberIds: string[]) {

    }
}