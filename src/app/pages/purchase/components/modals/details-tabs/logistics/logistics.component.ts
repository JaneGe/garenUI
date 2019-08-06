import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.scss']
})
export class LogisticsComponent implements OnInit {
  @Input() logisticsList: any[];
  constructor() { }

  ngOnInit() {

  }

}
