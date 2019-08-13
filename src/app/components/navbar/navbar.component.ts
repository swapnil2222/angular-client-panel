import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false
  loggedInUser: string = ''
  isShowRegisterLink: boolean
  constructor(
    private settingsService: SettingsService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isShowRegisterLink = this.settingsService.getSettings().allowRegistration
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true
        this.loggedInUser = auth.email
      }
    })
    // this.
  }
  onLogOut() {
    this.authService.logOut()
    this.router.navigate(['/login'])
  }

}
