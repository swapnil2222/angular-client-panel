import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true
  }
  constructor() {
    console.log('setting', localStorage.getItem('settings'))
    if (localStorage.getItem('settings') !== null) {
      this.settings = JSON.parse(localStorage.getItem('settings'))
    }
  }
  getSettings(): Settings {
    return this.settings
  }
  changeService(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings))
  }
}
