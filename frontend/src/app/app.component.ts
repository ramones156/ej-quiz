import { Component } from '@angular/core';
import { State } from './core/models/state.model';
import { StateService } from './core/services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  state: State = State.Intro;
  protected readonly Object = Object;
  protected readonly State = State;

  constructor(public stateService: StateService) {}
}
