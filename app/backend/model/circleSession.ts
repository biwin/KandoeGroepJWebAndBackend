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
                public _realTime:boolean,
                public _endPoint:number,
                public _allowComment:boolean,
                public _turnTimeMin?:number) {}

    public static empty():CircleSession{
        return new CircleSession("",[] ,"","","","",false,null,true);
    }

    public get _inProgress():boolean {
        if(this._startDate == null || this._startDate.length !== 16) {
            return true;
        }

        var now:Date = new Date(Date.now());
        var splittedDateAndTime:string[] = this._startDate.split(' ');
        var splittedDate:number[] = splittedDateAndTime[0].split('/').map(parseInt);
        var splittedTime:number[] = splittedDateAndTime[1].split(':').map(parseInt);

        var startDate:Date = new Date(Date.UTC(splittedDate[2], splittedDate[1] - 1, splittedDate[0], splittedTime[0], splittedTime[1]));

        return now >= startDate;
    }
}