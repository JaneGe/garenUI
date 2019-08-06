import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-logistics',
  template: `<router-outlet></router-outlet>`,
})
export class LogisticsComponent implements OnInit {

  // @Input()
  // logisticsList: any[] = [];

   constructor() {

   }


  ngOnInit() {
   console.log("111111111");
    // console.log(this.logisticsList);

  }

}

