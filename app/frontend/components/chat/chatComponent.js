/// <reference path="../../../../typings/socket.io.d.ts" />
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
var common_1 = require("angular2/common");
var core_2 = require("angular2/core");
var ChatMessage_1 = require("../models/ChatMessage");
var core_3 = require("angular2/core");
var ChatboxComponent = (function () {
    function ChatboxComponent() {
        var _this = this;
        this.messages = [];
        this.zone = new core_3.NgZone({ enableLongStackTrace: false });
        this.socket = io("http://localhost:8080");
        this.socket.emit('join session', JSON.stringify({ sessionId: this.sessionId || 'Unknown', userName: this.userName || 'Unknown' }));
        this.socket.on('send message', function (data) { return _this.zone.run(function () { return _this.messages.push(JSON.parse(data)); }); });
    }
    ChatboxComponent.prototype.submit = function () {
        this.socket.emit('send message', JSON.stringify(new ChatMessage_1.ChatMessage(this.userName || 'Unknown', this.messageToSend || 'Unknown')));
    };
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], ChatboxComponent.prototype, "sessionId", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], ChatboxComponent.prototype, "userId", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], ChatboxComponent.prototype, "userName", void 0);
    ChatboxComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            template: "\n        <ul>\n            <li *ngFor=\"#message of messages\">{{message.userName}}: {{message.message}}</li>\n        </ul>\n        <form (ngSubmit)=\"submit()\">\n            <input [(ngModel)]=\"messageToSend\" autocomplete=\"off\"/><button>Send</button>\n        </form>\n    ",
            directives: [common_1.NgIf]
        }), 
        __metadata('design:paramtypes', [])
    ], ChatboxComponent);
    return ChatboxComponent;
})();
exports.ChatboxComponent = ChatboxComponent;
//# sourceMappingURL=chatComponent.js.map