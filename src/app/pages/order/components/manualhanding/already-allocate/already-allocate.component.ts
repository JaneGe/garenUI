import { Component, OnInit } from '@angular/core';
import * as publicFunction from '../../../../../shared/publicFunction/publicFunction';
@Component({
  selector: 'app-already-allocate',
  templateUrl: './already-allocate.component.html',
  styleUrls: ['../../../public.scss','./already-allocate.component.scss']
})
export class AlreadyAllocateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  addClass1(target:any){
    publicFunction.toggleSingleClass(target);
  }
}
