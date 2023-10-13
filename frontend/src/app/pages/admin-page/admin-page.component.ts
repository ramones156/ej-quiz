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
  protected readonly State = State;

  constructor(public stateService: StateService) {}

  ngOnInit() {
    this.stateService.currentState$.subscribe((state) => {
      this.currentState = state;
    });
  }
}
