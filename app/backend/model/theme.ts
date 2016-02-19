export class Theme {
<<<<<<< HEAD

    private _id:number;
    constructor(public _name: string, public _description: string, public _organisatorIds: string[], public _tags?: string[], public _subThemes?: Theme[]) { }
=======
    private _id:number;
    constructor(private _creatorId:number, public _name: string, private _description: string, private _tags?:string[]) { }
>>>>>>> e405ab9b5b66cf6cab3f1576b13adddc8e3de3e5
}