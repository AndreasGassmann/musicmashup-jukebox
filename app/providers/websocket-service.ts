import { Injectable } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';

export interface EventListener {
    onEvent();
}

export enum EventType {
    CONNECT,
    DISCONNECT,
    JOIN_ROOM,
    LEAVE_ROOM,
    ADD_VIDEO,
    VOTE_VIDEO,
    SEND_CHAT_MESSAGE
}

export class TypedListener {
    eventListener:EventListener;
    eventType:EventType;
}

@Injectable()
export class WebSocketService {

    isReady:boolean;
    socket:any;
    listeners:TypedListener[] = [];

    constructor() {

    }

    connect(id:number) {
        this.isReady = false;
        this.socket = new WebSocket("wss://musicmashup-jukebox.herokuapp.com/");

        let self = this;
        this.socket.onopen = function () {
            self.isReady = true;
        }

        this.socket.onclose = function () {
            self.isReady = false;
        }

        this.socket.onmessage = function (e) {
            for (var i = 0; i < this.listeners.length; i++) {
                if (this.listeners[i].eventType.toString().toLowerCase() == e.data) {
                    this.listeners[i].eventListener.onEvent();
                }
            }
        }
    }


    disconnect() {
        if (this.isReady) this.socket.close();
    }

    addListener(listener:TypedListener) {
        this.listeners.push(listener);
    }

    sendMessage(message:string) {
        this.socket.send(message);
    }


}
