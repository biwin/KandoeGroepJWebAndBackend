import {ThemeDao} from "../dao/themeDao";
import {Theme} from "../model/theme";
import {Card} from "../model/card";

export class ThemeManager {
    private _dao:ThemeDao;

    constructor() {
        this._dao = new ThemeDao();
    }

    clearDatabase(callback:() => any) {
        this._dao.clearDatabase(callback);
    }

    createTheme(theme: Theme, callback: (t: Theme) => any) {
        this._dao.createTheme(theme, callback);
    }

    getTheme(id: string, callback: (t: Theme) => any) {
        this._dao.readTheme(id, callback);
    }

    removeThemeById(themeId: string, callback: (deleted: boolean) => any) {
        this._dao.deleteThemeById(themeId, callback);
    }

    createCard(card:Card, callback: (c:Card) => any) {
        this._dao.createCard(card, callback);
    }

    getAllThemes(callback: (t:Theme[]) => any) {
        this._dao.readAllThemes(callback);
    }

    getCards(themeId:string, callback:(c:Card[])=>any) {
        this._dao.readCards(themeId, callback);
    }
}