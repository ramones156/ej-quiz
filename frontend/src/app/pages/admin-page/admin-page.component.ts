import { Component, OnInit } from '@angular/core';
import { State } from '../../core/models/state.model';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  public currentState?: State;
  state: State = State.Intro;
  questionCount = 0;

  protected readonly State = State;
  protected readonly Object = Object;
  constructor(public stateService: StateService) {}

  ngOnInit() {
    this.stateService.currentState$.subscribe((state) => {
      this.currentState = state;
    });
  }

  setState(state: State) {
    if ([State.Intro, State.AnswersClosed].includes(this.state) && state === State.QuestionExplanation) {
      this.questionCount++;
    }
    this.state = state;
    this.stateService.setState(this.state);
  }
}
