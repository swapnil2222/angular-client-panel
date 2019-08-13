import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: ''
  password: ''
  constructor(
    private authService: AuthService,
    private flashMsgsService: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    console.log('registerUser', this.email, this.password)
    this.authService.register(this.email, this.password).then(res => {
      console.log('res', res)
      this.flashMsgsService.show('Registered Successfully', {
        cssClass: 'alert-success', timeout: 4000
      })
      this.router.navigate(['/'])
    }).catch(err=>{
      this.flashMsgsService.show(err, {
        cssClass: 'alert-danger', timeout: 4000
      })
    })
  }
}
