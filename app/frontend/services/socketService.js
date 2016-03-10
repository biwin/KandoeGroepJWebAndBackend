//import io from '../../../node_modules/socket.io-client/socket.io.js';
var SocketService = (function () {
    //private socket: io.Socket;
    function SocketService() {
        //        this.socket = io.connect("http://localhost:8080");
    }
    SocketService.prototype.getSocket = function () {
        //return this.socket;
        return null;
    };
    return SocketService;
})();
exports.SocketService = SocketService;
//# sourceMappingURL=socketService.js.map