import {ChatManager} from "../logic/chatManager";
import {ChatMessage} from "../model/chatMessage";
import {Response} from "express";
import {Request} from "express";

export class ChatApi {
    private static mgr:ChatManager = new ChatManager();

    public static addMessage(message:string, callback:(isSaved:boolean, updatedMessage:ChatMessage) => any){
        var messageObject:ChatMessage = JSON.parse(message);
        ChatApi.mgr.addMessage(messageObject, callback);
    }

    public static getMessages(req:Request, res:Response) {
        var sessionId:string = req.params.id;

        ChatApi.mgr.getMessages(sessionId, (msgs:ChatMessage[]) => {
            res.send(msgs);
        });
    }
}