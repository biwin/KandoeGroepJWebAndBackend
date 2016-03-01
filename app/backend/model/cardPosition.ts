export class CardPosition {
    public _id:string;
    constructor(public _sessionId:string, public _cardId:string, public _userId:string, public _position:number, public _lastChanged:Date){}
}