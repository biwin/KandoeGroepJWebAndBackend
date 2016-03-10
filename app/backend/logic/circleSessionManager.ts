import {CircleSession} from "../model/circleSession";
import {CircleSessionDao} from "../dao/circleSessionDao";
import {CardPosition} from "../model/cardPosition";
import {GroupManager} from "./groupManager";
import {ThemeManager} from "./themeManager";
import {Theme} from "../model/theme";
import {Group} from "../model/group";
import {CircleSessionCreateWrapper} from "../model/circleSessionCreateWrapper";
import {UserManager} from "./userManager";
import {User} from "../model/user";
import {CircleSessionCardWrapper} from "../model/circleSessionCardWrapper";
import {Card} from "../model/card";
export class CircleSessionManager {
    private _dao:CircleSessionDao;

    constructor() {
        this._dao = new CircleSessionDao();
    }

    createCircleSession(circleSessionCreateWrapper:CircleSessionCreateWrapper, callback:(c:CircleSession) => any) {
        var circleSession = circleSessionCreateWrapper._circleSession;
        this._dao.circleSessionExists(circleSession, (exists:boolean) => {
            if (exists) {
                callback(null);
            } else {
                var uMgr:UserManager = new UserManager();
                var tMgr:ThemeManager = new ThemeManager();
                var gMgr:GroupManager = new GroupManager();

                uMgr.getUserIdsByEmail(circleSessionCreateWrapper._userEmailAdresses, (users:string[]) => {
                    var done:number = 0;
                    users.forEach((u:string) => {
                        circleSession._userIds.push(u);
                        if (++done == users.length) {
                            gMgr.getGroupById(circleSession._groupId, (g:Group) => {
                                circleSession._name = g._name + " - ";

                                tMgr.getTheme(circleSession._themeId, (t:Theme) => {
                                    circleSession._name += t._name;

                                    gMgr.getUserIdsInGroup(circleSession._groupId, (us:string[]) => {
                                        var changed:number = 0;
                                        us.forEach((u:string) => {
                                            if (circleSession._userIds.indexOf(u) < 0) {
                                                circleSession._userIds.push(u);
                                            }
                                            if (++changed == us.length) {
                                                this._dao.createCircleSession(circleSession, callback);
                                            }
                                        });
                                    });
                                });
                            });
                        }
                    });
                });
            }
        });
    }

    getAllCircleSessions(callback:(c:CircleSession[]) => any) {
        this._dao.readAllCircleSessions(callback);
    }

    getCircleSession(id:string, callback:(c:CircleSession) => any) {
        this._dao.readCircleSession(id, callback);
    }

    cardUp(sessionId:string, cardId:string, userId:string, callback:(cp:CardPosition) => any) {
        /*
         * kijken of een cardposition voor gegeven data bestaat
         * indien ja: updaten
         * indien nee: nieuwe maken
         *
         * altijd: timestamp op huidige tijd
         *
         * cardposition teruggeven
         * */

        this._dao.cardPositionExists(sessionId, cardId, (exists:boolean, position:number) => {
            if (exists) {
                if (position < 5) {
                    this._dao.updateCardPosition(sessionId, cardId, userId, position++, callback);
                } else {
                    this._dao.getCardPosition(sessionId, cardId, callback);
                }
            } else {
                this._dao.createCardPosition(sessionId, cardId, userId, callback);
            }
        })
    }

    getCircleSessionsOfUserById(userId:string, callback:(circleSessions:CircleSession[])=> any) {
        this._dao.getCircleSessionsOfUserById(userId, callback);
    }

    removeCircleSessionById(circleSessionId:string, callback:(b:boolean) => any) {
        this._dao.deleteCircleSessionById(circleSessionId, callback);
    }

    getCircleSessionCards(circleSessionId:string, callback:(wrappers:CircleSessionCardWrapper[]) => any) {
        var tMgr:ThemeManager = new ThemeManager();
        var circleSessionCardWrappers:CircleSessionCardWrapper[] = [];
        this._dao.readCircleSession(circleSessionId, (c:CircleSession) => {
            tMgr.getCards(c._themeId, (cards:Card[]) => {
                var a:number = 0;
                cards.forEach((c:Card) => {
                    this._dao.cardPositionExists(circleSessionId, c._id, (b:boolean) => {
                        circleSessionCardWrappers.push(new CircleSessionCardWrapper(c, b));
                        if (++a == cards.length) {
                            callback(circleSessionCardWrappers);
                        }
                    });
                });
            })
        });
    }

    initCardsForSession(uId:string, circleSessionId:string, cardIds:string[], callback:() => any) {
        this._dao.getCardPositions(circleSessionId, cardIds, (cps:CardPosition[]) => {
            for(var i = 0; i < cps.length; i++) {
                var index = cardIds.indexOf(cps[i]._id);
                if(index > -1) {
                    cardIds.splice(index, 1);
                }
            }

            var callsMade = 0;

            this._dao.createCardPositions(circleSessionId, cardIds, uId, callback);
        });
    }
}