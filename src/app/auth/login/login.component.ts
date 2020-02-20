import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validator, Validators } from "@angular/forms";
import { AuthService } from "../auth-service.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private toast: ToastrService,
    private route: Router
  ) {}
  controls;
  errorMessage: string;
  showError: boolean = false;
  showMessage: boolean = false;
  showLoader: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  ngOnInit() {
    this.controls = this.loginForm.controls;
    this.auth.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }

  onSubmit() {
    this.auth.display(true);
    let user = this.loginForm.value;
    this.auth
      .login(user.email, user.password)
      .then(res => {
        console.log(res);
        this.toast.success("Welcome " + res.user.email, "Login Successful");
        this.showMessage = true;
        sessionStorage.setItem("user", res.user.email);
        this.errorMessage = res["message"];
        this.auth.display(false);
        this.route.navigate(["register"]);
      })
      .catch(err => {
        this.showError = true;
        this.errorMessage = err.message;
        this.auth.display(false);
      });
    this.loginForm.reset();
  }
}
