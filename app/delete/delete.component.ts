import { Component, OnInit }  from '@angular/core';
import { HTTP_PROVIDERS }     from '@angular/http';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { DeleteService }      from '../services/delete.service';
import { Driver }             from '../driver';
import { DriverService }      from '../services/driver.service';

@Component({
  selector: 'my-delete',
  templateUrl: 'app/delete/delete.component.html',
  styleUrls: ['app/delete/delete.component.css'],
  providers: [ HTTP_PROVIDERS,  DeleteService, Driver ],
  directives: [ROUTER_DIRECTIVES]
})

export class DeleteComponent implements OnInit {

  constructor (
    private _deleteService: DeleteService,
    private driverService: DriverService
  ) { }

  private message = {
    success: '',
    error: ''
  };

  ngOnInit (){
    var selected_rows = 0;

    selected_rows = this.driverService.find_selected();

    this.message = this.driverService.delete_driver_API();
  }

}
