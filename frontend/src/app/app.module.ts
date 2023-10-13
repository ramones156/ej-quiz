import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";
import { AppRoutingModule } from "./app-routing.module";
import { DefaultPageComponent } from "./pages/default-page/default-page.component";
import { AdminPageComponent } from "./pages/admin-page/admin-page.component";
import { CommonModule } from "@angular/common";

const config: SocketIoConfig = { url: "http://localhost:3000", options: {} };

@NgModule({
  declarations: [AppComponent, DefaultPageComponent, AdminPageComponent],
  imports: [CommonModule, BrowserModule, SocketIoModule.forRoot(config), AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
