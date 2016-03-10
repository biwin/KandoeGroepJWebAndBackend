import {CircleSession} from "../model/circleSession";
import {CircleSessionManager} from "../logic/circleSessionManager";
import {CardPosition} from "../model/cardPosition";
import {CircleSessionCreateWrapper} from "../model/circleSessionCreateWrapper";
import {CircleSessionCardWrapper} from "../model/circleSessionCardWrapper";
import {Response, Request} from "express";
import {UserApi} from "./userApi";

export class CircleSessionApi {
    private static mgr:CircleSessionManager = new CircleSessionManager();

    public static createCircleSession(req:Request, res:Response) {
        CircleSessionApi.mgr.createCircleSession(req.body, (c:CircleSession) => {
            res.send(c);
        });
    }

    public static findAll(req:Request, res:Response) {
        CircleSessionApi.mgr.getAllCircleSessions((c:CircleSession[]) => {
            res.send(c);
        });
    }

    public static find(req:Request,res:Response) {
        CircleSessionApi.mgr.getCircleSession(req.params.id, (c:CircleSession) => {
            res.send(c);
        });
    }

    public static cardUp(sessionId:string, cardId:string, userId:string, res){
        CircleSessionApi.mgr.cardUp(sessionId, cardId, userId, (cp:CardPosition) => {
            res.send(cp);
        });
    }

    static getCircleSessionsOfUserById(req:Request, res:Response) {
        CircleSessionApi.mgr.getCircleSessionsOfUserById(req.params.id, (circleSessions:CircleSession[]) =>{
           res.send(circleSessions);
        });
    }

    public static getCircleSessionCards(req:Request, res:Response) {
        CircleSessionApi.mgr.getCircleSessionCards(req.params.id, (wrappers:CircleSessionCardWrapper[]) => {
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