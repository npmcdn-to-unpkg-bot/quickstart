import { Component, OnInit }  from '@angular/core';
import { HTTP_PROVIDERS }     from '@angular/http';
import { Router }             from '@angular/router';
import { Driver }             from '../driver';
import { DriverService }      from '../services/driver.service';

import {TimerWrapper}         from '@angular/core/src/facade/async';


@Component({
  selector: 'my-delete',
  templateUrl: 'app/delete/delete.component.html',
  styleUrls: ['app/delete/delete.component.css'],
  providers: [ HTTP_PROVIDERS,  Driver ]
})

export class DeleteComponent implements OnInit {

  constructor (
    private driverService: DriverService,
    private router: Router
  ) { }

  private message = {
    success: '',
    error: ''
  };

  my_row = {
    total_selected: 0,
    last_selected_index: 0,
    drivername: ''
  };

  timerId:number;

  // timerId gives user 4 seconds to reconsider deleting a driver
  clearTimeout() {
    window.clearTimeout(this.timerId);
    this.router.navigate(['/']);
    this.driverService.active_menu = "List";
  }
  ngOnInit () {

    // find selected rows
    this.my_row = this.driverService.find_selected();

    if (this.my_row.total_selected < 1) {
      alert("Select one or more rows to delete");

      // go back to list view
      this.router.navigate(['/']);
      this.driverService.active_menu = "List";
    } else {

      this.message.success = 'Deleted driver ' + this.my_row.drivername;

      // timerId gives user 4 seconds to reconsider deleting a driver.
      // If user does not press the 'Undo' button, the delete command the continue_with_delete() will be run.
      this.timerId = TimerWrapper.setTimeout(() => {this.continue_with_delete()}, 4000);


    }
  }

  /*

   */
  continue_with_delete() {
    this.driverService.delete_selected_driver_from_database()
        .subscribe(
            driver => {
              //**** must delete driver from driver_array, so the list view will reflect this delete ***
              this.driverService.delete_selected_driver_from_driverArray();
              this.router.navigate(['/']);
              this.driverService.active_menu = "List";
            },
            error => {
              if (error.status == '404') {
                this.message.error = 'Driver not found';
              } else {
                this.message.error = 'Unknown error';
              }

              this.router.navigate(['/']);
              this.driverService.active_menu = "List";
            }
        );
  }
}
