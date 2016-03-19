export class CircleSession {
    public _id:string;
    constructor(public _groupId:string,
                public _userIds:string[],
                public _themeId:string,
                /* _name format: "GroupName - ThemeName" */
                public _name:string,
                public _creatorId: string,
                /* _startDate format: yyyy-mm-dd hh:mm */
                public _startDate:string,
                public _realTime:boolean,
                public _isPreGame:boolean,
                //amount of rounds untill the session will stop. When null the game is endless and needs to be stopped manualy
                public _endPoint:number,
                //true when comments are allowed on cards in the pregame
                public _allowComment:boolean,
                //true when the game has been started (current date is pas startdate)
                public _inProgress:boolean,
                //true when the game has been stopped manualy or by reaching the endpoint
                public _isStopped:boolean,
                //Time a turn can last for one player
                public _turnTimeMin?:number,
                public _currentPlayerId?:string) {}

    public static empty():CircleSession{
        return new CircleSession("",[] ,"","","","",false, true,null,true,false, false);
    }
}