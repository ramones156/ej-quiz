import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { State } from '../../frontend/src/app/core/models/state.model';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealTimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private activeClients: Map<string, Socket> = new Map<string, Socket>();
  private usernames: Map<string, string> = new Map<string, string>();

  private currentState: State = State.Intro;

  handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
    this.activeClients.set(socket.id, socket);
    this.server.emit('state', this.currentState);
  }

  handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);

    this.activeClients.delete(socket.id);
    this.usernames.delete(socket.id);
  }

  @SubscribeMessage('registerUsername')
  handleRegisterUsername(socket: Socket, username: string) {
    this.activeClients.set(socket.id, socket);

    this.usernames.set(socket.id, username);

    socket.emit('registrationAck', {username: username, message: 'Username registered successfully'});
  }

  @SubscribeMessage('answer')
  handleAnswer(socket: Socket, answer: string) {
    const id = socket.id;
    const username = this.usernames.get(id);
    this.server.emit('answer', { id, username, message: answer });
  }

  @SubscribeMessage('chatMessage')
  handleChatMessage(socket: Socket, message: string) {
    const id = socket.id;
    const username = this.usernames.get(id);
    this.server.emit('chatMessage', { id, username, message });
  }

  @SubscribeMessage('state')
  handleState(socket: Socket, state: State) {
    this.currentState = state;
    this.server.emit('state', this.currentState);
  }
}
