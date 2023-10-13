import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnswerChatComponent } from './answer-chat/answer-chat.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [ChatComponent, AnswerChatComponent, NavbarComponent],
  exports: [ChatComponent, AnswerChatComponent, NavbarComponent],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class SharedModule {}
