import { Component, OnInit } from "@angular/core";
import { WebsocketService } from "../../core/services/websocket.service";

@Component({
  selector: "app-default-page",
  templateUrl: "./default-page.component.html",
  styleUrls: ["./default-page.component.scss"]
})
export class DefaultPageComponent implements OnInit {
  messages: string[] = [];
  chatMessage: string = "";
  question: string = "";

  constructor(private websocketService: WebsocketService) {
  }

  sendMessage() {
    this.websocketService.sendMessage(this.chatMessage);
    this.chatMessage = "";
  }

  addQuestion() {
    this.websocketService.addQuestion(this.question);
    this.question = "";
  }

  ngOnInit() {
    this.websocketService.listenForChatMessages().subscribe((message) => {
      // Handle chat messages received from the server
      console.log(`receiving message ${message}`);
      this.messages.push(message);
    });

    this.websocketService.listenForQuestions().subscribe((question) => {
      // Handle new questions received from the server
      console.log(`receiving question ${question}`);
    });
  }
}
