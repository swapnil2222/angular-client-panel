import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  totalOwed: number
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clientsList => {
      this.clients = clientsList
      this.getTotalOwed()
      // console.log('clients', clientsList)
    })
  }
  getTotalOwed() {
    this.totalOwed = this.clients.reduce((total, client) => {
      // console.log('reduce',typeof client.balance)
      return total = total + parseFloat(client.balance.toString());
    }, 0)
  }

}
