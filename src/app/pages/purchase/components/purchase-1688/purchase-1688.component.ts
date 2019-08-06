import { Component, OnInit } from '@angular/core';

class Tabs {
  name: string;
  selected: boolean;
}
const TABS: Tabs[] = [
  { name: '1688订单', selected: true },
  { name: '其他订单', selected: false },
];
@Component({
  selector: 'app-purchase-1688',
  templateUrl: './purchase-1688.component.html',
  styleUrls: ['./purchase-1688.component.scss']
})

export class Purchase1688Component implements OnInit {
  tabs: Tabs[] = TABS;
  selectedTab: Tabs;

  constructor() {
    this.selectedTab = this.tabs.find(e => e.selected);
  }

  ngOnInit() { }

  tabChoose(i: Tabs) {
    for (const a of this.tabs) {
      a.selected = false;
    }
    this.selectedTab = i;
    i.selected = true;
  }
}
