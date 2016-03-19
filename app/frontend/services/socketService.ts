import {NgZone, Inject, Injectable} from "angular2/core";
import Socket = SocketIOClient.Socket;
import {ChatMessage} from "../../backend/model/chatMessage";

@Injectable()
export class SocketService {
    private zone:NgZone;
    private socket:Socket;
    private socketUrl:string;

    constructor(@Inject('App.SocketUrl') socketUrl:string) {
        this.socketUrl = socketUrl;
        this.zone = new NgZone({enableLongStackTrace: false});
    }

    joinSession(sessionId:string) {
        this.socket = io.connect(this.socketUrl);
        this.socket.emit('join session', JSON.stringify({sessionId: sessionId}));
    }
    
    subscribeToCardPlay(callback: (data:any, zone:NgZone) => any) {
        this.socket.on('send move', (data:any) => callback(data, this.zone));
    }
    
    emitCardPlay(payload:any) {
        this.socket.emit('send move', payload);
    }
    
    subscribeToChatReceive(callback: (data:any, zone:NgZone) => any) {
        this.socket.on('send message', (data:any) => {
            callback(data, this.zone);
        });
    }
    
    emitChatSend(message:ChatMessage) {
        this.socket.emit('send message', JSON.stringify(message));
    }

    emitCardInit(payload:any) {
        this.socket.emit('init cards', payload);
    }
    
    subscribeToCardInit(callback: (data:any, zone:NgZone) => any) {
        this.socket.on('init cards', (data:any) => {
            callback(data, this.zone);
        });
    }
}