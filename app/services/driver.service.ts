import {Injectable} from '@angular/core';
import {Http, Response, Headers}   from '@angular/http';
import {Observable}                from 'rxjs/Observable';

import { Driver }  from '../driver';
import { MOCK_DRIVERS }  from './mock-drivers';


/*

    This service is where the drivers is read. This is also where
    we can load mock drivers instead. Grasshopper, the world of
    dependency injection is mysterious.
    One key to understanding is that by injecting this code here
    means that other components don't have to change their logic
    in order to swap out real data for mock data or one database
    for another. The application is more flexible/less brittle,
    meaning less prone to break, if other components don't have
    to build those specifications directly inside themselves.
    They just become consumers of that which is provided by services.

    The data is more easily mocked and testing becomes easier.

*/


@Injectable()
export class DriverService {
  constructor (private http: Http) { }

  /*

    Services are 'singletons', meaning there is only one instance of the class
    throughout the application. The benefit of having the DriverService as a singleton
    is that the driverArray will be the same no matter which component is accessing
    it.

  */
  driverArray:Driver[];

  // the model being shown on page
  errorMessage = '';
  saved_drivername = "";
  last_row_selected = -1;

  // set the initial value to pass to add.component.ts, modify.component.ts, and list.component.ts
  // to indicate which navbar item is highlighted through the @Input decorator in those files
  public active_menu = "List";

  private message = {
    success: '',
    error: ''
  };


  fillDriverArray():void {
    console.info('driver.service.ts in fillDriverArray()');

    /******************* uncomment block for mock data *****************************
    /*
    this.driverArray = MOCK_DRIVERS;

    if (this.driverArray) {
      console.info('driver.service.ts in fillDriverArray() There are ' +
          this.driverArray.length + ' driver records in driverArray');
    }
    */

    /*******************************************************************************
     *                                                                             *
     *  NOTE: Make sure you are not trying to run live data when using port 3000.  *
     *  The PHP endpoints do not work well when they're run on localhost:3000 or   *
     *  even 127.0.0.1:3000 when using WAMP as the local server.                   *
     *                                                                             *
     ******************* uncomment block for live data *****************************
    /**/
    this.getDriverList();
    /**/
    /* *****************************************************************************/
  }

  /*
   getDriverListFromDatabase obtains the list of drivers from the database. The backend
   endpoint is written in php.
   */
  getDriverListFromDatabase ():Observable<Driver[]> {
    var driver_data:any;

    // for GET use 'application/text'

    var getHeaders = new Headers({'Content-Type': 'application/text'});

    let list_url = "/app/services/list_endpoint.php";

    driver_data = this.http.get(list_url, {headers: getHeaders})
        .map(this.extractData)
        .catch(this.handleError);
    return driver_data;
  }

  private extractData(response: Response) {
    var body = response.json();
    if (response.status < 200 || response.status >= 300) {
      throw new Error('Bad response status: ' +
          response.status);
    }

    // saved_driver_list = body;
    return body || [{ }];
  }


  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    var errMsg = error || 'Server error';
    console.log(errMsg); // log to console instead
    alert ("list.service.ts handleError() '" + errMsg + "'. Did not receive driver list!");
    return Observable.throw(errMsg);
  }


  /*
   getDriverList() is the way we get live data from the database
   */
  getDriverList() {
    this.getDriverListFromDatabase()
        .subscribe(
            drivers => {
              this.driverArray = drivers;

              console.info('driver.service.ts in fillDriverArray() There are ' +
                  this.driverArray.length + ' driver records in driverArray');
              return this.driverArray;
            },
            error => {
              this.errorMessage = <any>error;
            }
        );
  }

  /*
   change_active_menu is the click handler for the navbar in the app.component.html file.
   The configued routes determine what happens next...
   */

  change_active_menu(next_active_menu:string) {
    var msg = `change_active_menu(`+ next_active_menu + `)`;
    var zzz = this.driverArray.length;

    console.log(msg + " I now have " + zzz + " drivers");
    this.active_menu = next_active_menu;
  }

  /*

    add_driver_API() Addsa new driver member to the end of the driverArray

   */

  add_driver_to_driverArray(new_driver:Driver) {
    this.driverArray.push({
      "selected":   new_driver.selected,
      "drivername": new_driver.drivername,
      "password":   new_driver.password,
      "ability":    new_driver.ability,
      "firstname":  new_driver.firstname,
      "lastname":   new_driver.lastname,
      "email":      new_driver.email,
      "address":    new_driver.address,
      "city":       new_driver.city,
      "state":      new_driver.state,
      "zip":        new_driver.zip,
      "phone":      new_driver.phone
    });
  }


  /*

   delete_driver_API() Looks at the existing driverService.driverArray and removes
   array members that are selected.

   */

  delete_driver_API() {
    var len = this.driverArray.length;
    var updated_driver_array = new Array<Driver>();
    var rows_highlighted = 0;

    // Count the number of driverArray members with selected n== true property.
    // Copy all driverArray members with selected == false to the updated_driver_array.
    for (let i = 0; i < len; i++) {
      if (this.driverArray[i].selected == true) {
        console.log("found selected row: the driver '" +
            this.driverArray[i].drivername + "' at index " + i);
        rows_highlighted++;
      } else {
        updated_driver_array.push({
          "selected":   this.driverArray[i].selected,
          "drivername": this.driverArray[i].drivername,
          "password":   this.driverArray[i].password,
          "ability":    this.driverArray[i].ability,
          "firstname":  this.driverArray[i].firstname,
          "lastname":   this.driverArray[i].lastname,
          "email":      this.driverArray[i].email,
          "address":    this.driverArray[i].address,
          "city":       this.driverArray[i].city,
          "state":      this.driverArray[i].state,
          "zip":        this.driverArray[i].zip,
          "phone":      this.driverArray[i].phone
        });
      }
    }

    if (rows_highlighted > 0) {
      this.driverArray = updated_driver_array;
      this.message.success = "Driver List updated. Deleted " +
          rows_highlighted + " row" + (rows_highlighted > 1 ? "s" : "");
      this.message.error = '';
    } else {
      this.message.error = "Select a driver to delete by clicking/highlighting its row in the list";
      this.message.success = '';
    }
    return this.message;
  }

  /*

   find_selected () is run OnInit for the delete view (in delete.component.ts)
   */

  find_selected() {
    var len = this.driverArray.length;
    var selected_rows = 0;

    for (let i = 0; i < len; i++) {
      if (this.driverArray[i].selected == true) {
        selected_rows++;
      }
    }
    return selected_rows;
  }
}