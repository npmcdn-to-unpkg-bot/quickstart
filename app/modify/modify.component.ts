import { Component, OnInit }  from '@angular/core';
import { FORM_DIRECTIVES ,
    FORM_PROVIDERS }          from '@angular/common';
import { Router }             from '@angular/router';
import { NgClass }            from '@angular/common';
import { Driver }             from '../driver';
import { DriverService }      from '../services/driver.service';

@Component({
  selector: 'my-modify',
  templateUrl: 'app/modify/modify.component.html',
  styleUrls: ['app/modify/modify.component.css'],
  providers:  [  FORM_PROVIDERS, Driver ],
  directives: [ FORM_DIRECTIVES, NgClass ]
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

  // for dropdown lists
  driving_ability_list = ['Bicycle', 'Scooter', 'Motorcycle', 'Car (Automatic Transmission)',
    'Car (Manual Transmission)', 'Commercial Truck'];

  state_abbreviation_list = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    '(U.S.) Virgin Islands',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];

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

  selected_index:number;

  ngOnInit (){
    // find selected rows
    this.selected_index = this.driverService.find_row_to_modify();


    if (this.selected_index > -1) {
      // populate this modify page form field model with existing driverArray data
      let i = this.selected_index;
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

  cancel_modify() {
    // go back to list view
    this.router.navigate(['/']);
    this.driverService.active_menu = "List";
  }

  /*
      modify_driver() is the click handler for the Modify button on the modify page.
   */
  modify_driver(driver:Driver){
    this.driverService.modify_selected_driver_in_driverArray(driver);
    this.driverService.modify_selected_driver_in_database(driver).subscribe(
      driver => {
        this.message.success = 'Driver ' + this.driver.drivername + ' updated';

        // go back to list view
        this.router.navigate(['/']);
        this.driverService.active_menu = "List";
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
