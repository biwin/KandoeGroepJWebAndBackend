export class Theme {

    private _id: number;
    constructor(public _name: string, public _description: string, public _organisatorIds: string[], public _tags?: string[], public _subThemes?: Theme[]) { }

    public static empty():Theme{
        return new Theme("", "", [], [], []);
    }
}