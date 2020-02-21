import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DataOprationsRoutingModule } from "./data-oprations-routing.module";
import { HomeComponent } from "./home/home.component";
import { EditComponent } from "./edit/edit.component";
import { AddComponent } from "./add/add.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [HomeComponent, EditComponent, AddComponent],
  imports: [
    CommonModule,
    DataOprationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConf)
  ],
  providers: []
})
export class DataOprationsModule {}
