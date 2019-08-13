import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: ''
  password: ''
  constructor(
    private authService: AuthService,
    private router: Router,
    private flasMsgsService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/'])
      }
    })
  }
  login() {
    this.authService.login(this.email, this.password).then(res => {
      this.flasMsgsService.show('You are logged in', { cssClass: 'alert-success', timeout: 4000 })
      this.router.navigate(['/'])
    }).catch(err => {
      this.flasMsgsService.show(err, { cssClass: 'alert-danger', timeout: 4000 })
    })
  }
}
