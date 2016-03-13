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
                    res.status(200).send({result: 'Success'});
                });
            } else {
                res.status(401).send({error:'Unauthorized'});
            }
        });
    }

    public static deleteCircleSession(req:Request, res:Response){
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId:string) => {
            if(currentUserId != null) {
                var circleSessionId:string = req.params.id;
                CircleSessionApi.mgr.deleteCircleSession(currentUserId, circleSessionId, () =>{
                   res.status(204).send('Deleted');
                });
            }else {
                res.status(401).send('Unauthorized');
            }
        });
    }

    public static getCircleSessionsOfCurrentUser(req:Request, res:Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId:string) =>{
           if(currentUserId != null){
               CircleSessionApi.mgr.getCircleSessionsOfUserById(currentUserId, (circleSessions:CircleSession[]) => {
                   res.send(circleSessions);
               });
           }
        });
    }

    public static addUser(req:Request, res:Response){
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId:string) =>{
           if(currentUserId != null){
               CircleSessionApi.mgr.addUser(currentUserId, req.params.id, req.body.email, (b:boolean) =>{
                   res.status(200).send({response: 'Success'});
               });
           }
        });
    }
}