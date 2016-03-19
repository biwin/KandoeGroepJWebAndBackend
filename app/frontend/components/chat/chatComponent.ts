/// <reference path="../../../../typings/socket.io.d.ts" />
/// <reference path="../../../../typings/jquery/jquery.d.ts" />

import {Component,Input,NgZone,OnChanges,Inject} from "angular2/core";
import {Router} from "angular2/router";
import {Response} from "angular2/http";

import {UserService} from "../../services/userService";
import {User} from "../../../backend/model/user";
import {ChatMessage} from "../../../backend/model/chatMessage";
import {CircleSessionService} from "../../services/circleSessionService";
import {CORE_DIRECTIVES} from "angular2/common";
import {LoadingSpinner} from "../general/loadingSpinner";

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
    private socket;
    private zone: NgZone;
    private messageToSend: string = "";
    private initComplete:boolean = false;
    private service:CircleSessionService;

    public constructor(service:CircleSessionService, @Inject('App.SocketUrl') socketUrl:string) {
        this.zone = new NgZone({enableLongStackTrace: false});
        this.socket = io.connect(socketUrl);
        this.socket.emit('join session', JSON.stringify({sessionId: this.sessionId || 'Unknown', userId: this.userId || 'Unknown'}));
        this.socket.on('send message', data => this.zone.run(() => {
            this.messages.push(JSON.parse(data));
            this.scrollToBottom();
        }));
        this.service = service;
    }

    typing($event:KeyboardEvent) {
        if($event.which === 13) {
            this.submit();
        }
    }

    ngOnChanges() {
        if(!this.initComplete && this.sessionId !== undefined) {
            this.service.getMessages(this.sessionId).subscribe((chatMessages:ChatMessage[]) => {
                this.messages = chatMessages;
                this.initComplete = true;
                setTimeout(scrollToBottom, 1000);
            });
        }
    }

    submit() {
        if(this.initComplete && this.messageToSend.trim().length > 0) {
            this.socket.emit('send message', JSON.stringify(new ChatMessage(this.userId || 'Unknown', this.messageToSend || 'Unknown', this.sessionId, new Date())));
            this.messageToSend = "";
        }
    }

    scrollToBottom() {
        $('#message-list').animate({
            scrollTop: $('#message-list')[0].scrollHeight
        }, 500);
    }
}