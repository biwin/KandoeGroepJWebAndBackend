import {CardPosition} from "./cardPosition";

/**
 * Class that gives a simple model to combine and action and a Cardpositions.
 * Used to send back to the frontend when a game move has been done.
 * It allows the frontend to react according to the possible action
 */
export class CircleSessionMoveResponse {
    constructor(public _error?:string,
                public _roundEnded?:boolean,
                public _currentPlayerId?:string,
                public _updatedCardPosition?:CardPosition) {}
}