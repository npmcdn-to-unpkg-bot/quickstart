import {Injectable}                from '@angular/core';
import {Http, Response, Headers}   from '@angular/http';
import {RequestOptions}            from '@angular/http';
import { Driver }                  from '../driver';
import { DriverService }           from '../services/driver.service';
import {Observable}                from 'rxjs/Observable';

@Injectable()
export class AddService {
  constructor (private http: Http,
               private driverService:DriverService) { }

  new_driver:Driver;

  add_driver_to_database(driver:Driver): Observable<Driver> {
    var driver_json_input: Object;
    var new_driver: Object;

    driver_json_input = {
      "drivername": driver.drivername,
      "password": driver.password,
      "ability": driver.ability,
      "firstname": driver.firstname,
      "lastname": driver.lastname,
      "email": driver.email,
      "address": driver.address,
      "city": driver.city,
      "state": driver.state,
      "zip": driver.zip,
      "phone": driver.phone
    };

    new_driver = {
      "drivername": driver.drivername,
      "password": driver.password,
      "ability": driver.ability,
      "firstname": driver.firstname,
      "lastname": driver.lastname,
      "email": driver.email,
      "address": driver.address,
      "city": driver.city,
      "state": driver.state,
      "zip": driver.zip,
      "phone": driver.phone
    };



    let body = JSON.stringify(driver_json_input);


    console.log("add_driver_API body (the json string input) " + body);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    //console.log("add_driver_API location.host: " + location.host);
    //console.log("add_driver_API tail: /app/list/list_endpoint.php");
    let add_url = "http://" + location.host + "/app/services/add_endpoint.php";
    //console.log("add_driver_API list_url: " + add_url);

    return this.http.post(add_url, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  private extractData(response: Response) {
    if (!(response.status < 200 || response.status >= 300)) {
      
    } else {
      throw new Error('Bad response status: ' +  response.status);
    }

    let body = response.statusText;
  }


  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error || 'Server error';
    console.log(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}



