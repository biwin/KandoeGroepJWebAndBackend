export class Theme {
    private id:number;
    private name:string;
    private description:string;
    private tags:string[];

    constructor(name:string, description:string, tags?:string[]) {
        this.name = name;
        this.description = description;
        this.tags = tags;
    }
}