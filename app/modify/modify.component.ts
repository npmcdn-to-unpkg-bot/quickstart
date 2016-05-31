import { Component, OnInit }  from '@angular/core';
import { FORM_DIRECTIVES ,
    FORM_PROVIDERS }          from '@angular/common';
import { HTTP_PROVIDERS }     from '@angular/http';
import { Driver }             from '../driver';
import { DriverService }      from '../services/driver.service';
import { SelectService }      from '../services/select.service';

@Component({
  selector: 'my-modify',
  templateUrl: 'app/modify/modify.component.html',
  styleUrls: ['app/modify/modify.component.css'],
  providers:  [  FORM_PROVIDERS, Driver ],
  directives: [ FORM_DIRECTIVES ]
})

export class ModifyComponent implements OnInit {
  constructor(
      private driverService: DriverService
      ) {  }

  private message = {
    success: '',
    error: ''
  };

  driving_ability_list = ['Bicycle', 'Scooter', 'Motorcycle', 'Car with Automatic Transmission',
    'Car with Manual Transmission', 'Commercial Truck'];

  driver = {
    selected: false,
    drivername: 'new driver',
    password: '',
    ability: '',
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  };

  my_row = {
    total_selected: 0,
    last_selected_index: 0
  };

  ngOnInit (){

    this.my_row = this.driverService.find_selected();

    if (this.my_row.total_selected > 1) {
      alert("Select a single row to modify");
      // go back to list

    }

    this.driverService.modify_selected_driver_in_database(this.my_row.last_selected_index)
        .subscribe(
            driver  => {
              //**** must delete driver from driver_array, so the list view will reflect this delete ***
              this.driver =
                  this.driverService.modify_selected_driver_in_driverArray(this.my_row.last_selected_index);

              this.message.success = 'Driver found';
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
