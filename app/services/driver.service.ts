import {Injectable} from '@angular/core';
import {Http, Response, Headers}   from '@angular/http';
import {Observable}                from 'rxjs/Observable';

import { Driver }  from '../driver';
import { MOCK_DRIVERS }  from './mock-drivers';


/*

    This is where the drivers should be read. This is also where we
    can load mock drivers instead. Grasshopper, the world of
    dependency injection is mysterious. The key is that by doing
    injections of code/data the higher level functions don't have
    to change in order to swap out real data for mock data or
    one database for another.

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

  fillDriverArray():void {
    console.info('driver.service.ts in fillDriverArray()');

    /******************* uncomment block for mock data *****************************
    /**/
    this.driverArray = MOCK_DRIVERS;

    if (this.driverArray) {
      console.info('driver.service.ts in fillDriverArray() There are ' +
          this.driverArray.length + ' driver records in driverArray');
    }
    /**/
    /* *****************************************************************************/

    /******************* uncomment block for live data *****************************
    /*
    this.getDriverList();
    */
    /* *****************************************************************************/
  }

  /*
   getDriverListFromDatabase obtains the list of drivers from the database
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
}