import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  client: Client
  id: string
  hasBalance: boolean = false
  showBalanceUpdateInput: boolean = false
  constructor(
    private flashMsgsService: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService

  ) { }

  ngOnInit() {
    // get id from url
    this.id = this.route.snapshot.params['id']
    this.clientService.getClient(this.id).subscribe(client => {
      if (client !== null) {
        if (client.balance > 0) {
          this.hasBalance = true
        }
      }
      this.client = client
    })
  }
  updateBalance() {
    this.clientService.updateBalance(this.client)
    this.flashMsgsService.show('Balance Updated Successfully.',
      { cssClass: 'alert-success', timeout: 4000 })
  }
  deleteClient() {
    console.log('this.client', this.client)
    if (confirm('Are you sure!')) {
      this.clientService.deleteClient(this.client)
      this.flashMsgsService.show('Client Deleted Successfully.',
      { cssClass: 'alert-success', timeout: 4000 })
      this.router.navigate(['/'])
    }
  }

}
