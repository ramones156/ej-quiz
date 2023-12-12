import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ResponsesComponent } from './answer-chat/responses.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AnswerChatComponent } from './answer-chat/answer-chat.component';

@NgModule({
  declarations: [
    ChatComponent,
    ResponsesComponent,
    NavbarComponent,
    AnswerChatComponent,
  ],
  exports: [
    ChatComponent,
    ResponsesComponent,
    NavbarComponent,
    AnswerChatComponent,
  ],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class SharedModule {}
