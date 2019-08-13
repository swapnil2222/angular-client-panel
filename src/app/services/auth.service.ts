import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { map } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afsAuth: AngularFireAuth
  ) { }

  login(email: string, password: string) {
    // this.afsAuth.auth(email,password)
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, password).then(userData => resolve(userData), err => reject(err))
    })
  }
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, password).then(userData => resolve(userData), err => reject(err))
    })
  }
  getAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth))
  }
  logOut() {
    this.afsAuth.auth.signOut()
  }
}
