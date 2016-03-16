/// <reference path="../../../../typings/socket.io.d.ts" />
/// <reference path="../../../../typings/jquery/jquery.d.ts" />

import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {UserService} from "../../services/userService";
import Request = Express.Request;
import {Response} from "angular2/http";
import {Input} from "angular2/core";
import {User} from "../../../backend/model/user";
import {ChatMessage} from "../../../backend/model/chatMessage";
import {NgZone} from "angular2/core";
import {CircleSessionService} from "../../services/circleSessionService";
import {OnChanges} from "angular2/core";

@Component({
    selector: 'chatbox',
    template: `
    <div class="container">
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
    directives: []
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

    public constructor(service:CircleSessionService) {
        this.zone = new NgZone({enableLongStackTrace: false});
        this.socket = io("http://localhost");
        this.socket.emit('join session', JSON.stringify({sessionId: this.sessionId || 'Unknown', userId: this.userId || 'Unknown'}));
        this.socket.on('send message', data => this.zone.run(() => {
            this.messages.push(JSON.parse(data));
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
                //FIXME PLIS
                $('#message-list').animate({scrollTop:$('#message-list')[0].scrollHeight}, 1000);
            });
        }
    }

    submit() {
        if(this.initComplete) {
            this.socket.emit('send message', JSON.stringify(new ChatMessage(this.userId || 'Unknown', this.messageToSend || 'Unknown', this.sessionId, new Date())));
            this.messageToSend = "";
        }
    }
}