import {ThemeManager} from "../logic/themeManager";
import {Theme} from "../model/theme";
import {Card} from "../model/card";
import {Response,Request} from "express";

export class ThemeApi {
    private static mgr:ThemeManager = new ThemeManager();

    public static find(req:Request, res:Response) {
        ThemeApi.mgr.getTheme(req.params.id, (t:Theme) => {
            res.send(t);
        });
    }

    public static findAll(req:Request, res:Response) {
        ThemeApi.mgr.getAllThemes((t:Theme[]) => {
            res.send(t);
        });
    }

    public static create(req:Request, res:Response){
        ThemeApi.mgr.createTheme(req.body, (t:Theme) => {
            res.send(t);
        });
    }

    public static createCard(req:Request, res:Response) {
        var card:Card = req.body;
        var themeId:string = req.params.id;
        ThemeApi.mgr.createCard(new Card(card._name, themeId), (c:Card) => {
            res.send(c);
        });
    }

    public static getCards(req:Request, res:Response) {
        ThemeApi.mgr.getCards(req.params.id, (c:Card[]) => {
            res.send(c);
        });
    }

    public static deleteThemeWithCards(req:Request, res:Response) {
        var themeId:string = req.params.id;
        ThemeApi.mgr.removeThemeById(themeId, (b: boolean) => {
            if(b) {
                ThemeApi.mgr.deleteCardsFromTheme(themeId, (amount:number) => {
                    res.send({'deletedCards': amount});
                });
            } else {
                res.status(404).send("Theme not found");
            }
        });
    }

    /*
    * Unlink card from theme, but don't really delete it, so that it won't ghost out in an existing circlesession
    * */
    public static deleteCardFromTheme(req:Request, res:Response) {
        var themeId = req.params.id;
        var cardId = req.params.cid;
        ThemeApi.mgr.removeCardFromTheme(themeId, cardId, (b:boolean) => {
            res.status(b ? 200 : 404).send(b);
        });
    }
}