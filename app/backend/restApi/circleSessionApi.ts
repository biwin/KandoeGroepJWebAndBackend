import {CircleSession} from "../model/circleSession";
import {CircleSessionManager} from "../logic/circleSessionManager";
import {CardPosition} from "../model/cardPosition";

export class CircleSessionApi {
    private static mgr:CircleSessionManager = new CircleSessionManager();

    public static createCircleSession(circleSession:CircleSession, res) {
        CircleSessionApi.mgr.createCircleSession(circleSession, (c:CircleSession) => {
            res.send(c);
        });
    }

    public static findAll(res) {
        CircleSessionApi.mgr.getAllCircleSessions((c:CircleSession[]) => {
            res.send(c);
        });
    }

    public static find(id:string,res) {
        CircleSessionApi.mgr.getCircleSession(id, (c:CircleSession) => {
            res.send(c);
        });
    }

    public static cardUp(sessionId:string, cardId:string, userId:string, res){
        CircleSessionApi.mgr.cardUp(sessionId, cardId, userId, (cp:CardPosition) => {
            res.send(cp);
        });
    }

    static getCircleSessionsOfUserById(userId:string, res) {
        this.mgr.getCircleSessionsOfUserById(userId, (circleSessions:CircleSession[]) =>{
           res.send(circleSessions);
        });
    }
}