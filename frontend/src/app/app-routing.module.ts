// app-routing.module.ts
import { NgModule } from "@angular/core";
import { AdminPageComponent } from "./pages/admin-page/admin-page.component";
import { DefaultPageComponent } from "./pages/default-page/default-page.component";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "./core/guards/admin.guard";

const routes: Routes = [
  { path: '', component: DefaultPageComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
