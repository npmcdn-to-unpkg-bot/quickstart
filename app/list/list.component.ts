import { Component, OnInit }  from '@angular/core';
import { FORM_DIRECTIVES,
          FORM_PROVIDERS }    from '@angular/common';
import { NgClass }            from '@angular/common';
import { Driver }             from '../driver';
import { DriverService }      from '../services/driver.service';

@Component({
  selector: 'my-list',
  templateUrl: 'app/list/list.component.html',
  styleUrls:  ['app/list/list.component.css'],
  providers:  [ FORM_PROVIDERS, Driver ],
  directives: [ FORM_DIRECTIVES, NgClass ]
})

export class ListComponent implements OnInit {

  constructor(private driverService: DriverService) {}

  drivers = this.driverService.driverArray;

  ngOnInit() {
    console.info('list.component.ts initialized');
  }

  errorMessage = "";
  saved_drivername = "";
  last_row_selected = -1;

 /*
  row_selected is the click handler toggling row selection
  */
  row_selected(i:number) {
    console.log(`row ${i} clicked`);

    this.driverService.driverArray[i].selected = !this.driverService.driverArray[i].selected;
  }
}