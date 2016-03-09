import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Inject} from "angular2/core";
import {Theme} from "../../backend/model/theme";
import {Observable} from "rxjs/Observable";
import {Response} from "angular2/http";
import {Headers} from "angular2/http";
import "rxjs/add/operator/map";
import {Card} from "../../backend/model/card";

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

    getTheme(themeId:string):Observable<Theme>{
        return this.http.get(this.path + 'themes/' + themeId).map((res:Response) => res.json());
    }

    create(theme:Theme):Observable<Theme>{
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post(this.path + 'themes', JSON.stringify(theme), {headers:header}).map((res:Response) => res.json());
    }

    createCard(name:string, themeId:string):Observable<Card> {
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post(this.path + 'themes/' + themeId, JSON.stringify({'_name': name}), {headers:header}).map((res:Response) => res.json());
    }

    getCards(themeId:string):Observable<Card[]> {
        return this.http.get(this.path + 'themes/' + themeId + '/cards').map((res:Response) => res.json());
    }

    unlinkCard(themeId:string, cardId:string):Observable<boolean> {
        return this.http.delete(this.path + 'themes/' + themeId + '/cards/' + cardId).map((res:Response) => res.status == 200);
    }

    deleteTheme(id:string):Observable<boolean> {
        return this.http.delete(this.path + 'themes/' + id).map((res:Response) => res.status == 200);
    }
}
