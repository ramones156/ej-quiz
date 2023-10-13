import { Injectable } from '@angular/core';
import { AuthStorageService } from './auth-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authStorage: AuthStorageService,
    private http: HttpClient,
    private router: Router,
  ) {}

  login(username: string, password: string) {
    this.http
      .post(`http://localhost:3000/api/login`, { username, password })
      .subscribe((data: any) => {
        const role = data['role'];
        this.authStorage.save(role);
        this.router.navigate(['/admin']);
      });
  }

  logout() {
    this.http
      .post(`http://localhost:3000/api/logout`, {})
      .subscribe((data: any) => {
        this.authStorage.remove();
        this.router.navigate(['/']);
      });
  }
}
