// app-routing.module.ts
import { NgModule } from '@angular/core';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { DefaultPageComponent } from './pages/default-page/default-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: DefaultPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
