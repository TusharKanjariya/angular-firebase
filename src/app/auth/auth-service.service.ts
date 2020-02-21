import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject } from "rxjs";
import { auth } from "firebase";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public user: any;

  display(value: boolean) {
    this.status.next(value);
  }

  register(email: string, password: string) {
    return this.auth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  isLoggedIn() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        sessionStorage.setItem("user", user.email);
      } else {
        this.user = null;
        sessionStorage.clear();
      }
    });
  }

  logout() {
    sessionStorage.clear();
    return this.auth.auth.signOut();
  }
}
