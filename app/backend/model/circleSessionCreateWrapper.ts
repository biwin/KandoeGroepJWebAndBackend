import {CircleSession} from "./circleSession";

/**
 * Class that gives a simple model to combine a circlesession and a list of emails.
 * When creating a team a list of emails can be provided. 
 * These will be transformed into userIds in the circlesessionmanager and added to the circleSession in the wrapper
 */
export class CircleSessionCreateWrapper {
    constructor(public _circleSession:CircleSession,
                public _userEmailAdresses:string[]){}

    static empty():CircleSessionCreateWrapper {
        return new CircleSessionCreateWrapper(null, []);
    }
}