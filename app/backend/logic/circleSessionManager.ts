import {CircleSession} from "../model/circleSession";
import {CircleSessionDao} from "../dao/circleSessionDao";
import {CardPosition} from "../model/cardPosition";
export class CircleSessionManager {
    private _dao:CircleSessionDao;

    constructor() {
        this._dao = new CircleSessionDao();
    }

    createCircleSession(circleSession:CircleSession, callback: (c:CircleSession) => any) {
        this._dao.circleSessionExists(circleSession, (exists:boolean) => {
            if(exists) {
                callback(null);
            } else {
                this._dao.createCircleSession(circleSession, callback);
            }
        });
    }

    getAllCircleSessions(callback: (c:CircleSession[]) => any) {
        this._dao.readAllCircleSessions(callback);
    }

    getCircleSession(id:string, callback:(c:CircleSession) => any) {
        this._dao.readCircleSession(id, callback);
    }

    cardUp(sessionId:string, cardId:string, userId:string, callback: (cp:CardPosition) => any) {
        /*
        * kijken of een cardposition voor gegeven data bestaat
        * indien ja: updaten
        * indien nee: nieuwe maken
        *
        * altijd: timestamp op huidige tijd
        *
        * cardposition teruggeven
        * */

        this._dao.cardPositionExists(sessionId, cardId, (exists:boolean, position:number) => {
            if(exists){
                if(position < 5) {
                    this._dao.updateCardPosition(sessionId, cardId, userId, position++, callback);
                } else {
                    this._dao.getCardPosition(sessionId, cardId, callback);
                }
            } else{
                this._dao.createCardPosition(sessionId, cardId, userId, callback);
            }
        })
    }
}