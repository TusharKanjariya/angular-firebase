import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ManageDataService {
  data: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {}
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  addData(name: any, post: any, age: any) {
    return this.db.database.ref("/users").push({ name, post, age });
  }

  getData() {
    return this.db.list("/users");
  }

  getUser(id: string) {
    return this.db.list("/users/" + id).snapshotChanges();
  }

  display(value: boolean) {
    this.status.next(value);
  }

  delete(key: string) {
    this.db.database
      .ref()
      .child("/users/" + key)
      .remove();
  }

  edit(id, data) {
    return this.db.database.ref("/users/" + id).update(data);
  }
}
