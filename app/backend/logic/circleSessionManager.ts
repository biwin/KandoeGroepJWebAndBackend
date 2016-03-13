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

    createCircleSession(wrapper:CircleSessionCreateWrapper, callback:(c:CircleSession) => any) {
        var circleSession = wrapper._circleSession;
        this._dao.circleSessionExists(circleSession, (exists:boolean) => {
            if (exists) {
                callback(null);
            } else {
                var uMgr:UserManager = new UserManager();
                var tMgr:ThemeManager = new ThemeManager();
                var gMgr:GroupManager = new GroupManager();

                gMgr.getGroupById(circleSession._groupId, (g:Group) => {
                    circleSession._name = g._name + " - ";

                    tMgr.getTheme(circleSession._themeId, (t:Theme) => {
                        circleSession._name += t._name;

                        gMgr.getUserIdsInGroup(circleSession._groupId, (us:string[]) => {
                            circleSession._userIds = us;

                            uMgr.getUserIdsByEmail(wrapper._userEmailAdresses, (users:string[]) => {
                                if (users.length == 0) {
                                    this._dao.createCircleSession(circleSession, callback);
                                } else {
                                    var counter = 0;
                                    users.forEach((u:string) => {
                                        if (circleSession._userIds.indexOf(u) < 0) {
                                            circleSession._userIds.push(u);
                                        }
                                        if (++counter == users.length) {
                                            circleSession._currentPlayerId = circleSession._userIds[0];
                                            this._dao.createCircleSession(circleSession, callback);
                                        }
                                    });
                                }
                            });
                        });
                    });
                });
            }
        });
    }

    getAllCircleSessions(callback:(c:CircleSession[]) => any) {
        this._dao.readAllCircleSessions((c:CircleSession[]) => {
            callback(c.map(this.checkInProgress));
        });
    }

    getCircleSession(id:string, callback:(c:CircleSession) => any) {
        this._dao.readCircleSession(id, (cs:CircleSession) => {
            callback(this.checkInProgress(cs));
        });
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
        this._dao.getCircleSessionsOfUserById(userId, (circleSessions:CircleSession[]) => callback(circleSessions.map(this.checkInProgress)));
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
                    this._dao.cardPositionExists(circleSessionId, c._id, (b:boolean, n:number) => {
                        circleSessionCardWrappers.push(new CircleSessionCardWrapper(c, b));
                        if (++a == cards.length) {
                            callback(circleSessionCardWrappers);
                        }
                    });
                });
            })
        });
    }

    initCardsForSession(uId:string, circleSessionId:string, cardIds:string[], callback:(preGameEnded:boolean, currentUserId:string) => any) {
        this._dao.readCircleSession(circleSessionId, (c:CircleSession) => {
            if (c.isInProgress && c._isPreGame) {
                if (c._currentPlayerId !== uId) {
                    throw new Error("Not your turn!");
                }
                this._dao.getCardPositions(circleSessionId, cardIds, (cps:CardPosition[]) => {
                    for (var i = 0; i < cps.length; i++) {
                        var index = cardIds.indexOf(cps[i]._id);
                        if (index > -1) {
                            cardIds.splice(index, 1);
                        }
                    }

                    if (cardIds.length > 0) {
                        this._dao.createCardPositions(circleSessionId, cardIds, uId, () => {
                            this.nextPlayer(circleSessionId, callback);
                        });
                    } else {
                        this.nextPlayer(circleSessionId, callback);
                    }
                });
            } else {
                callback(null, c._currentPlayerId);
            }
        });
    }

    deleteCircleSession(currentUserId:string, circleSessionId:string, callback:() => any) {
        this.getCircleSession(circleSessionId, (c:CircleSession) => {
            if (c._creatorId == currentUserId) {
                this._dao.deleteCircleSessionById(circleSessionId, (b:boolean) => {
                    this._dao.deleteCardPositionsByCircleSessionId(circleSessionId, callback);
                });
            }
        });
    }

    checkInProgress(c:CircleSession):CircleSession {
        if (c._startDate == null || c._startDate.length !== 16) {
            c._inProgress = true;
        } else {
            var now:Date = new Date(Date.now());
            var splittedDateAndTime:string[] = c._startDate.split(' ');
            var splittedDate:number[] = splittedDateAndTime[0].split('/').map((i:string) => parseInt(i));
            var splittedTime:number[] = splittedDateAndTime[1].split(':').map((i:string) => parseInt(i));

            var startDate:Date = new Date(Date.UTC(splittedDate[2], splittedDate[1] - 1, splittedDate[0], splittedTime[0], splittedTime[1]));

            c._inProgress = now >= startDate;
        }

        return c;
    }

    private nextPlayer(circleSessionId:string, callback:(roundEnded:boolean, currentUserId:string)=>any) {
        this._dao.readCircleSession(circleSessionId, (c:CircleSession) => {
            var currentIndex:number = c._userIds.indexOf(c._currentPlayerId);
            var newIndex:number = -1;
            var roundEnded:boolean = false;

            if(currentIndex === c._userIds.length - 1) {
                newIndex = 0;
                roundEnded = true;
            } else {
                newIndex = currentIndex + 1;
            }

            var newPlayerId:string = c._userIds[newIndex];
            var preGameInProgress:boolean = c._isPreGame && !roundEnded;

            this._dao.updateCurrentPlayer(circleSessionId, newPlayerId, preGameInProgress,(success:boolean) => {
                if(success) {
                    callback(roundEnded, newPlayerId);
                } else {
                    callback(null, null);
                }
            });
        });
    }
}