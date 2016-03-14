import {Injectable, Inject} from "angular2/core";
import {Response, Headers} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {HttpWrapperService} from "./httpWrapperService";
import {Theme} from "../../backend/model/theme";
import {Card} from "../../backend/model/card";

@Injectable()
export class ThemeService {
    private http: HttpWrapperService = null;
    private path: string;

    constructor(http: HttpWrapperService, @Inject('App.BackendPath') path: string) {
        this.path = path;
        this.http = http;
    }

    getAll(): Observable<Theme[]> {
        return this.http.get(this.path + 'themes', false, true, true);
    }

    getTheme(themeId: string): Observable<Theme>{
        return this.http.get(this.path + 'themes/' + themeId, false, true, true);
    }

    create(theme: Theme): Observable<Theme>{
        return this.http.post(this.path + 'themes', JSON.stringify(theme), true, true, true);
    }

    createCard(name: string, themeId: string): Observable<Card> {
        return this.http.post(this.path + 'themes/' + themeId, JSON.stringify({'_name': name}), true, true, true);
    }

    getCards(themeId: string): Observable<Card[]> {
        return this.http.get(this.path + 'themes/' + themeId + '/cards', false, true, true);
    }

    unlinkCard(themeId: string, cardId: string): Observable<boolean> {
        return this.http.delete(this.path + 'themes/' + themeId + '/cards/' + cardId, false, false, true);
    }

    deleteTheme(themeId: string): Observable<boolean> {
        return this.http.delete(this.path + 'themes/' + themeId, false, false, true);
    }

    getCardsByIds(cardIds:string[]):Observable<Card[]> {
        return this.http.get(this.path + 'themes/cards/' + encodeURI(JSON.stringify(cardIds)), true, true, true);
    }
}