import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Events } from 'ionic-angular';

import io from 'socket.io-client';
export interface MMSocket extends SocketIOClient.Socket {
  isAdmin?: boolean; // Change to data
}

@Injectable()
export class SocketService {
    socketObserver: any;
    socketService: any;
    socket: MMSocket;
    user: any;
    data: any = null;
    socketHost: string = 'http://92.51.135.50:8080/';
    socketId: string;

    room: any;
    isAdmin: boolean = false;

    constructor(public events: Events) {
        this.socketService = Observable.create(observer => {
            this.socketObserver = observer;
        });
    }


    initialize() {
        this.socket = io.connect(this.socketHost);

        console.log(this.socket);

        this.socket.on("connect", (msg) => {
            this.socketId = this.socket.id;

            console.log('on connect');
            this.socketObserver.next({ category: 'connect', message: 'user connected'});
        });

        this.socket.on("reconnecting", (msg) => {
            console.log('on reconnecting');
        });

        this.socket.on("reconnect_error", (msg) => {
            console.log('on reconnect_error');
        });

        this.socket.on("reconnect_failed", (msg) => {
            console.log('on reconnect_failed');
        });

        this.socket.on('disconnect', function () {
            console.log('user disconnected');
            // io.emit('user disconnected');
        });


        this.socket.on('newUser', (data) => {
            console.log(data);
            alert(data);
        });

        this.socket.on('joinedRoom', (data) => {
            console.log('joined room');
            this.room = data;
            this.events.publish("roomUpdated");
        });

        this.socket.on('newChatMessage', (data) => {
            this.room.messages.push(data);
        });

        this.socket.on('updateQueue', (data) => {
            this.room.queue = data;
            this.events.publish("roomUpdated");
        });

        this.socket.on('updateQueueAndHistory', (data) => {
            this.room.queue = data.queue;
            this.room.history = data.history;
            this.events.publish("roomUpdated");
        });

        this.socket.on("message", (msg) => {
            this.socketObserver.next({ category: 'message', message: msg });
        });
    }

    reset(){
        this.socket.disconnect();
        this.socket.isAdmin = false;
        this.initialize();
    }

    sendMessage(eventName, data) {
        if(this.room) {
            this.socket.emit(eventName,{id: this.room.id, data: data});
        } else {
            this.socket.emit(eventName,{data: data});
        }
    }

    sendPlainMessage(eventName, data) {
        this.socket.emit(eventName, data);
    }

}
