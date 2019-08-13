import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { SettingsService } from 'src/app/services/settings.service';
// import { read } from 'fs';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    balance: 0
  }
  disableBalanceOnAdd: boolean

  @ViewChild('addClientForm', { read: 'any', static: true }) form: any
  constructor(
    private flashMsgsService: FlashMessagesService,
    private router: Router,
    private clientService: ClientService,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd
  }
  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    console.log(value)
    if (this.disableBalanceOnAdd) {
      value.balance = 0
    }
    if (!valid) {
      this.flashMsgsService.show('Please add all fields.',
        { cssClass: 'alert-danger', timeout: 3000 })
    } else {
      // Add Client
      this.clientService.newClient(value)
      this.flashMsgsService.show('Client Added Successfully!',
        { cssClass: 'alert-success', timeout: 3000 })
      this.router.navigate(['/'])
    }
  }
}
