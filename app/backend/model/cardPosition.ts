export class CardPosition {
    public _id:string;

    constructor(public _sessionId:string,
                public _cardId:string,
                public _userId:string,
                public _userHistory:string[],
                /* 0 is in the game but not on the board. 1-5 are the rings (5 = the inner ring = end)  */
                public _position:number,
                public _lastChanged:Date) {
    }
}