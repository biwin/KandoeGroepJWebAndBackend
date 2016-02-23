export class CircleSession {
    public _id:string;
    constructor(public _groupId:string, public _themeId:string, public _creatorId: string, public _startDate:string, public _inProgress:boolean, public _realTime:boolean, public _endPoint:number, public _turnTimeMin?:number) {}
}