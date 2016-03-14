import {ThemeManager} from "../logic/themeManager";
import {Theme} from "../model/theme";
import {Card} from "../model/card";
import {Response,Request} from "express";
import {UserApi} from "./userApi";

export class ThemeApi {
    private static mgr:ThemeManager = new ThemeManager();

    public static find(req:Request, res:Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId:string) => {
            if (currentUserId != null) {
                ThemeApi.mgr.getTheme(req.params.id, (t:Theme) => {
                    res.send(t);
                });
            }else {
                res.status(401).send({error:'Unauthorized'});
            }
        });
    }

    public static findAll(req:Request, res:Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId:string) => {
            if (currentUserId != null) {
                ThemeApi.mgr.getAllThemes(currentUserId, (t:Theme[]) => {
                    res.send(t);
                });
            }else {
                res.status(401).send({error:'Unauthorized'});
            }
        });
    }

    public static create(req:Request, res:Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId:string) => {
            if (currentUserId != null) {
                var theme:Theme = req.body;
                theme._organisatorIds = [currentUserId];
                ThemeApi.mgr.createTheme(req.body, (t:Theme) => {
                    res.send(t);
                });
            }else {
                res.status(401).send({error:'Unauthorized'});
            }
        });
    }

    public static createCard(req:Request, res:Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId:string) => {
            if (currentUserId != null) {
                var card:Card = req.body;
                var themeId:string = req.params.id;
                ThemeApi.mgr.createCard(new Card(card._name, themeId), (c:Card) => {
                    res.send(c);
                });
            }else {
                res.status(401).send({error:'Unauthorized'});
            }
        });
    }

    public static getCards(req:Request, res:Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId:string) => {
            if (currentUserId != null) {
                ThemeApi.mgr.getCards(req.params.id, (c:Card[]) => {
                    res.send(c);
                });
            }else {
                res.status(401).send({error:'Unauthorized'});
            }
        });
    }

    public static deleteThemeWithCards(req:Request, res:Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId:string) => {
            if (currentUserId != null) {
                var themeId:string = req.params.id;
                ThemeApi.mgr.removeThemeById(themeId, (b:boolean) => {
                    if (b) {
                        ThemeApi.mgr.deleteCardsFromTheme(themeId, (amount:number) => {
                            res.send({'deletedCards': amount});
                        });
                    } else {
                        res.status(404).send("Theme not found");
                    }
                });
            }else {
                res.status(401).send({error:'Unauthorized'});
            }
        });
    }

    /*
     * Unlink card from theme, but don't really delete it, so that it won't ghost out in an existing circlesession
     * */
    public static deleteCardFromTheme(req:Request, res:Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId:string) => {
            if (currentUserId != null) {
                var themeId = req.params.id;
                var cardId = req.params.cid;
                ThemeApi.mgr.removeCardFromTheme(themeId, cardId, (b:boolean) => {
                    res.status(b ? 200 : 404).send(b);
                });
            }else {
                res.status(401).send({error:'Unauthorized'});
            }
        });
    }

    public static getCardsByIds(req:Request, res:Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId:string) => {
            if(currentUserId != null) {
                ThemeApi.mgr.getCardsByIds(JSON.parse(req.params.array), (cs:Card[]) => {
                    res.send(cs);
                });
            } else {
                res.status(401).send({error:'Unauthorized'});
            }
        });
    }
}