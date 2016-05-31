import { Component, OnInit }  from '@angular/core';
import { HTTP_PROVIDERS }     from '@angular/http';
import { Router }             from '@angular/router';
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
    private driverService: DriverService,
    private router: Router
  ) { }

  private message = {
    success: '',
    error: ''
  };

  my_row = {
    total_selected: 0,
    last_selected_index: 0
  };

  ngOnInit (){
    // find selected rows
    this.my_row = this.driverService.find_selected();

    if (this.my_row.total_selected < 1) {
      alert("Select one or more rows to delete");

      // go back to list view
      this.router.navigate(['/']);
      this.driverService.active_menu = "List";

    } else {

      this.driverService.delete_selected_driver_from_database()
          .subscribe(
              driver => {
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

}
