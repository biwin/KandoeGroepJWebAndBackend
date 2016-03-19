import {CircleSessionDao} from "../dao/circleSessionDao";

import {ChatManager} from "./chatManager";
import {UserManager} from "./userManager";
import {ThemeManager} from "./themeManager";
import {GroupManager} from "./groupManager";

import {User} from "../model/user";
import {Card} from "../model/card";
import {Group} from "../model/group";
import {Theme} from "../model/theme";
import {CardPosition} from "../model/cardPosition";
import {CircleSession} from "../model/circleSession";
import {CircleSessionCardWrapper} from "../model/circleSessionCardWrapper";
import {CircleSessionCreateWrapper} from "../model/circleSessionCreateWrapper";

/**
 * Class that is responsible for managing what data will be send to the database layer for circlesession. 
 * Uses circlesessionCardWrapper and createwrapper to simplify the imput the frontend should provide.
 * Gains information from chatmanager, usermanager, thememanager and groupmanager when needed for an circlesession.
 */
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
            var arr:CircleSession[] = [];
            var i = 0;

            c.forEach((cs:CircleSession) => {
                this.checkInProgress(cs, (s:CircleSession) => {
                    arr.push(s == null ? cs : s);

                    if (++i == c.length) {
                        callback(arr);
                    }
                });
            });
        });
    }

    getCircleSession(id:string, callback:(c:CircleSession) => any) {
        this._dao.readCircleSession(id, (cs:CircleSession) => {
            if(cs != null) {
                this.checkInProgress(cs, callback);
            } else {
                callback(null);
            }
        });
    }

    cardUp(sessionId:string, cardId:string, userId:string, callback:(newPlayerId:string, updatedCardPosition:CardPosition, errMessage?:string) => any) {
        this._dao.cardPositionExists(sessionId, cardId, (exists:boolean) => {
            if (exists) {
                this._dao.readCircleSession(sessionId, (c:CircleSession) => {
                    if(c._currentPlayerId !== userId) {
                        callback(c._currentPlayerId, null, "Not your turn!");
                    } else {
                        if(c._isStopped) {
                            callback(userId, null, "Game is over");
                        } else {
                            this._dao.getCardPosition(sessionId, cardId, (c:CardPosition) => {
                                var newPosition:number = c._position + 1;
                                if (newPosition > 5) {
                                    callback(userId, null, "Card already in the middle!");
                                } else {
                                    this._dao.updateCardPosition(sessionId, cardId, userId, c._userId, newPosition, (c:CardPosition) => {
                                        if (c != null) {
                                            this.nextPlayer(sessionId, (roundEnds:boolean, newPlayerId:string) => {
                                                callback(newPlayerId, c);
                                            });
                                        } else {
                                            callback(userId, null, "Something went wrong while updating the position");
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            } else {
                callback(userId, null, "Card is not in the game.");
            }
        })
    }

    getCircleSessionsOfUserById(userId:string, callback:(circleSessions:CircleSession[])=> any) {
        this._dao.getCircleSessionsOfUserById(userId, (c:CircleSession[]) => {
            var arr:CircleSession[] = [];
            var i = 0;

            if(c.length == 0) {
                callback(arr);
            } else {
                c.forEach((cs:CircleSession) => {
                    this.checkInProgress(cs, (s:CircleSession) => {
                        arr.push(s == null ? cs : s);

                        if (++i == c.length) {
                            callback(arr);
                        }
                    });
                });
            }
        });
    }

    getCircleSessionCards(circleSessionId:string, callback:(wrappers:CircleSessionCardWrapper[]) => any) {
        var tMgr:ThemeManager = new ThemeManager();
        var circleSessionCardWrappers:CircleSessionCardWrapper[] = [];
        this._dao.readCircleSession(circleSessionId, (c:CircleSession) => {
            tMgr.getCards(c._themeId, (cards:Card[]) => {
                var a:number = 0;
                cards.forEach((c:Card) => {
                    this._dao.cardPositionExists(circleSessionId, c._id, (b:boolean ) => {
                        circleSessionCardWrappers.push(new CircleSessionCardWrapper(c, b));
                        if (++a == cards.length) {
                            callback(circleSessionCardWrappers);
                        }
                    });
                });
            })
        });
    }

    initCardsForSession(uId:string, circleSessionId:string, cardIds:string[], callback:(preGameEnded:boolean, currentUserId:string, errMessage?:string) => any) {
        this.getCircleSession(circleSessionId, (c:CircleSession) => {
            if (c._inProgress && c._isPreGame) {
                if (c._currentPlayerId !== uId) {
                    callback(null, null, "Not your turn!");
                } else {
                    if(c._isStopped){
                        callback(null,null,"Game is over")
                    } else {
                        this._dao.getCardPositionsForCardIds(circleSessionId, cardIds, (cps:CardPosition[]) => {
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
                    }
                }
            } else {
                callback(null, null, "The game is not in the pre-game phase.");
            }
        });
    }

    deleteCircleSession(currentUserId:string, circleSessionId:string, callback:() => any) {
        this.getCircleSession(circleSessionId, (c:CircleSession) => {
            if (c._creatorId == currentUserId) {
                this._dao.deleteCircleSessionById(circleSessionId, (b:boolean) => {
                    this._dao.deleteCardPositionsByCircleSessionId(circleSessionId, (b:boolean) => {
                        var chatMgr:ChatManager = new ChatManager();
                        chatMgr.removeChatOfCircleSession(circleSessionId, callback);
                    });
                });
            }
        });
    }

    checkInProgress(c:CircleSession, callback:(circleSession:CircleSession)=>any) {
        var inProgress:boolean = c._inProgress;

        if(c._inProgress !== true) {
            if (c._startDate == null || c._startDate.length !== 16) {
                c._inProgress = true;
            } else {
                var now:Date = new Date(Date.now());
                var startDate:Date = new Date(Date.parse(c._startDate));

                c._inProgress = now >= startDate;
            }

            if (c._inProgress !== inProgress) {
                this._dao.updateInProgress(c._id, c._inProgress, () => {
                    callback(c);
                });
            } else {
                callback(c);
            }
        } else {
            callback(c);
        }
    }

    private nextPlayer(circleSessionId:string, callback:(roundEnded:boolean, currentUserId:string)=>any) {
        this._dao.readCircleSession(circleSessionId, (c:CircleSession) => {
            var currentIndex:number = c._userIds.indexOf(c._currentPlayerId);
            var newIndex:number = -1;
            var roundEnded:boolean = false;

            if (currentIndex === c._userIds.length - 1) {
                newIndex = 0;
                roundEnded = true;
            } else {
                newIndex = currentIndex + 1;
            }

            var newPlayerId:string = c._userIds[newIndex];
            var preGameInProgress:boolean = c._isPreGame && !roundEnded;

            this._dao.updateCurrentPlayer(circleSessionId, newPlayerId, preGameInProgress, (success:boolean) => {
                if (success) {
                    if(c._endPoint != null && roundEnded && !c._isPreGame) {
                        var newRoundsLeft:number = c._endPoint - 1;
                        var gameStopped:boolean = newRoundsLeft <= 0;

                        this._dao.updateRounds(circleSessionId, newRoundsLeft, gameStopped, () => {
                            callback(roundEnded, newPlayerId);
                        });
                    } else {
                        callback(roundEnded, newPlayerId);
                    }
                } else {
                    callback(null, null);
                }
            });
        });
    }

    addUser(currentUserId:string, circleSessionId:string, email:string, callback:(b:boolean) => any) {
        var uMgr:UserManager = new UserManager();
        this.getCircleSession(circleSessionId, (c:CircleSession) => {
            if (c._creatorId == currentUserId && !c._inProgress) {
                uMgr.getUserByEmail(email, (u:User) => {
                    if (c._userIds.indexOf(u._id.toString()) < 0) {
                        this._dao.addUserToCircleSession(circleSessionId, u._id.toString(), callback);
                    } else {
                        callback(false);
                    }
                });
            } else {
                callback(false);
            }
        });
    }

    getCardPositions(circleSessionId:string, callback:(cps:CardPosition[]) => any) {
        this._dao.getCardPositions(circleSessionId, callback);
    }

    stopGame(sessionId:string, userId:string, callback:(stopped:boolean, err?:string) => any) {
        this.getCircleSession(sessionId, (c:CircleSession) => {
            if(c._creatorId !== userId) {
                callback(false, "You're not the owner of this session!");
            } else {
                this._dao.stopGame(sessionId, callback);
            }
        });
    }
}