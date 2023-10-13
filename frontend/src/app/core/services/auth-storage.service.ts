import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  save(roleAs: string) {
    localStorage.setItem('ROLE', roleAs);
  }

  remove() {
    localStorage.removeItem('ROLE');
  }

  isAdmin() {
    return (localStorage.getItem('ROLE') === 'ROLE_ADMIN');
  }

  getRole() {
    return localStorage.getItem('ROLE');
  }
}
