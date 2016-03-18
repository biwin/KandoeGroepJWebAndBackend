export class ChatMessage {
    public _id:string;
    constructor(public _userId: string, 
                public _message: string, 
                public _circleSessionId: string, 
                public _timestamp: Date, 
                public _userName?:string) {
        
    }
}
