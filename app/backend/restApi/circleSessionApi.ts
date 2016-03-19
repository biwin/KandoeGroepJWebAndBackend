import {Response, Request} from "express";

import {UserApi} from "./userApi";

import {CircleSessionManager} from "../logic/circleSessionManager";

import {CardPosition} from "../model/cardPosition";
import {CircleSession} from "../model/circleSession";
import {CircleSessionCardWrapper} from "../model/circleSessionCardWrapper";
import {CircleSessionMoveResponse} from "../model/circleSessionMoveResponse";

/**
 * Class that is responsible for exstracting data from the request and sending it to the circlesessionmanager
 * Uses the userApi where needed to check if the request is authorized
 */
export class CircleSessionApi {
    private static mgr:CircleSessionManager = new CircleSessionManager();

    public static createCircleSession(req:Request, res:Response) {
        CircleSessionApi.mgr.createCircleSession(req.body, (c:CircleSession) => {
            res.send(c);
        });
    }

    public static findAll(req:Request, res:Response) {
        CircleSessionApi.mgr.getAllCircleSessions((c:CircleSession[]) => {
            console.log(c);
            res.send(c);
        });
    }

    public static find(req:Request,res:Response) {
        CircleSessionApi.mgr.getCircleSession(req.params.id, (c:CircleSession) => {
            if(c == null) {
                res.status(404).send('CircleSession with id ' + req.params.id + ' not found!');
            } else {
                res.send(c);
            }
        });
    }

    public static playCard(req:Request, res:Response){
        UserApi.getCurrentUserId(req.header('Bearer'), (userId:string) => {
            if(userId != null) {
                var circleSessionId:string = req.params.id;
                var cardId:string = req.body._cardId;

                CircleSessionApi.mgr.cardUp(circleSessionId, cardId, userId, (newPlayerId:string, updatedCardPosition:CardPosition, errMessage?:string) => {
                    if(errMessage != undefined || errMessage != null) {
                        res.status(400).send(new CircleSessionMoveResponse(errMessage));
                    } else {
                        res.status(200).send(new CircleSessionMoveResponse(null, null, newPlayerId, updatedCardPosition));
                    }
                });
            } else {
                res.status(401).send(new CircleSessionMoveResponse('Unauthorized'));
            }
        });
    }

    public static getCircleSessionCards(req:Request, res:Response) {
        CircleSessionApi.mgr.getCircleSessionCards(req.params.id, (wrappers:CircleSessionCardWrapper[]) => {
            res.send(wrappers);
        });
    }

    public static initCardsForSession(req:Request, res:Response) {
        console.log("JASPER: " + JSON.stringify(req.body) + " - " + JSON.stringify(req.body.values));
        UserApi.getCurrentUserId(req.header('Bearer'), (uId:string) => {
            console.log("JASPER2: " + uId);
            if(uId != null) {
                var circleSessionId:string = req.params.id;
                console.log("JASPER3: " + circleSessionId + " - " + req.params.id);
                var cardIds:string[] = req.body.values == null ? req.body : req.body.values;
                console.log("JASPER4: " + cardIds);
                console.log("JASPER5: " + (req.body.values == null ? req.body : req.body.values));
                CircleSessionApi.mgr.initCardsForSession(uId, circleSessionId, cardIds, (preGameEnded:boolean, currentUserId:string, err?:string) => {
                    if (err != undefined || err != null) {
                        console.log("JASPER ERROR IS HERE: " + err);
                        res.status(400).send(new CircleSessionMoveResponse(err));
                    } else {
                        //TODO notify active clients using WebSocket
                        console.log("JASPER WE GOT HERE MAN : " + preGameEnded + " - " + currentUserId);
                        res.status(200).send(new CircleSessionMoveResponse(null, preGameEnded, currentUserId));
                    }
                });
            } else {
                res.status(401).send(new CircleSessionMoveResponse('Unauthorized'));
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
                   res.status(200).send({_response: 'Success'});
               });
           }
        });
    }

    public static getCardPositions(req:Request, res:Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId:string) => {
            if(currentUserId != null) {
                CircleSessionApi.mgr.getCircleSession(req.params.id, (c:CircleSession) => {
                    if(c._userIds.indexOf(currentUserId) < 0) {
                        res.status(401).send({_error: 'Unauthorized'});
                    } else {
                        CircleSessionApi.mgr.getCardPositions(req.params.id, (cps:CardPosition[]) => {
                            res.send(cps);
                        });
                    }
                });
            } else {
                res.status(401).send({_error: 'Unauthorized'});
            }
        });
    }

    public static stopGame(req:Request, res:Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (id:string) => {
            if(id != null) {
                CircleSessionApi.mgr.stopGame(req.params.id, id, (stopped:boolean, err?:string) => {
                    if(err != null) {
                        res.status(400).send({'_error': err});
                    } else if(!stopped) {
                        res.status(400).send({'_error': 'Failed to stop game.'});
                    } else {
                        res.send({'_stopped': true});
                    }
                });
            } else {
                res.status(401).send({'_error': 'Unauthorized'});
            }
        });
    }
}