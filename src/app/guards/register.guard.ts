import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { SettingsService } from '../services/settings.service';

@Injectable()

export class RegisterGuard implements CanActivate {

    constructor(
        private router: Router,
        private settingService: SettingsService
    ) { }

    canActivate(): boolean {    
        console.log('canActivate called')
        if (this.settingService.getSettings().allowRegistration) {
            return true
        } else {
            this.router.navigate(['/login'])
            return false
        }
    }

}