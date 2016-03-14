export class Theme {
    public _id: string;
    constructor(public _name: string, public _description: string, public _organisatorIds: string[], public _subThemes?: string[], public _organisationId?:string, public _tags?: string[]) { }

    public static empty():Theme{
        return new Theme("", "", [], [], "", []);
    }
}