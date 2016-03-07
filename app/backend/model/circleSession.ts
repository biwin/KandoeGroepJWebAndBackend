export class CircleSession {
    public _id:string;
    constructor(public _groupId:string,
                public _userIds:string[],
                public _themeId:string,
                /* _name format: "GroupName - ThemeName" */
                public _name:string,
                public _creatorId: string,
                /* _startDate format: dd/mm/yyyy hh:mm */
                public _startDate:string,
                public _inProgress:boolean,
                public _realTime:boolean,
                public _endPoint:number,
                public _allowComment:boolean,
                public _turnTimeMin?:number) {}

    public static empty():CircleSession{
        return new CircleSession("",[] ,"","","","",false,false,null,true,null);
    }
}