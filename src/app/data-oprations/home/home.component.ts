import { Component, OnInit } from "@angular/core";
import { ManageDataService } from "../manage-data.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private service: ManageDataService) {}

  usersData: Observable<any>;
  showLoader: boolean = false;
  isData: boolean = true;
  ngOnInit() {
    this.service.display(true);
    this.service.status.subscribe(val => {
      this.showLoader = val;
    });
    this.usersData = this.service.getData().snapshotChanges();
    this.usersData.subscribe(val => {
      this.isData = val.length === 0 ? false : true;
      this.service.display(false);
    });
  }

  delete(key: string) {
    this.service.delete(key);
  }
}
