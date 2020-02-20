import { Component, OnInit, SimpleChange } from "@angular/core";
import { AuthService } from "../auth/auth-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}
  user: any;

  ngOnInit() {
    this.user = sessionStorage.getItem("user");
  }

  ngDoCheck() {
    if (sessionStorage.getItem("user")) {
      this.user = sessionStorage.getItem("user");
    } else {
      this.user = null;
    }
  }

  logout() {
    this.authService.logout().then(val => {
      sessionStorage.clear();
      this.route.navigate(["login"]);
      this.user = "";
    });
  }
}
