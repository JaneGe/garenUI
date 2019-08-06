import {Component, Input, OnInit} from '@angular/core';
import {LogService} from "./log.service";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  providers:[LogService]
})
export class LogsComponent implements OnInit {
  logData:Array<any>;
  pageSize:number=6;
  currentPage:number=1;
  totalItems:number=1;

  @Input()
  notes: any[] = [];

  constructor(private logservice:LogService) { }

  ngOnInit() {
   // this.loadData();
  }
  loadData(){
    this.logData=this.logservice.logData;
    this.totalItems=this.logData.length;
  }
  pageChanged(pn){
    this.currentPage=pn;
  }


}
