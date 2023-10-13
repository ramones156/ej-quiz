import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate, CanActivateChild {
  private router: Router;

  constructor(private authService: AuthService, router: Router) {
    this.router = router;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getRole();
      if (userRole !== "ROLE_ADMIN") {
        this.router.navigate(["/"]);
        return false;
      }
      return true;
    }

    this.router.navigate(["/"]);
    return false;
  }
}
