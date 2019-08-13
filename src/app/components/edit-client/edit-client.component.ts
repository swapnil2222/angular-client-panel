import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: ''
  client: Client
  disableBalanceOnEdit: boolean = true

  @ViewChild('addClientForm', { read: 'any', static: true }) form: any
  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMsgsService: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit
    this.id = this.route.snapshot.params['id']
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client
    })
  }
  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    console.log('value', value)
    console.log('isValid', valid)
    if (!valid) {
      this.flashMsgsService.show('Please fill all fields', {
        cssClass: 'alert-danger', timeOut: 4000
      })
    } else {
      value.id = this.id
      this.clientService.updateBalance(value)
      this.flashMsgsService.show('Updated Successfully', {
        cssClass: 'alert-success', timeOut: 4000
      })
      this.router.navigate(['client/' + this.id])
    }
  }

}
