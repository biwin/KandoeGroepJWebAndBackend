import {ThemeDao} from "../dao/themeDao";
import {Theme} from "../model/theme";
export class ThemeManager {
<<<<<<< HEAD

=======
>>>>>>> e405ab9b5b66cf6cab3f1576b13adddc8e3de3e5
    private _dao:ThemeDao;

    constructor() {
        this._dao = new ThemeDao();
    }

    clearDatabase(callback:() => any) {
        this._dao.clearDatabase(callback);
    }

<<<<<<< HEAD
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
=======
    get(name:string, callback:(t:Theme) => any) {
        this._dao.read(name, callback);
    }

    add(t:Theme, callback:() => any) {
        this._dao.create(t, callback);
>>>>>>> e405ab9b5b66cf6cab3f1576b13adddc8e3de3e5
    }
}