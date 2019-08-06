import { Component, OnInit } from '@angular/core';
import * as publicFunction from '../../../../../shared/publicFunction/publicFunction';
@Component({
  selector: 'app-already-deliver',
  templateUrl: './already-deliver.component.html',
  styleUrls: ['../../../public.scss','./already-deliver.component.scss']
})
export class AlreadyDeliverComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  addClass1(target:any){
    publicFunction.toggleSingleClass(target);
  }
}
