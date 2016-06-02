import { Component, OnInit }  from '@angular/core';
import { FORM_DIRECTIVES ,
    FORM_PROVIDERS }          from '@angular/common';
import { HTTP_PROVIDERS }     from '@angular/http';
import { Router }             from '@angular/router';
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
      private driverService: DriverService,
      private router: Router
      ) {  }

  private message = {
    success: '',
    error: ''
  };

  driving_ability_list = ['Bicycle', 'Scooter', 'Motorcycle', 'Car with Automatic Transmission',
    'Car with Manual Transmission', 'Commercial Truck'];

  // driver model
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
    last_selected_index: 0,
    drivername: ''
  };

  ngOnInit (){
    // find selected rows
    this.my_row = this.driverService.find_selected();

    if (this.my_row.total_selected != 1) {
      alert("Select one row to modify");

      // go back to list view
      this.router.navigate(['/']);
      this.driverService.active_menu = "List";
    } else {
      // populate this modify page form field model with existing driverArray data
      let i = this.my_row.last_selected_index;
      this.driver.selected    = this.driverService.driverArray[i].selected;
      this.driver.drivername  = this.driverService.driverArray[i].drivername;
      this.driver.password    = this.driverService.driverArray[i].password;
      this.driver.ability     = this.driverService.driverArray[i].ability;
      this.driver.firstname   = this.driverService.driverArray[i].firstname;
      this.driver.lastname    = this.driverService.driverArray[i].lastname;
      this.driver.email       = this.driverService.driverArray[i].email;
      this.driver.address     = this.driverService.driverArray[i].address;
      this.driver.city        = this.driverService.driverArray[i].city;
      this.driver.state       = this.driverService.driverArray[i].state;
      this.driver.zip         = this.driverService.driverArray[i].zip;
      this.driver.phone       = this.driverService.driverArray[i].phone;
    }
  }


  /*
      modify_driver() is the click handler for the Modify button on the modify page.
   */
  modify_driver(driver:Driver){
    this.driverService.modify_selected_driver_in_driverArray(driver);
    this.driverService.modify_selected_driver_in_database(driver).subscribe(
      driver => {
        this.message.success = 'Driver ' + this.driver.drivername + ' updated';
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
