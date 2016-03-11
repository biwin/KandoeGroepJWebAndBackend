import {Inject, Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {User} from "../../backend/model/user";
import {Http, Headers, Response, RequestOptionsArgs, RequestOptions} from "angular2/http";
import {RequestMethod} from "angular2/http";

@Injectable()
export class HttpWrapperService {
    private http: Http = null;
    private path: string;

    constructor(http: Http, @Inject('App.BackendPath') path: string) {
        this.path = path;
        this.http = http;
    }

    get<T>(url: string, isJson: boolean, needsJson: boolean, needsToken: boolean, options?: RequestOptionsArgs): Observable<T> {
        if (options == null) {
            options = new RequestOptions();
            options.headers = new Headers();
        }
        if (isJson) options.headers.append('Content-Type', 'application/json');
        if (needsToken) options.headers.append('Bearer', localStorage.getItem('token'));
        return this.http.get(url, options).map((res: Response) => {
            return needsJson ? res.json() : res;
        } );
    }

    post<T>(url: string, body: string, isJson: boolean, needsJson: boolean, needsToken: boolean, options?: RequestOptionsArgs): Observable<T> {
        if (options == null) {
            options = new RequestOptions();
            options.headers = new Headers();
        }
        if (isJson) options.headers.append('Content-Type', 'application/json');
        if (needsToken) options.headers.append('Bearer', localStorage.getItem('token'));
        return this.http.post(url, body, options).map((res: Response) => needsJson ? res.json() : res);
    }

    delete<T>(url: string, isJson: boolean, needsJson: boolean, needsToken: boolean, options?: RequestOptionsArgs): Observable<T> {
        if (options == null) {
            options = new RequestOptions();
            options.headers = new Headers();
        }
        if (isJson) options.headers.append('Content-Type', 'application/json');
        if (needsToken) options.headers.append('Bearer', localStorage.getItem('token'));
        return this.http.delete(url, options).map((res: Response) => {
            return needsJson ? res.json() : res;
        } );
    }


}