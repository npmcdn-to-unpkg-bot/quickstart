import {Injectable}                from '@angular/core';
import {Http, Response, Headers}   from '@angular/http';
import {RequestOptions}            from '@angular/http';
import { Driver }                  from '../driver';
import { DriverService }           from '../services/driver.service';
import {Observable}                from 'rxjs/Observable';

@Injectable()
export class DeleteService {
  constructor(private http:Http,
              private driverService:DriverService) {
  }

  private message = {
    success: '',
    error: ''
  };

  driver:Driver;
  
}

  /*
  driver_json_input = {
    "selected": this.driver.selected,
    "drivername": this.driver.drivername,
    "password": this.driver.password,
    "ability": this.driver.ability,
    "firstname": this.driver.firstname,
    "lastname": this.driver.lastname,
    "email": this.driver.email,
    "address": this.driver.address,
    "city": this.driver.city,
    "state": this.driver.state,
    "zip": this.driver.zip,
    "phone": this.driver.phone
  };

  let body = JSON.stringify(driver_json_input);

  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });

  let delete_url = "http://" + location.host + "/app/services/delete_endpoint.php";


  return this.http.post(delete_url, body, options)
                  .map(this.extractData)
                  .catch(this.handleError);
  */





