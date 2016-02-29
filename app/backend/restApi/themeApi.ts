import {ThemeManager} from "../logic/themeManager";
import {Theme} from "../model/theme";
import {Card} from "../model/card";
export class ThemeApi {
    private static mgr:ThemeManager = new ThemeManager();

    public static find(id:string, res) {
        ThemeApi.mgr.getTheme(id, (t:Theme) => {
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

    public static createCard(card:Card, themeId:string, res) {
        ThemeApi.mgr.createCard(new Card(card._name, themeId), (c:Card) => {
            res.send(c);
        });
    }

    public static getCards(themeId:string, res) {
        ThemeApi.mgr.getCards(themeId, (c:Card[]) => {
            res.send(c);
        });
    }
}