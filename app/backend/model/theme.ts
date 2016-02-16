export class Theme {
    private _id:number;
    private creatorId:number;
    private _name:string;
    private description:string;
    private tags:string[];

    constructor(name:string, description:string, tags?:string[]) {
        this._name = name;
        this.description = description;
        this.tags = tags;
    }


    get name():string {
        return this._name;
    }
}