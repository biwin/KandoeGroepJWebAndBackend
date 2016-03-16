import {ChatMessage} from "../model/chatMessage";
import {ChatDao} from "../dao/chatDao";
import {UserManager} from "./userManager";
import {User} from "../model/user";

export class ChatManager {
    private _dao:ChatDao;
    private _uMgr:UserManager = new UserManager();

    constructor() {
        this._dao = new ChatDao();
    }

    addMessage(message:ChatMessage, callback:(isSaved:boolean, updateMessage:ChatMessage) => any) {
        this._dao.addMessage(message, (b:boolean) => {
            this._uMgr.getUserById(message._userId, (u:User) => {
                message._userName = u._name;
                callback(b, message);
            });
        });
    }

    getMessages(sessionId:string, callback:(msgs:ChatMessage[])=>any) {
        this._dao.readMessages(sessionId, (msgs:ChatMessage[]) => {
            var userIds:string[] = msgs.map((msg:ChatMessage) => msg._userId);
            this._uMgr.getUsers(userIds, (us:User[]) => {
                var ms:ChatMessage[] = msgs.map((msg:ChatMessage) => {
                    msg._userName = us.find((u:User) => msg._userId === u._id.toString())._name;
                    return msg;
                });
                callback(ms);
            });
        });
    }
}