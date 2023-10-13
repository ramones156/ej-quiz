import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { DefaultPageComponent } from './pages/default-page/default-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth.service';
import { AuthStorageService } from './core/services/auth-storage.service';
import { HttpClientModule } from '@angular/common/http';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    DefaultPageComponent,
    AdminPageComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, AuthStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
