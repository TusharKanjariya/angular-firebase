import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ManageDataService } from "../manage-data.service";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"]
})
export class AddComponent implements OnInit {
  constructor(
    private service: ManageDataService,
    private toast: ToastrService,
    private route: Router
  ) {}
  addForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    post: new FormControl("", [Validators.required]),
    age: new FormControl("", [Validators.required])
  });
  controls: any;
  errorMessage: string;
  showError: boolean = false;
  showMessage: boolean = false;
  showLoader: boolean = false;

  ngOnInit() {
    this.controls = this.addForm.controls;
    this.service.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }

  onSubmit() {
    this.service.display(true);
    let user = this.addForm.value;
    this.service
      .addData(user.name, user.post, user.age)
      .then(res => {
        this.toast.success("", "Data Added Successful");
        this.service.display(false);
      })
      .catch(err => {
        this.showError = true;
        this.errorMessage = err.message;
        this.service.display(false);
      });
    this.addForm.reset();
  }
}
