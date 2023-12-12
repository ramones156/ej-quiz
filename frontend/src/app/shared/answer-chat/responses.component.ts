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
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss'],
})
export class ResponsesComponent implements OnInit, OnDestroy {
  answers: Map<string, ChatMessage> = new Map();
  public currentState?: State;
  private messageSubscription?: Subscription;

  protected readonly State = State;

  constructor(
    private websocketService: ChatService,
    public stateService: StateService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.messageSubscription = this.websocketService
      .listenForAnswers()
      .subscribe((data: ChatMessage) => {
        console.log(`receiving answer ${data.message}`);
        this.answers.set(data.username!, data);
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

  toggleValidAnswer(answer: ChatMessage) {
    answer.correct = !answer.correct;
  }
}
