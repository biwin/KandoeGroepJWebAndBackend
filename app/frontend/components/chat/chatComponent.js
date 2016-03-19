/// <reference path="../../../../typings/socket.io.d.ts" />
/// <reference path="../../../../typings/jquery/jquery.d.ts" />
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("angular2/core");
var chatMessage_1 = require("../../../backend/model/chatMessage");
var circleSessionService_1 = require("../../services/circleSessionService");
var common_1 = require("angular2/common");
var loadingSpinner_1 = require("../general/loadingSpinner");
var ChatComponent = (function () {
    function ChatComponent(service, socketUrl) {
        var _this = this;
        this.messages = [];
        this.messageToSend = "";
        this.initComplete = false;
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
        this.socket = io.connect(socketUrl);
        this.socket.emit('join session', JSON.stringify({ sessionId: this.sessionId || 'Unknown', userId: this.userId || 'Unknown' }));
        this.socket.on('send message', function (data) { return _this.zone.run(function () {
            _this.messages.push(JSON.parse(data));
            _this.scrollToBottom();
        }); });
        this.service = service;
    }
    ChatComponent.prototype.typing = function ($event) {
        if ($event.which === 13) {
            this.submit();
        }
    };
    ChatComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (!this.initComplete && this.sessionId !== undefined) {
            this.service.getMessages(this.sessionId).subscribe(function (chatMessages) {
                _this.messages = chatMessages;
                _this.initComplete = true;
                setTimeout(scrollToBottom, 1000);
            });
        }
    };
    ChatComponent.prototype.submit = function () {
        if (this.initComplete && this.messageToSend.trim().length > 0) {
            this.socket.emit('send message', JSON.stringify(new chatMessage_1.ChatMessage(this.userId || 'Unknown', this.messageToSend || 'Unknown', this.sessionId, new Date())));
            this.messageToSend = "";
        }
    };
    ChatComponent.prototype.scrollToBottom = function () {
        $('#message-list').animate({
            scrollTop: $('#message-list')[0].scrollHeight
        }, 500);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChatComponent.prototype, "sessionId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChatComponent.prototype, "userId", void 0);
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'chatbox',
            template: "\n    <loading *ngIf=\"!initComplete\"></loading>\n    <div [hidden]=\"!initComplete\">\n        <div class=\"row\" id=\"message-list\">\n            <p *ngFor=\"#message of messages\">{{message._userName}}: {{message._message}}</p>\n         </div>\n         <div class=\"row\" id=\"sendbox\">\n                <div class=\"input-field col s12\">\n                    <input [(ngModel)]=\"messageToSend\" (keyup)=\"typing($event)\" placeholder=\"Typ een bericht...\" type=\"text\" autocomplete=\"off\"/>\n                </div>\n            </div>\n     </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, loadingSpinner_1.LoadingSpinner]
        }),
        __param(1, core_1.Inject('App.SocketUrl')), 
        __metadata('design:paramtypes', [circleSessionService_1.CircleSessionService, String])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chatComponent.js.map