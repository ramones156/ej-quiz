import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public username?: string;

  constructor(private socket: Socket) {
    this.listenForRegisterUsernameAcknowledgement();
    this.username = localStorage.getItem('username') ?? undefined;

    if (this.username) {
      this.registerUsername(this.username); // local exists, but server needs new socket id
    }
  }

  sendMessage(message: string) {
    this.socket.emit('chatMessage', message);
  }

  sendAnswer(answer: string) {
    this.socket.emit('answer', answer);
  }

  listenForChatMessages() {
    return this.socket.fromEvent<ChatMessage>('chatMessage');
  }

  listenForAnswers() {
    return this.socket.fromEvent<ChatMessage>('answer');
  }

  registerUsername(username: string) {
    this.socket.emit('registerUsername', username);
  }

  listenForRegisterUsernameAcknowledgement() {
    return this.socket
      .fromEvent<any>('registrationAck')
      .subscribe((data: any) => {
        console.log(data.message);
        this.username = data.username;
        localStorage.setItem('username', data.username);
      });
  }
}
