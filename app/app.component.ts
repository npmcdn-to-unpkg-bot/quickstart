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

  // set the initial value to pass to add.component.ts, modify.component.ts, and list.component.ts
  // to indicate which navbar item is highlighted through the @Input decorator in those files
  public active_menu = "List";
  public selected_driver_name = "dummy+driver+name";
  drivers:Driver[];

  ngOnInit() {
    console.info('app.component.ts initialized');
    this.router.navigate(['/']);

    // this is where the drivers list gets loaded....
    this.driverService.fillDriverArray();

    if (this.drivers) {
      console.info('app.component.ts There are ' +
          this.drivers.length + ' driver records being returned');
    }
  }


  change_active_menu(next_active_menu:string) {
    var msg = `change_active_menu(`+ next_active_menu + `)`;
    var zzz = this.driverService.driverArray.length;

    console.log(msg + " I now have " + zzz + " drivers");
    this.active_menu = next_active_menu;
  }
}