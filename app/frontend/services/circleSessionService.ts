import {Injectable,Inject} from "angular2/core";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

import {HttpWrapperService} from "./httpWrapperService";

import {ChatMessage} from "../../backend/model/chatMessage";

import {CardPosition} from "../../backend/model/cardPosition";
import {CircleSession} from "../../backend/model/circleSession";
import {CircleSessionCardWrapper} from "../../backend/model/circleSessionCardWrapper";
import {CircleSessionMoveResponse} from "../../backend/model/circleSessionMoveResponse";
import {CircleSessionCreateWrapper} from "../../backend/model/circleSessionCreateWrapper";

/**
 * Class that is responsible for a link between the frontend and the backend for circleSessions.
 * Uses the circlesessions routes in the server.js file
 */
@Injectable()
export class CircleSessionService {
    private http:HttpWrapperService = null;
    private path:string;

    constructor(http:HttpWrapperService, @Inject('App.BackendPath') path:string) {
        this.path = path;
        this.http = http;
    }

    getAll():Observable<CircleSession[]>{
        return this.http.get(this.path + 'circlesessions', false,true,false);
    }

    create(circleSession:CircleSession, emailadresses:string[]):Observable<CircleSession>{
        var circleSessionCreateWrapper:CircleSessionCreateWrapper = CircleSessionCreateWrapper.empty();
        circleSessionCreateWrapper._circleSession = circleSession;
        circleSessionCreateWrapper._userEmailAdresses = emailadresses;
        return this.http.post(this.path + 'circlesessions', JSON.stringify(circleSessionCreateWrapper), true,true,false);
    }

    get(id:string):Observable<CircleSession>{
        return this.http.get(this.path + 'circlesessions/' + id, false,true,false);
    }

    getCircleSessionCards(circleSessionId:string):Observable<CircleSessionCardWrapper[]>{
        return this.http.get(this.path + 'circlesessions/' + circleSessionId + '/cards', false,true,false);
    }

    initCards(circlesessionId: string, selectedCards: string[]): Observable<CircleSessionMoveResponse> {
        return this.http.post(this.path + 'circlesessions/' + circlesessionId + '/cards', JSON.stringify(selectedCards),true,true,true);
        //nitCards(this.circleSession._id, this.selectedCards).subscribe((r:CircleSessionMoveResponse) => {
    }

    deleteCircleSession(circleSessionId:string):Observable<string> {
        return this.http.delete(this.path + 'circlesessions/' + circleSessionId, false,false,true);
    }

    addUser(circleSessionId:string, email:string):Observable<string> {
        return this.http.post(this.path + 'circlesessions/' + circleSessionId, JSON.stringify({email:email}),true,false, true);
    }

    getCardPositionsOfSession(sessionId:string):Observable<CardPosition[]> {
        return this.http.get(this.path + 'circlesessions/' + sessionId + '/positions', true, true, true);
    }

    playCard(sessionId:string, cardId:string):Observable<CircleSessionMoveResponse> {
        return this.http.post(this.path + 'circlesessions/' + sessionId + '/positions', JSON.stringify({_cardId: cardId}), true, true, true);
    }

    stopGame(sessionId:string):Observable<any> {
        return this.http.post(this.path + 'circlesessions/' + sessionId + '/stopGame', "", false, true, true);
    }

    getMessages(sessionId:string):Observable<ChatMessage[]>{
        return this.http.get(this.path + 'circlesessions/' + sessionId + '/chat', false,true,false);
    }
}

