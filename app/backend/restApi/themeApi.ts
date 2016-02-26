import {ThemeManager} from "../logic/themeManager";
import {Theme} from "../model/theme";
export class ThemeApi {
    private static mgr:ThemeManager = new ThemeManager();

    public static find(name:string, res) {
        ThemeApi.mgr.getTheme(name, (t:Theme) => {
            res.send(t);
        });
    }

    public static findAll(res) {
        ThemeApi.mgr.getAllThemes((t:Theme[]) => {
            res.send(t);
        });
    }

    public static create(theme:Theme, res){
        ThemeApi.mgr.createTheme(theme, (t:Theme) => {
            res.send(t);
        });
    }
}