/// <reference path="../../../../typings/socket.io.d.ts" />

import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {UserService} from "../../services/userService";
import {NgIf} from "angular2/common";
import Request = Express.Request;
import {Response} from "angular2/http";
import {Input} from "angular2/core";
import {User} from "../../../backend/model/user";
import {ChatMessage} from "../models/ChatMessage";
import {NgZone} from "angular2/core";

@Component({
    selector: 'profile',
    template: `
        <ul>
            <li *ngFor="#message of messages">{{message.userName}}: {{message.message}}</li>
        </ul>
        <form (ngSubmit)="submit()">
            <input [(ngModel)]="messageToSend" autocomplete="off"/><button>Send</button>
        </form>
    `,
    directives: [NgIf]
})

export class ChatboxComponent {
    @Input() private sessionId;
    @Input() private userId;
    @Input() private userName;
    private messages: ChatMessage[] = [];
    private socket;
    private zone: NgZone;
    private messageToSend: string;

    public constructor() {
        this.zone = new NgZone({enableLongStackTrace: false});
        this.socket = io("http://localhost:8080");
        this.socket.emit('join session', JSON.stringify({sessionId: this.sessionId || 'Unknown', userName: this.userName || 'Unknown'}));
        this.socket.on('send message', data => this.zone.run(() => this.messages.push(JSON.parse(data))));
    }

    submit() {
        this.socket.emit('send message', JSON.stringify(new ChatMessage(this.userName || 'Unknown', this.messageToSend || 'Unknown')));
    }
}