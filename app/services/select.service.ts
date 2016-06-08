
import {Injectable}                from '@angular/core';
import {Http, Response, Headers}  from '@angular/http';
import {RequestOptions}            from '@angular/http';
import { Driver }                  from '../driver';
import {Observable}                from 'rxjs/Observable';

// needed for .map to work with .get
import 'rxjs/Rx';

@Injectable()
export class SelectService {
  constructor (private http: Http) { }


  /*
  The delete_row_API call is set up as an observable of type array of Driver objects.

  How it works: We make a call to the Ajax endpoint for deleting table entries and observe
  what is returned. The endpoint to access our SQLite database is written in PHP.
 */

  delete_row_API (drivername:string):Observable<Driver[]> {
    var driver_data:any;

    // for GET use 'application/text'

    var getHeaders = new Headers({'Content-Type': 'application/text'});

    console.log("delete_row_API location.host: " + location.host);
    console.log("delete_row_API tail: /app/services/delete_endpoint.php");
    let delete_url = "http://" + location.host + "/app/services/delete_endpoint.php?drivername=" + drivername;
    console.log("delete_row_API delete_url: " + delete_url);

    driver_data = this.http.get(delete_url, {headers: getHeaders})
        .map(this.deleteData)
        .catch(this.handleDeleteError);

    // return the result of delete_endpoint.php
    return driver_data;
  }

  /*
   We expect the endpoint to return TRUE if the query succeeded, FALSE on failure
   */
  private deleteData(response: Response) {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('Bad response status: ' +  response.status);
    }

    console.error("deleteData response status code: "+ response.status);
    return [{ }];
  }


  private handleDeleteError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    var errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    alert ("select.service.ts handleError() .'" + errMsg + "'. Did not delete driver!");
    return Observable.throw(errMsg);
  }
}



