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






