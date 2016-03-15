import {CardPosition} from "./cardPosition";
export class CircleSessionMoveResponse {
    constructor(public _error?:string, public _roundEnded?:boolean, public _currentPlayerId?:string, public _updatedCardPosition?:CardPosition) {}
}