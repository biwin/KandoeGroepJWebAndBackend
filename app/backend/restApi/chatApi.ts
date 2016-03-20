import {Response, Request} from "express";

import {ChatManager} from "../logic/chatManager";

import {ChatMessage} from "../model/chatMessage";

/**
 * Class that is responsible for exstracting data from the request and sending it to the chatmanager
 */
export class ChatApi {
    private static mgr:ChatManager = new ChatManager();

    public static addMessage(message:string, callback:(updatedMessage:ChatMessage) => any){
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