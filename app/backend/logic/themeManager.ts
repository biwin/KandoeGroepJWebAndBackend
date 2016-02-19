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

    createTheme(theme: Theme, callback: (t: Theme) => any) {
        this.themeExists(theme._name, (exists: boolean) => {
            if (exists) {
                callback(null);
            } else {
                this._dao.createTheme(theme, () => {
                    this.getTheme(theme._name, callback);
                });
            }
        });
    }

    getTheme(name: string, callback: (t: Theme) => any) {
        this._dao.readTheme(name, callback);
    }

    themeExists(name: string, callback: (b: boolean) => any) {
        this.getTheme(name, (t: Theme) => {
            callback(t != null);
        });
    }
}