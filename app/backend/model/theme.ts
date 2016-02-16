export class Theme {
    private _id:number;

    constructor(private _creatorId:number, public _name: string, private _description: string, private _tags?:string[]) { }
}