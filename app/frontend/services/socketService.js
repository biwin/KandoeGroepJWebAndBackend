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
/**
 * Class that is responsible for the WebSocket connection between frontend & backend.
 */
var SocketService = (function () {
    function SocketService(socketUrl) {
        this.socketUrl = socketUrl;
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
    }
    SocketService.prototype.joinSession = function (sessionId) {
        this.socket = io.connect(this.socketUrl);
        this.socket.emit('join session', JSON.stringify({ sessionId: sessionId }));
    };
    SocketService.prototype.subscribeToCardPlay = function (callback) {
        var _this = this;
        this.socket.on('send move', function (data) { return callback(data, _this.zone); });
    };
    SocketService.prototype.emitCardPlay = function (payload) {
        this.socket.emit('send move', payload);
    };
    SocketService.prototype.subscribeToChatReceive = function (callback) {
        var _this = this;
        this.socket.on('send message', function (data) {
            callback(data, _this.zone);
        });
    };
    SocketService.prototype.emitChatSend = function (message) {
        this.socket.emit('send message', JSON.stringify(message));
    };
    SocketService.prototype.emitCardInit = function (payload) {
        this.socket.emit('init cards', payload);
    };
    SocketService.prototype.subscribeToCardInit = function (callback) {
        var _this = this;
        this.socket.on('init cards', function (data) {
            callback(data, _this.zone);
        });
    };
    SocketService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject('App.SocketUrl')), 
        __metadata('design:paramtypes', [String])
    ], SocketService);
    return SocketService;
}());
exports.SocketService = SocketService;
//# sourceMappingURL=socketService.js.map