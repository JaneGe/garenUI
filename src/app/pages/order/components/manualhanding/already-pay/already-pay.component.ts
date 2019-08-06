import { Component, OnInit } from '@angular/core';
import * as publicFunction from '../../../../../shared/publicFunction/publicFunction'
@Component({
  selector: 'app-already-pay',
  templateUrl: './already-pay.component.html',
  styleUrls: ['../../../public.scss','./already-pay.component.scss']
})
export class AlreadyPayComponent implements OnInit {

  constructor() { }
  addClass1(target:any){
    publicFunction.toggleSingleClass(target);
  }
  ngOnInit() {
  }
}
