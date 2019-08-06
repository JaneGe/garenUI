import { Component, OnInit } from '@angular/core';
import * as publicFunction from '../../../../../shared/publicFunction/publicFunction';
@Component({
  selector: 'app-already-goods',
  templateUrl: './already-goods.component.html',
  styleUrls: ['../../../public.scss','./already-goods.component.scss']
})
export class AlreadyGoodsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  addClass1(target:any){
    publicFunction.toggleSingleClass(target);
  }
}
