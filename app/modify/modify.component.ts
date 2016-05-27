
import { Component, OnInit }    from '@angular/core';
import { FORM_DIRECTIVES, FORM_PROVIDERS }    from '@angular/common';
import { HTTP_PROVIDERS }       from '@angular/http';
import { ROUTER_DIRECTIVES }    from '@angular/router';
import { Driver }               from '../driver';
import { ModifyService }        from '../services/modify.service';


@Component({
  selector: 'my-modify',
  templateUrl: 'app/modify/modify.component.html',
  styleUrls: ['app/modify/modify.component.css'],
  providers:  [  FORM_PROVIDERS, HTTP_PROVIDERS,  ModifyService, Driver ],

  directives: [ FORM_DIRECTIVES ]
})

export class ModifyComponent implements OnInit {
  constructor(
      private _modifyService:ModifyService
      ) {  }

  driver:Driver;

  ngOnInit (){
    // read query string from uri to obtain the drivername to be modified
    var url = document.location;
    var hash = url.hash;
    var drivername = hash.split('drivername=')[1];
    alert("modify drivername " + drivername);
    this.driver.drivername = drivername;
  }
  

  /*
   modify_driver() is the event handler for clicking the Modify button. It calls the modify service.
   */

  modify_driver(drivername:string) {

    var errorMessage:string;
    this._modifyService.modify_driver_API(this.driver)
        .subscribe(
            driver  => alert('Modified'),
            error => {
              if (error.status == "403") {
                errorMessage = "Oops, Duplicate Driver Name";
              } else {
                errorMessage = "Unknown error";
              }
            }
        );
  }

  getDriver(){
  }
}
