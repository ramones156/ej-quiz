import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealTimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('chatMessage')
  handleChatMessage(client: Socket, message: string) {
    // Handle chat messages
    this.server.emit('chatMessage', message);
  }

  @SubscribeMessage('addQuestion')
  handleAddQuestion(client: Socket, question: string) {
    // Handle adding questions
    this.server.emit('newQuestion', question);
  }

  @SubscribeMessage('videoEvent')
  handleVideoEvent(client: Socket, data: any) {
    // Handle video events
    // You can broadcast these events to all connected clients as needed.
    console.log(`${client.id} sending video ${data.length}`);
  }
}
