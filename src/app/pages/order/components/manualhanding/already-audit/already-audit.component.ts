import { Component, OnInit } from '@angular/core';
import * as publicFunction from '../../../../../shared/publicFunction/publicFunction';
@Component({
  selector: 'app-already-audit',
  templateUrl: './already-audit.component.html',
  styleUrls: ['../../../public.scss','./already-audit.component.scss']
})
export class AlreadyAuditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  addClass1(target:any){
    publicFunction.toggleSingleClass(target);
  }
}
