import {CircleSession} from "../model/circleSession";
import {CircleSessionManager} from "../logic/circleSessionManager";
import {CardPosition} from "../model/cardPosition";
import {CircleSessionCreateWrapper} from "../model/circleSessionCreateWrapper";
import {CircleSessionCardWrapper} from "../model/circleSessionCardWrapper";
import {Response, Request} from "express";
import {UserApi} from "./userApi";

export class CircleSessionApi {
    private static mgr:CircleSessionManager = new CircleSessionManager();

    public static createCircleSession(circleSessionCreateWrapper:CircleSessionCreateWrapper, res) {
        CircleSessionApi.mgr.createCircleSession(circleSessionCreateWrapper, (c:CircleSession) => {
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
        CircleSessionApi.mgr.getCircleSessionsOfUserById(userId, (circleSessions:CircleSession[]) =>{
           res.send(circleSessions);
        });
    }

    public static getCircleSessionCards(circleSessionId:string, res) {
        CircleSessionApi.mgr.getCircleSessionCards(circleSessionId, (wrappers:CircleSessionCardWrapper[]) => {
            res.send(wrappers);
        });
    }

    public static initCardsForSession(req:Request, res:Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (uId:string) => {
            if(uId != null) {
                var circleSessionId:string = req.params.id;
                var cardIds:string[] = req.body;
                CircleSessionApi.mgr.initCardsForSession(uId, circleSessionId, cardIds, () => {
                    res.status(200).send('Success');
                });
            } else {
                res.status(401).send('Unauthorized');
            }
        });
    }
}