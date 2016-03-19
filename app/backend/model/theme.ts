export class Theme {
    public _id: string;

    constructor(public _name: string,
                public _description: string,
                //List contains the creator 
                public _organisatorIds: string[],
                //List of child theme id's
                public _subThemes?: string[],
                //Is null when private and the organisation id of an organisation when linked to one
                public _organisationId?: string,
                public _tags?: string[]) {

    }

    public static empty(): Theme{
        return new Theme("", "", [], [], "", []);
    }
}