import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';
import { ChatMessage } from '../../core/models/chat-message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: ChatMessage[] = [];
  message: string = '';
  private messageSubscription?: Subscription;
  tempUsername = '';

  constructor(public chatService: ChatService) {}

  sendMessage() {
    if (this.message.length > 0) {
      this.chatService.sendMessage(this.message);
    }
    this.message = '';
  }

  ngOnInit() {
    this.messageSubscription = this.chatService
      .listenForChatMessages()
      .subscribe((message: ChatMessage) => {
        console.log(message.username);
        this.messages.push(message);
      });
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
