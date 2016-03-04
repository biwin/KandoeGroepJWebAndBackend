import {Injectable} from "angular2/core";
import {Inject} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {User} from "../../backend/model/user";
import {Headers, Response} from "angular2/http";
import {HttpWrapperService} from "./httpWrapperService";
import {Router} from "angular2/router";
import {Group} from "../../backend/model/group";

@Injectable()
export class UserService {
    private http: HttpWrapperService = null;
    private path: string;
    private subscribers: any[] = [];

    constructor(private router: Router, http: HttpWrapperService, @Inject('App.BackendPath') path: string) {
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
        return token != null && token != "";
    }

    changeProfile(newName: string, newSmallPictureLink: string, newLargePictureLink: string) {
        return this.http.post(this.path + 'user/change-profile', JSON.stringify({'username': newName, 'smallPicture': newSmallPictureLink, 'largePicture': newLargePictureLink}), true, false, true);
    }

    getUser(email: string, password: string): Observable<Response> {
        return this.http.post(this.path + 'user/login', JSON.stringify({'email': email, 'password': password}), true, false, false);
    }

    registerUser(name: string, password: string, email: string, registrar: string): Observable<Response> {
        return this.http.post(this.path + 'user/register', JSON.stringify({'username': name, 'password': password, 'email': email, 'registrar': registrar}), true, false, false);
    }

    loginUserFacebook(id: string, name: string, email: string, pictureSmall: string, pictureLarge: string): Observable<Response> {
        return this.http.post(this.path + 'user/login-facebook', JSON.stringify({'name': name, 'email': email, 'facebookId': id, 'pictureSmall': pictureSmall, 'pictureLarge': pictureLarge, 'registrar': 'facebook'}), true, false, false);
    }

    getUserPicture(type: string) {
        return this.http.post(this.path + 'user/get-picture', JSON.stringify({'type': type}), true, false, true);
    }

    getUsername(callback: (name: string) => any) {
        var token = localStorage.getItem('token');
        if (token == null || token == "") callback("");
        var payloadEncoded = token.split('.')[1];
        var payloadDecoded = atob(payloadEncoded);
        callback(JSON.parse(payloadDecoded).name);
    }

    getUserId(callback: (name: string) => any) {
        var token = localStorage.getItem('token');
        if (token == null || token == "") callback("");
        var payloadEncoded = token.split('.')[1];
        var payloadDecoded = atob(payloadEncoded);
        callback(JSON.parse(payloadDecoded).id);
    }

    getImageLinks(callback: (smallImageLink: string, largeImageLink: string) => any) {
        this.getUserPicture('small').subscribe((res1: Response) => {
            this.getUserPicture('large').subscribe((res2: Response) => {
                callback(res1.text(), res2.text());
            });
        });
    }

    getAllGroupsOfUser(_userId:string): Observable<Group> {
        return this.http.get(this.path + 'user/' + _userId +'/groups').map((res: Response) => res.json());
    }
}