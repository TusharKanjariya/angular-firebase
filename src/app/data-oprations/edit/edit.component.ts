import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ManageDataService } from "../manage-data.service";
import { Route, ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  errorMessage: any;
  controls: any;
  constructor(
    private service: ManageDataService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private navigation: Router
  ) {}

  editForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    post: new FormControl("", [Validators.required]),
    age: new FormControl("", [Validators.required])
  });

  showError: boolean = false;
  showMessage: boolean = false;
  showLoader: boolean = false;
  userData = [];
  userID = "";

  ngOnInit() {
    this.service.display(true);
    this.service.status.subscribe(val => {
      this.showLoader = val;
    });
    this.controls = this.editForm.controls;
    this.route.params.subscribe(val => {
      this.userID = val["id"];
      this.service.getUser(val["id"]).subscribe(t => {
        t.map(d => {
          this.userData.push({
            [d.key]: d.payload.val()
          });
        });
        this.editForm.setValue({
          age: this.userData[0].age,
          name: this.userData[1].name,
          post: this.userData[2].post
        });
        this.service.display(false);
      });
    });
  }

  onSubmit() {
    this.service.display(true);
    let user = this.editForm.value;
    this.service
      .edit(this.userID, user)
      .then(res => {
        this.toast.success("", "Updated Successful");
        this.service.display(false);
        this.editForm.reset();
        this.navigation.navigate(["/dashboard"]);
      })
      .catch(err => {
        this.showError = true;
        this.errorMessage = err.message;
        this.service.display(false);
      });
    this.editForm.reset();
  }
}
