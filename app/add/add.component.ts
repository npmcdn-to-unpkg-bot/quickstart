import { Component }            from '@angular/core';
import { FORM_DIRECTIVES, FORM_PROVIDERS }    from '@angular/common';
import { HTTP_PROVIDERS }       from '@angular/http';
import { Driver }               from '../driver';
import { DriverService }        from '../services/driver.service';
import { AddService }           from '../services/add.service';

@Component({
  selector: 'my-add',
  templateUrl: 'app/add/add.component.html',
  styleUrls: ['app/add/add.component.css'],
  providers: [ FORM_PROVIDERS, HTTP_PROVIDERS, AddService, Driver ],
  directives: [ FORM_DIRECTIVES ]
})

export class AddComponent {

  constructor (
    private _addService: AddService
  ) { }

  driving_ability_list = ['Bicycle', 'Scooter', 'Motorcycle', 'Car with Automatic Transmission',
    'Car with Manual Transmission', 'Commercial Truck'];
	driver:Driver;

  chosen_ability:string = 'Select';

  errorMessage: string;
  successMessage: string;
  submitted = false;

  eraseMsg(){
      this.successMessage = '';
      this.errorMessage='';
  }

  slowErase () {
    window.setTimeout(this.eraseMsg, 5000);

  }

  /*
    add_driver() is the event handler for clicking the add button. It calls the add service.
   */
  add_driver(driver:Driver) {
    this.successMessage='';
    this.errorMessage='';

    this._addService.add_driver_API(driver)
        .subscribe(
            driver  => {
              /* if here then record added, so now clear fields */
              this.clear_driver();
              this.successMessage = 'Driver Added';
              window.setTimeout(this.slowErase, 2000);
            },
            error => {
              if (error.status == '403') {
                this.errorMessage = 'Oops, Duplicate Driver Name';
              } else {
                this.errorMessage = 'Unknown error';
              }
              window.setTimeout(this.slowErase, 5000);
            }
        );
  }

  clear_driver() {
    this.driver.selected = false;
    this.driver.drivername = '';
    this.driver.password = '';
    this.driver.ability = '';
    this.driver.firstname = '';
    this.driver.lastname = '';
    this.driver.email = '';
    this.driver.address = '';
    this.driver.city = '';
    this.driver.state = '';
    this.driver.zip = '';
    this.driver.phone = '';

    this.chosen_ability = 'Select';
  }

  // click handler for the drive ability list items
  update_ability(e:Event, chosen:string) {
    e.preventDefault();
    this.chosen_ability = chosen;
    this.driver.ability = chosen;

  }
}
