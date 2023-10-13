import { Component } from '@angular/core';
import { AuthService } from "../../core/services/auth.service";
import { AuthStorageService } from "../../core/services/auth-storage.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  constructor(
    public authStorageService: AuthStorageService,
    private authService: AuthService,
  ) {
  }

  logout() {
    this.authService.logout();
  }
}
