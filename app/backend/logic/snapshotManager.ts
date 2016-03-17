import {SnapshotDao} from "../dao/snaptshotDao";
import {Snapshot} from "../model/snapshot";
import {SnapshotCardWrapper} from "../model/snapshotCardWrapper";
import {CircleSessionManager} from "./circleSessionManager";
import {CircleSession} from "../model/circleSession";
import {UserManager} from "./userManager";
import {User} from "../model/user";
import {CardPosition} from "../model/cardPosition";
import {ThemeManager} from "./themeManager";
import {Card} from "../model/card";
import {ChatManager} from "./chatManager";
import {ChatMessage} from "../model/chatMessage";

export class SnapshotManager {
    private _dao:SnapshotDao;
    private _csManager:CircleSessionManager;
    private  _uManager:UserManager;
    private _tManager:ThemeManager;
    private _chatManager:ChatManager;

    constructor() {
        this._dao = new SnapshotDao();
        this._csManager = new CircleSessionManager();
        this._uManager = new UserManager();
        this._tManager = new ThemeManager();
        this._chatManager = new ChatManager();
    }

    createSnapshot(creatorId:string, circleSessionId:string, callback:(snapshot:Snapshot) => any) {
        var gameName:string;
        var playerNames:string[] = [];
        var snapshotCards:SnapshotCardWrapper[] = [];
        var timestamp:Date = new Date();

        this._csManager.getCircleSession(circleSessionId, (circleSession:CircleSession) => {
            gameName = circleSession._name;


            this._uManager.getUsers(circleSession._userIds, (users:User[]) => {
                playerNames = users.map((u:User) => u._name);

                this._csManager.getCardPositions(circleSessionId, (cardPositions:CardPosition[]) => {
                    this._tManager.getCardsByIds(cardPositions.map((c:CardPosition) => c._cardId), (cs:Card[]) => {
                        var counter:number = 0;
                        cardPositions.forEach((cardPosition:CardPosition) => {

                            var userHistoryOfPosition:string[] = users.filter((u:User) => cardPosition._userHistory.indexOf(u._id) >= 0).map((u:User) => u._name);

                            var cardName:string = cs.filter((c:Card) => {
                                return c._id.toString() === cardPosition._cardId;
                            })[0]._name;

                            var wrapper:SnapshotCardWrapper = new SnapshotCardWrapper(cardName, cardPosition._position, userHistoryOfPosition);

                            snapshotCards.push(wrapper);
                            if (++counter == cardPositions.length) {

                                this._chatManager.getMessages(circleSessionId, (chatMessages:ChatMessage[]) => {
                                    var newSnapshot:Snapshot = new Snapshot(creatorId, gameName, playerNames, snapshotCards, chatMessages,timestamp);
                                    this._dao.createSnapshot(newSnapshot, callback);
                                });

                            }
                        });
                    });
                })
            });
        });
    }

    getSnapshotsByUserId(userId:string, callback: (snapshots:Snapshot[]) => any){
        this._dao.readSnapshotsByUserId(userId, callback);
    }
}