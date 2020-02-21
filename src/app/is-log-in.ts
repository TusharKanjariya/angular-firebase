import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class IsLogIn implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!sessionStorage.getItem("user")) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}
