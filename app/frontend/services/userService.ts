import {Injectable, Inject} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Response} from "angular2/http";

import {HttpWrapperService} from "./httpWrapperService";

import {User} from "../../backend/model/user";
import {Group} from "../../backend/model/group";
import {Organisation} from "../../backend/model/organisation";
import {CircleSession} from "../../backend/model/circleSession";

/**
 * Class that is responsible for a link between the frontend and the backend for users.
 * Uses the user routes in the server.js file
 */
@Injectable()
export class UserService {
    private http: HttpWrapperService = null;
    private path: string;
    private subscribers: any[] = [];

    constructor(http: HttpWrapperService, @Inject('App.BackendPath') path: string) {
        this.path = path;
        this.http = http;
    }

    subscribeMe(subscriber) {
        this.subscribers.push(subscriber);
    }

    notifyLoggedIn() {
        for (var index in this.subscribers) this.subscribers[index].notifyLoggedIn();
    }

    notifyLoggedOut() {
        for (var index in this.subscribers) this.subscribers[index].notifyLoggedOut();
    }

    notifyProfileUpdated() {
        for (var index in this.subscribers) this.subscribers[index].notifyProfileUpdated();
    }

    isLoggedIn(): boolean {
        var token: string = localStorage.getItem('token');
        return token!=null && token!="";
    }

    changeProfile(newName: string, newSmallPictureLink: string, newLargePictureLink: string) {
        return this.http.post(this.path + 'user/change-profile', JSON.stringify({'_username': newName, '_smallPicture': newSmallPictureLink, '_largePicture': newLargePictureLink}), true, false, true).map((res:Response)=>res.json()._message);
    }

    getUser(email: string, password: string): Observable<Response> {
        return this.http.post(this.path + 'user/login', JSON.stringify({'_email': email, '_password': password}), true, false, false).map((res:Response) => res.json()._message);
    }

    registerUser(name: string, password: string, email: string, registrar: string): Observable<Response> {
        return this.http.post(this.path + 'user/register', JSON.stringify({'_username': name, '_password': password, '_email': email, '_registrar': registrar}), true, false, false).map((res:Response) => res.json()._message);
    }

    loginUserFacebook(id: string, name: string, email: string, pictureSmall: string, pictureLarge: string): Observable<Response> {
        return this.http.post(this.path + 'user/login-facebook', JSON.stringify({'_name': name, '_email': email, '_facebookId': id, '_pictureSmall': pictureSmall, '_pictureLarge': pictureLarge, '_registrar': 'facebook'}), true, false, false).map((res:Response) => res.json()._message);
    }

    getUserPicture(type: string):Observable<string> {
        return this.http.post(this.path + 'user/get-picture', JSON.stringify({'_type': type}), true, false, true).map((res:Response) => res.json()._message);
    }

    getUsername(): string {
        var token = localStorage.getItem('token');
        if (token == null || token == "") return "";
        var payloadEncoded = token.split('.')[1];
        var payloadDecoded = atob(payloadEncoded);
        return JSON.parse(payloadDecoded)._name;
    }

    getUserId(): string {
        var token = localStorage.getItem('token');
        if (token == null || token == "") return "";
        var payloadEncoded = token.split('.')[1];
        var payloadDecoded = atob(payloadEncoded);
        return JSON.parse(payloadDecoded)._id;
    }

    getImageLinks(callback: (smallImageLink: string, largeImageLink: string) => any) {
        this.getUserPicture('small').subscribe((p1: string) => {
            this.getUserPicture('large').subscribe((p2: string) => {
                callback(p1, p2);
            });
        });
    }

    getAllGroupsOfUser(userId: string): Observable<Group> {
        return this.http.get(this.path + 'user/' + userId +'/groups', false, true, true);
    }

    getCircleSessionsOfCurrentUser(): Observable<CircleSession[]> {
        return this.http.get(this.path + 'user/circlesessions', false, true, true);
    }

    getUsers(userIds: string[]): Observable<User[]> {
        return this.http.get(this.path + 'user/bulk/' + encodeURI(JSON.stringify(userIds)), false, true, true);
    }

    getAllOrganisationsOfCurrentUser(): Observable<Organisation[]> {
        return this.http.get(this.path + "user/organisations", false, true, true);
    }
}