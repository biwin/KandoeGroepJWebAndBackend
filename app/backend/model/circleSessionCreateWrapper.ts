import {CircleSession} from "./circleSession";
export class CircleSessionCreateWrapper {
    constructor(public _circleSession:CircleSession,
                public _userEmailAdresses:string[]){}

    static empty():CircleSessionCreateWrapper {
        return new CircleSessionCreateWrapper(null, []);
    }
}