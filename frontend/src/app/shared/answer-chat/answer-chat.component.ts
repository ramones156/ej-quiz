import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { State } from '../../core/models/state.model';
import { ChatService } from '../../core/services/chat.service';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-answer-chat',
  templateUrl: './answer-chat.component.html',
  styleUrls: ['./answer-chat.component.scss'],
})
export class AnswerChatComponent implements OnInit {
  answer: string = '';
  public currentState?: State;

  protected readonly State = State;

  constructor(
    private websocketService: ChatService,
    public stateService: StateService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.stateService.currentState$.subscribe((state) => {
      this.cdr.markForCheck();
      this.currentState = state;
    });
  }

  sendAnswer() {
    if (this.answer.length > 0) {
      this.websocketService.sendAnswer(this.answer);
      this.answer = '';
    }
  }
}
