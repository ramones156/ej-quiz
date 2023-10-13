import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ChatService } from '../../core/services/chat.service';
import { ChatMessage } from '../../core/models/chat-message.model';
import { StateService } from '../../core/services/state.service';
import { State } from '../../core/models/state.model';
import { Subscription } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-answer-chat',
  templateUrl: './answer-chat.component.html',
  styleUrls: ['./answer-chat.component.scss'],
})
export class AnswerChatComponent implements OnInit, OnDestroy {
  messages: Map<string, ChatMessage> = new Map();
  message: string = '';
  public currentState?: State;
  protected readonly State = State;
  private messageSubscription?: Subscription;

  constructor(
    private websocketService: ChatService,
    public stateService: StateService,
    private cdr: ChangeDetectorRef,
  ) {}

  sendMessage() {
    if (this.message.length > 0) {
      this.websocketService.sendMessage(this.message);
      this.message = '';
    }
  }

  ngOnInit() {
    this.messageSubscription = this.websocketService
      .listenForChatMessages()
      .subscribe((data: ChatMessage) => {
        console.log(`receiving message ${data.message}`);
        this.messages.set(data.id, data);
        this.cdr.markForCheck();
      });
    this.stateService.currentState$.subscribe((state) => {
      this.cdr.markForCheck();
      this.currentState = state;
    });
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
