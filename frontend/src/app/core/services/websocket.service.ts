import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private socket: Socket) {}

  sendMessage(message: string) {
    this.socket.emit('chatMessage', message);
  }

  addQuestion(question: string) {
    this.socket.emit('addQuestion', question);
  }

  listenForChatMessages() {
    return this.socket.fromEvent<string>('chatMessage');
  }

  listenForQuestions() {
    return this.socket.fromEvent<string>('newQuestion');
  }
}
