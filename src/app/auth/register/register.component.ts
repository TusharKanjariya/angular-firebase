import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validator, Validators } from "@angular/forms";
import { AuthService } from "../auth-service.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  controls;
  errorMessage: string;
  showError: boolean = false;
  showMessage: boolean = false;
  showLoader: boolean = false;

  registerForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  ngOnInit() {
    this.controls = this.registerForm.controls;
    this.auth.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }

  onSubmit() {
    this.auth.display(true);
    let user = this.registerForm.value;
    this.auth
      .register(user.email, user.password)
      .then(res => {
        this.toastr.success("Successful", "Register");
        this.showMessage = true;
        this.errorMessage = res["message"];
        this.auth.display(false);
        // this.route.navigate(["login"]);
      })
      .catch(err => {
        this.showError = true;
        this.errorMessage = err.message;
        this.auth.display(false);
      });
    this.registerForm.reset();
  }
}
