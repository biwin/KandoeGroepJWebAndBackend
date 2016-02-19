import {ThemeDao} from "../dao/themeDao";
import {Theme} from "../model/theme";
export class ThemeManager {
    private _dao:ThemeDao;

    constructor() {
        this._dao = new ThemeDao();
    }

    clearDatabase(callback:() => any) {
        this._dao.clearDatabase(callback);
    }

    get(name:string, callback:(t:Theme) => any) {
        this._dao.read(name, callback);
    }

    add(t:Theme, callback:() => any) {
        this._dao.create(t, callback);
    }
}