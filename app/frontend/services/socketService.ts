import {NgZone, Inject, Injectable} from "angular2/core";
import Socket = SocketIOClient.Socket;
import {ChatMessage} from "../../backend/model/chatMessage";


/**
 * Class that is responsible for the WebSocket connection between frontend & backend.
 */
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
        console.log("JASPER IS WAT1");
        this.socket.emit('init cards', payload);
        console.log("JASPER IS WAT2");
    }
    
    subscribeToCardInit(callback: (data:any, zone:NgZone) => any) {
        console.log("JASPER 1");
        this.socket.on('init cards', (data:any) => {
            console.log("JASPER 2: " + JSON.stringify(data));
            callback(data, this.zone);
        });
    }
}