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

  constructor(private driverService:DriverService,
              private router:Router) {
  }

  private message = {
    success: '',
    error: ''
  };

  timerId:number;
  // give user 'milliseconds_to_delay' to reconsider deleting a driver
  milliseconds_to_delay:number;
  first_selected_row_index;


  ngOnInit() {
    // find first selected row
    this.first_selected_row_index = this.driverService.find_first_row_to_delete();

    console.debug('inside delete.component.ts initializing, first_selected_row_index: '
          + this.first_selected_row_index);
    this.milliseconds_to_delay = 4000;
    console.debug("delay " + this.milliseconds_to_delay + " before a driver delete");

    console.debug('first_selected_index: ' + this.first_selected_row_index);
    if (this.first_selected_row_index > -1) {
      //at least one driver row is selected
      this.message.success = 'Deleted driver';

      console.debug('found a selected row at index ' + this.first_selected_row_index);

      // timerId gives user 4 seconds to reconsider deleting a driver.
      // If user does not press the 'Undo' button, delete_one_driver_from_database() will be run.
      this.timerId = TimerWrapper.setTimeout(() => {
        this.delete_one_driver_from_database(this.first_selected_row_index)
      }, this.milliseconds_to_delay);
    }
  }

  /*
   user did not press the Undo button before timeout expired after choosing to delete a driver
   */
  delete_one_driver_from_database(first_selected_row_index:number) {
    var drivername_to_delete:string;

    console.debug('making call to delete_selected_driver_from_driverArray(' + first_selected_row_index + ')');

    // delete driver from driver_array, so the list view will reflect the delete
    drivername_to_delete = this.driverService.delete_selected_driver_from_driverArray(first_selected_row_index);

    console.debug('subscribing to Observable method of deleted drivername ' + drivername_to_delete);

    this.driverService.delete_selected_driver_from_database(drivername_to_delete)
        .subscribe(
            driver => {
              var next_selected_row_index:number;
              console.log('Delete driver ' + drivername_to_delete +
                  ' is complete. Checking for other selected rows.');

              TimerWrapper.clearTimeout(this.timerId);

              // check for another selected driver row...
              next_selected_row_index = this.driverService.find_first_row_to_delete();
              //don't delay after the first driver in a series of drivers to be deleted has been deleted.
              this.milliseconds_to_delay = 0;
              console.debug("delay " + this.milliseconds_to_delay + " before next driver delete");


              if (next_selected_row_index > -1) {
                this.timerId = TimerWrapper.setTimeout(() => {
                  // recursively call yourself until all selected driverArray rows have been deleted
                  this.delete_one_driver_from_database(next_selected_row_index)
                }, this.milliseconds_to_delay);
              }

              // go to list view
              this.router.navigate(['/']);
              this.driverService.active_menu = "List";
            },
            error => {
              if (error.status == '404') {
                this.message.error = 'drivername ' + drivername_to_delete + ' not found in database';
              } else {
                this.message.error = 'Unknown error';
              }

              this.router.navigate(['/']);
              this.driverService.active_menu = "List";
            }
        );
  }

  clearTimeout() {
    if (this.timerId != null) {
      TimerWrapper.clearTimeout(this.timerId);
      this.timerId = null;
    }
    // go to list view
    this.router.navigate(['/']);
    this.driverService.active_menu = "List";
  }

}
