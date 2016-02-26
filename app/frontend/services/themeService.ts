import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Inject} from "angular2/core";
import {Theme} from "../../backend/model/theme";
import {Observable} from "rxjs/Observable";
import {Response} from "angular2/http";
import {Headers} from "angular2/http";
import "rxjs/add/operator/map";

@Injectable()
export class ThemeService {
    private http:Http = null;
    private path:string;

    constructor(http:Http, @Inject('App.BackendPath') path:string) {
        this.path = path;
        this.http = http;
    }

    getAll():Observable<Theme[]> {
        return this.http.get(this.path + 'themes').map((res:Response) => res.json());
    }

    create(theme:Theme):Observable<Theme>{
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post(this.path + 'themes', JSON.stringify(theme), {headers:header}).map((res:Response) => res.json());
    }
}
