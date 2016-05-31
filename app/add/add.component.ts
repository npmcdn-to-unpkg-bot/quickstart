import { Component, OnInit }  from '@angular/core';
import { FORM_DIRECTIVES ,
    FORM_PROVIDERS }          from '@angular/common';
import { Router }             from '@angular/router';
import { Driver }             from '../driver';
import { DriverService }      from '../services/driver.service';
import { SelectService }      from '../services/select.service';
import { AddService }         from '../services/add.service';

@Component({
  selector: 'my-add',
  templateUrl: 'app/add/add.component.html',
  styleUrls: ['app/add/add.component.css'],
  providers: [ FORM_PROVIDERS, AddService, SelectService, Driver ],
  directives: [ FORM_DIRECTIVES ]
})

export class AddComponent implements OnInit{
  constructor (
    private _addService: AddService,
    private driverService: DriverService
  ) { }

  driving_ability_list = ['Bicycle', 'Scooter', 'Motorcycle', 'Car (Automatic Transmission)',
    'Car (Manual Transmission)', 'Commercial Truck'];

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

  current_driver:Driver;

  chosen_ability:string = 'Select One';

  message = {
    success: '',
    error: ''
  };

  submitted = false;

  clear_driver(driver:Driver) {
    driver.selected = false;
    driver.drivername = '';
    driver.password = '';
    driver.ability = '';
    driver.firstname = '';
    driver.lastname = '';
    driver.email = '';
    driver.address = '';
    driver.city = '';
    driver.state = '';
    driver.zip = '';
    driver.phone = '';

    this.chosen_ability = 'Select';
    return driver;
  }


  ngOnInit() {
    this.driver = this.clear_driver(this.driver);
  }

  eraseMsg(){
    this.message.success = '';
    this.message.error = '';
    this.driver = this.clear_driver(this.driver);

  }

  slowErase () {
    window.setTimeout(this.eraseMsg, 2000);
  }

  /*
    add_driver() is the event handler for clicking the add button. It calls
   add_driver_to_driverArray() and add_driver_to_database() in driver.service.ts service.
   */
  add_driver(driver:Driver) {
    this.message.success = '';
    this.message.error = '';
    this.current_driver = driver;

    this.driverService.add_driver_to_database(driver)
        .subscribe(
            driver  => {
              //**** must add new driver to end of driver_array, so the list view will reflect this new driver ***
              this.driverService.add_driver_to_driverArray(this.current_driver);

              /* if here then record added, so now clear fields */
              this.clear_driver(this.current_driver);
              this.message.success = 'Driver Added';
              this.slowErase();
            },
            error => {
              if (error.status == '403') {
                this.message.error = 'Oops, Duplicate Driver Name';
              } else {
                this.message.error = 'Unknown error';
              }
              this.slowErase();
            }
        );
  }


  // click handler for the drive ability list items
  update_ability(e:Event, chosen:string) {
    e.preventDefault();
    this.chosen_ability = chosen;
    this.driver.ability = chosen;

  }
}
