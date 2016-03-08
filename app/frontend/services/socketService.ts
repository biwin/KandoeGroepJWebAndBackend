import {Injectable} from 'angular2/core';
//import io from '../../../node_modules/socket.io-client/socket.io.js';

export class SocketService {

    //private socket: io.Socket;

    constructor() {
//        this.socket = io.connect("http://localhost:8080");
    }

    public getSocket() {//}: io.Socket{
        //return this.socket;
        return null;
    }
}