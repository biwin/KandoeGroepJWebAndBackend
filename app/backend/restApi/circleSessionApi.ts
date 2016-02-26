import {CircleSession} from "../model/circleSession";
import {CircleSessionManager} from "../logic/circleSessionManager";

export class CircleSessionApi {
    private static mgr:CircleSessionManager = new CircleSessionManager();

    public static createCircleSession(circleSession:CircleSession, res) {
        CircleSessionApi.mgr.createCircleSession(circleSession, (c:CircleSession) => {
            res.send(c);
        });
    }
}