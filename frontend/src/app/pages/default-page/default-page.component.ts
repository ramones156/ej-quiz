import { Component, OnInit } from "@angular/core";
import { StateService } from "../../core/services/state.service";
import { State } from '../../core/models/state.model';

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.scss'],
})
export class DefaultPageComponent implements OnInit {
  public currentState?: State;
  state: State = State.Intro;

  protected readonly Object = Object;
  protected readonly State = State;
  constructor(public stateService: StateService) {}

  ngOnInit() {
    this.stateService.currentState$.subscribe((state) => {
      this.currentState = state;
    });
  }
}
