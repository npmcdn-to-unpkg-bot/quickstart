  import { Component, OnInit, OnChanges } from '@angular/core';
  import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
  import { ListComponent }                from './list/list.component';
  import { AddComponent }                 from './add/add.component';
  import { ModifyComponent }              from './modify/modify.component';
  import { DeleteComponent }              from './delete/delete.component';
  import { Driver }                       from './driver';
  import { DriverService }                from './services/driver.service';

@Component({
  selector: 'my-app',
  styleUrls: ['app/app.component.css'],
  templateUrl: 'app/app.component.html',
  providers:  [ DriverService ],
  directives: [ROUTER_DIRECTIVES]
})

//simultaneously create a router and add its routes
@Routes([
  { path:'/', component: ListComponent },
  { path:'/add', component: AddComponent },
  { path:'/modify', component: ModifyComponent },
  { path:'/delete', component: DeleteComponent }
])

export class AppComponent implements OnInit {
  constructor(private driverService: DriverService,
      private router: Router) {}

  drivers:Driver[];

  ngOnInit() {
    console.info('app.component.ts initialized');

    // this is where the drivers list gets loaded....
    this.driverService.fillDriverArray();

    if (this.drivers) {
      console.info('app.component.ts There are ' +
          this.drivers.length + ' driver records being returned');
    }
  }

  /*
   change_active_menu is the click handler for the navbar in the app.component.html file.
   The configured routes determine what happens next...
   */

  change_active_menu(next_active_menu:string) {
    var msg = `change_active_menu(`+ next_active_menu + `)`;
    var zzz = this.driverService.driverArray.length;

    console.log(`${msg} I now have ${zzz} drivers`);

    // to change the highlighted item on the nav bar...
    this.driverService.active_menu = next_active_menu;

  }

}