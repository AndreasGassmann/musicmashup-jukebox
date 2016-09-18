import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { App } from 'ionic-angular';
import {TabsPage} from "../pages/tabs/tabs";
import { Events } from 'ionic-angular';


//import * as io from 'socket.io-client';

declare var io: any;



@Injectable()
export class SocketService {
    socketObserver: any;
    socketService: any;
    socket: any;
    user: any;
    data: any = null;
    socketHost: string = 'http://92.51.135.50:8080/';

    room:any;
    isAdmin:boolean = false;

    constructor(private app: App, public events: Events) {
        this.socketService = Observable.create(observer => {
            this.socketObserver = observer;
        });
    }


    initialize() {
        this.socket = io.connect(this.socketHost);
        var self = this;

        console.log(this.socket);

        this.socket.on("connect", (msg) => {
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
            this.room = data;
            self.app.getActiveNav().setRoot(TabsPage);
            this.events.publish("roomUpdated");
            console.log(data);
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
        }); //end of socket.on('message')

    }

    sendMessage(eventName, data) {
        if(this.room){
            this.socket.emit(eventName,{id: this.room.id, data: data});
        }else{
            this.socket.emit(eventName,{data: data});
        }
    }

}
