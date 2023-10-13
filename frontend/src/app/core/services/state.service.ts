import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { State } from '../models/state.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private currentStateSubject = new BehaviorSubject(State.Intro);
  currentState$ = this.currentStateSubject.asObservable();

  constructor(private socket: Socket) {
    this.listenForStateChange();
  }

  setState(state: State) {
    this.socket.emit('state', state);
    this.currentStateSubject.next(state);
  }

  getCurrentState() {
    return this.currentStateSubject;
  }

  private listenForStateChange() {
    this.socket.fromEvent<State>('state').subscribe((state) => {
      this.currentStateSubject.next(state);
    });
  }
}
