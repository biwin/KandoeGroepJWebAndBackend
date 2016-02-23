import {CircleSession} from "../model/circleSession";
import {CircleSessionDao} from "../dao/circleSessionDao";
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
}