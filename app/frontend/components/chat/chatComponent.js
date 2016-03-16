/// <reference path="../../../../typings/socket.io.d.ts" />
/// <reference path="../../../../typings/jquery/jquery.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var core_2 = require("angular2/core");
var chatMessage_1 = require("../../../backend/model/chatMessage");
var core_3 = require("angular2/core");
var circleSessionService_1 = require("../../services/circleSessionService");
var ChatComponent = (function () {
    function ChatComponent(service) {
        var _this = this;
        this.messages = [];
        this.messageToSend = "";
        this.initComplete = false;
        this.zone = new core_3.NgZone({ enableLongStackTrace: false });
        this.socket = io("http://localhost");
        this.socket.emit('join session', JSON.stringify({ sessionId: this.sessionId || 'Unknown', userId: this.userId || 'Unknown' }));
        this.socket.on('send message', function (data) { return _this.zone.run(function () {
            _this.messages.push(JSON.parse(data));
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
                //FIXME PLIS
                $('#message-list').animate({ scrollTop: $('#message-list')[0].scrollHeight }, 1000);
            });
        }
    };
    ChatComponent.prototype.submit = function () {
        if (this.initComplete) {
            this.socket.emit('send message', JSON.stringify(new chatMessage_1.ChatMessage(this.userId || 'Unknown', this.messageToSend || 'Unknown', this.sessionId, new Date())));
            this.messageToSend = "";
        }
    };
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], ChatComponent.prototype, "sessionId", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], ChatComponent.prototype, "userId", void 0);
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'chatbox',
            template: "\n    <div class=\"container\">\n        <div class=\"row\" id=\"message-list\">\n            <p *ngFor=\"#message of messages\">{{message._userName}}: {{message._message}}</p>\n         </div>\n         <div class=\"row\" id=\"sendbox\">\n                <div class=\"input-field col s12\">\n                    <input [(ngModel)]=\"messageToSend\" (keyup)=\"typing($event)\" placeholder=\"Typ een bericht...\" type=\"text\" autocomplete=\"off\"/>\n                </div>\n            </div>\n        </div>\n    ",
            directives: []
        }), 
        __metadata('design:paramtypes', [circleSessionService_1.CircleSessionService])
    ], ChatComponent);
    return ChatComponent;
})();
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chatComponent.js.map