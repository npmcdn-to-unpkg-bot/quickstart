import { Component, OnInit }  from '@angular/core';
import { HTTP_PROVIDERS }     from '@angular/http';
import { Router } from '@angular/router';
import { Driver }             from '../driver';
import { DriverService }      from '../services/driver.service';

@Component({
  selector: 'my-delete',
  templateUrl: 'app/delete/delete.component.html',
  styleUrls: ['app/delete/delete.component.css'],
  providers: [ HTTP_PROVIDERS,  Driver ]
})

export class DeleteComponent implements OnInit {

  constructor (
    private driverService: DriverService
  ) { }

  private message = {
    success: '',
    error: ''
  };

  ngOnInit (){
    var selected_rows = 0;

    selected_rows = this.driverService.find_selected();

    this.driverService.delete_selected_driver_from_database()
        .subscribe(
            driver  => {
              //**** must delete driver from driver_array, so the list view will reflect this delete ***
              this.driverService.delete_selected_driver_from_driverArray();

              this.message.success = 'Driver deleted';
            },
            error => {
              if (error.status == '404') {
                this.message.error = 'Driver not found';
              } else {
                this.message.error = 'Unknown error';
              }
            }
        );
  }

}
