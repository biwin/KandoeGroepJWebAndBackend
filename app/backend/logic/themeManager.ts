import {ThemeDao} from "../dao/themeDao";
import {Theme} from "../model/theme";
import {Card} from "../model/card";
import {OrganisationManager} from "./organisationManager";
import {Organisation} from "../model/organisation";

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

    getAllThemes(userId:string, callback: (t:Theme[]) => any) {
        var oMgr:OrganisationManager = new OrganisationManager();
        var myAccesableThemes:Theme[] = [];

        this._dao.readAllThemes(userId, (themes:Theme[]) =>{

            myAccesableThemes = themes;

            oMgr.getAllOrganisationIdsOfUserById(userId, (organisationIds:string[]) => {
                var counter:number = 0;
                organisationIds.forEach((organisationId:string) => {
                    this._dao.readAllThemesByOrganisationId(organisationId, (organisationThemes:Theme[]) => {
                        organisationThemes.forEach((theme:Theme) =>{
                            if(JSON.stringify(myAccesableThemes).indexOf(JSON.stringify(theme)) < 0){
                                myAccesableThemes.push(theme);
                            };
                        });
                        if(++counter == organisationIds.length){
                            callback(myAccesableThemes);
                        }
                    });
                });
            });
        });
    }

    getCards(themeId:string, callback:(c:Card[])=>any) {
        this._dao.readCards(themeId, callback);
    }

    removeCardFromTheme(themeId:string, cardId:string, callback:(b:boolean) => any) {
        this._dao.clearThemeIdOfCard(themeId, cardId, callback);
    }

    deleteCardsFromTheme(themeId:string, callback:(amount:number) => any) {
        this._dao.removeCardsFromTheme(themeId, callback);
    }

    createSubTheme(theme:Theme, parentThemeId:string, callback:(theme:Theme) => any) {
        this.createTheme(theme, (theme:Theme) =>{
           if(parentThemeId != ""){
               this._dao.addSubThemeToTheme(parentThemeId, theme._id, (b:boolean) => {
                   if(b)
                       callback(theme);
                   else
                       callback(null);
               });
           }
        });
    }

    getCardsByIds(cardIds:string[], callback:(cs:Card[])=>any) {
        this._dao.readCardsByIds(cardIds, callback);
    }
}