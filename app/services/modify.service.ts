
import {Injectable}                from '@angular/core';
import {Http, Response, Headers}   from '@angular/http';
import {RequestOptions}            from '@angular/http';
import { Driver }                  from '../driver';
import {Observable}                from 'rxjs/Observable';

@Injectable()
export class ModifyService {
  constructor (private http: Http) { }

  modify_driver_API(driver:Driver): Observable<Driver> {

    var driver_json_input = {
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


    //here we want to change the body so the first and last character in string is ' rather than "
    //let len = body.length - 2;
    //body = body.substr(1, len);

    console.log("modify_driver_API body (the json string input) " + body);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    //console.log("modify_driver_API location.host: " + location.host);
    //console.log("modify_driver_API tail: /app/list/list_endpoint.php");
    let modify_url = "http://" + location.host + "/app/modify/modify_endpoint.php";
    //console.log("modify_driver_API list_url: " + modify_url);

    return this.http.post(modify_url, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(response: Response) {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('Bad response status: ' +
          response.status);
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



