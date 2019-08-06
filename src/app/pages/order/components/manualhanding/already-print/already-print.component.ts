import { Component, OnInit } from '@angular/core';
import * as publicFunction from '../../../../../shared/publicFunction/publicFunction';
@Component({
  selector: 'app-already-print',
  templateUrl: './already-print.component.html',
  styleUrls: ['../../../public.scss','./already-print.component.scss']
})
export class AlreadyPrintComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  addClass1(target:any){
    publicFunction.toggleSingleClass(target);
  }
}
