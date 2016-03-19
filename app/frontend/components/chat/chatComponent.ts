/// <reference path="../../../../typings/socket.io.d.ts" />
/// <reference path="../../../../typings/jquery/jquery.d.ts" />

import {Component, Input, OnChanges, NgZone} from "angular2/core";
import {ChatMessage} from "../../../backend/model/chatMessage";
import {CircleSessionService} from "../../services/circleSessionService";
import {CORE_DIRECTIVES} from "angular2/common";
import {LoadingSpinner} from "../general/loadingSpinner";
import {SocketService} from "../../services/socketService";

@Component({
    selector: 'chatbox',
    template: `
    <loading *ngIf="!initComplete"></loading>
    <div [hidden]="!initComplete">
        <div class="row" id="message-list">
            <p *ngFor="#message of messages">{{message._userName}}: {{message._message}}</p>
         </div>
         <div class="row" id="sendbox">
                <div class="input-field col s12">
                    <input [(ngModel)]="messageToSend" (keyup)="typing($event)" placeholder="Typ een bericht..." type="text" autocomplete="off"/>
                </div>
            </div>
     </div>
    `,
    directives: [CORE_DIRECTIVES, LoadingSpinner]
})

export class ChatComponent implements OnChanges {
    @Input() private sessionId;
    @Input() private userId;
    private messages: ChatMessage[] = [];
    private messageToSend: string = "";
    private initComplete:boolean = false;
    private service:CircleSessionService;
    private webSocket:SocketService;

    public constructor(service:CircleSessionService, webSocket:SocketService) {
        this.service = service;
        this.webSocket = webSocket;
    }

    prepareWebSocket() {
        this.webSocket.joinSession(this.sessionId || 'Unknown');
        this.webSocket.subscribeToChatReceive((data:any, zone:NgZone) => {
            zone.run(() => {
                this.messages.push(JSON.parse(data));
                this.scrollToBottom();
            });
        });
    }

    typing($event:KeyboardEvent) {
        if($event.which === 13) {
            this.submit();
        }
    }

    ngOnChanges() {
        if(!this.initComplete && this.sessionId !== undefined) {
            this.prepareWebSocket();
            this.service.getMessages(this.sessionId).subscribe((chatMessages:ChatMessage[]) => {
                this.messages = chatMessages;
                this.initComplete = true;
                setTimeout(this.scrollToBottom, 1000);
            });
        }
    }

    submit() {
        if(this.initComplete && this.messageToSend.trim().length > 0) {
            this.webSocket.emitChatSend(new ChatMessage(this.userId || 'Unknown', this.messageToSend || 'Unknown', this.sessionId, new Date()));
            this.messageToSend = "";
        }
    }

    scrollToBottom() {
        $('#message-list').animate({
            scrollTop: $('#message-list')[0].scrollHeight
        }, 500);
    }
}