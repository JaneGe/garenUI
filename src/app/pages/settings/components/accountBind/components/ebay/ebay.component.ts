import { Component, OnInit } from '@angular/core';

export class AccountData {
  code: string;
  account: string;
  apac: number;
  start: string;
  end: string;
  state: number;
}
const ACCOUNTDATA: AccountData[] = [
  { code: 'WW', account: 'tommy00', apac: 0, start: '2017-07-26 15:16:55', end: '2019-01-17 15:16:48', state: 1 },
  { code: 'WW', account: 'tommy01', apac: 0, start: '2017-07-26 15:16:55', end: '2019-01-17 15:16:48', state: 1 },
  { code: 'WW', account: 'tommy02', apac: 0, start: '2017-07-26 15:16:55', end: '2019-01-17 15:16:48', state: 1 },
];
@Component({
  selector: 'app-ebay',
  templateUrl: './ebay.component.html',
  styleUrls: ['./ebay.component.scss']
})
export class EbayComponent implements OnInit {

  accountdata = ACCOUNTDATA;

  constructor() { }

  ngOnInit() {
  }
  stateChange(i) {
    if (this.accountdata[i].state === 1) {
      this.accountdata[i].state = 0;
    } else {
      this.accountdata[i].state = 1;
    }
  }
}
