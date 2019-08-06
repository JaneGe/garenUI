import { Component, OnInit } from '@angular/core';
import * as publicFunction from '../../../../../shared/publicFunction/publicFunction';
@Component({
  selector: 'app-already-cancel',
  templateUrl: './already-cancel.component.html',
  styleUrls: ['../../../public.scss','./already-cancel.component.scss']
})
export class AlreadyCancelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  addClass1(target:any){
    publicFunction.toggleSingleClass(target);
  }
}
