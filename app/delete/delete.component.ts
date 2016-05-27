
import { Component }          from '@angular/core';
import { HTTP_PROVIDERS }     from '@angular/http';
import { DeleteService }      from '../services/delete.service';
import { Driver }             from '../driver';
import { MOCK_DRIVERS }       from '../services/mock-drivers';

@Component({
  selector: 'my-delete',
  templateUrl: 'app/delete/delete.component.html',
  styleUrls: ['app/delete/delete.component.css'],
  providers: [  HTTP_PROVIDERS,  DeleteService, Driver ]
})

export class DeleteComponent {

  constructor (
    private _deleteService: DeleteService
  ) { }

  driver: Driver;

  errorMessage: string;
  successMessage: string;

  /*
   delete_driver() is the event handler for clicking the Delete button. It calls the delete service.
   */
  delete_driver(driver:Driver) {
    this._deleteService.delete_driver_API(driver)
        .subscribe(
            driver  => /* if here then record modified, so now clear fields */ this.clear_driver(),
            error => {
              if (error.status == "403") {
                this.errorMessage = "Oops, Duplicate Driver Name";
              } else {
                this.errorMessage = "Unknown error";
              }
            }
        );
  }

  clear_driver() {
    this.driver.selected = false;
    this.driver.drivername = "";
    this.driver.password = "";
    this.driver.ability = "";
    this.driver.firstname = "";
    this.driver.lastname = "";
    this.driver.email = "";
    this.driver.address = "";
    this.driver.city = "";
    this.driver.state = "";
    this.driver.zip = "";
    this.driver.phone = "";
  }
}
