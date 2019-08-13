import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/models/Settings';
import { SettingsService } from 'src/app/services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings

  constructor(
    private settingsService: SettingsService,
    private flashMsgsService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
    console.log('this.settingsService.getSettings()',this.settingsService.getSettings())
  }
  submit() {
    this.settingsService.changeService(this.settings);
    this.flashMsgsService.show('Settings Changed.',
      { cssClass: 'alert-success', timeout: 4000 })
  }
}
