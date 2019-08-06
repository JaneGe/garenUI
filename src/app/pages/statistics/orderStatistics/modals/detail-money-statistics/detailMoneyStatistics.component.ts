import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-detailMoneyStatistics',
  templateUrl: './detailMoneyStatistics.component.html',
  styleUrls: ['./detailMoneyStatistics.component.scss'],
})

export class DetailMoneyStatisticsComponent implements OnInit {

  groupNum: number = 4;
  times: Array<number> = [];
  Data = [
    {account: 'abc', orderNum: '111', money: '222'},
    {account: 'sss', orderNum: '234', money: '5345'},
    {account: 'aaaabc', orderNum: '112', money: '435'},
    {account: 'tttt', orderNum: '55', money: '77'},

    {account: 'abc', orderNum: '111', money: '222'},
    {account: 'sss', orderNum: '234', money: '5345'},
    {account: 'aaaabc', orderNum: '112', money: '435'},
    {account: 'tttt', orderNum: '55', money: '77'},

    {account: 'abc', orderNum: '111', money: '222'},
    {account: 'sss', orderNum: '234', money: '5345'},
    {account: 'aaaabc', orderNum: '112', money: '435'},
    {account: 'tttt', orderNum: '55', money: '77'},

    {account: 'abc', orderNum: '111', money: '222'},
    {account: 'sss', orderNum: '234', money: '5345'},

  ];

  aLLAccountDescList: any[] = [];

  constructor(private activeModal: NgbActiveModal) {
    // for(var i=0;i<Math.ceil(this.Data.length/this.groupNum);i++){
    //   this.times.push(i);
    // }

  }

  ngOnInit() {
    for (var i = 0; i < Math.ceil(this.aLLAccountDescList.length / this.groupNum); i++) {
      this.times.push(i);
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
