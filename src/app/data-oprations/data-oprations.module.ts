import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DataOprationsRoutingModule } from "./data-oprations-routing.module";
import { HomeComponent } from "./home/home.component";
import { EditComponent } from "./edit/edit.component";
import { AddComponent } from "./add/add.component";

@NgModule({
  declarations: [HomeComponent, EditComponent, AddComponent],
  imports: [CommonModule, DataOprationsRoutingModule]
})
export class DataOprationsModule {}
