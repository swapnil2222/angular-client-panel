import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
// import {  } from ";
import { Observable } from "rxjs";
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
@Injectable()

export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService,
        private afsAuth: AngularFireAuth
    ) { }
    canActivate(): Observable<boolean> {
        return this.afsAuth.authState.pipe(
            map(auth => {
                if (!auth) {
                    this.router.navigate(['/login'])
                    return false
                } else {
                    return true
                }
            })
        )
    }
}
