import { Injectable } from '@angular/core';
import { Storage, LocalStorage, App } from 'ionic-angular';
import { TabsPage } from "../pages/tabs/tabs";



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
    listeners:TypedListener[];

    constructor(private app: App) {
        this.listeners = [];
    }

    connect(id:number) {
        this.isReady = false;
        this.socket = new WebSocket("wss://musicmashup-jukebox.herokuapp.com/" + id + "/");

        let self = this;
        this.socket.onopen = function () {
            self.isReady = true;

            self.app.getActiveNav().setRoot(TabsPage);
        }

        this.socket.onclose = function () {
            self.isReady = false;
        }

        this.socket.onmessage = function (e) {
            for (var i = 0; i < self.listeners.length; i++) {
                if (self.listeners[i].eventType.toString().toLowerCase() == e.data) {
                    self.listeners[i].eventListener.onEvent();
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
