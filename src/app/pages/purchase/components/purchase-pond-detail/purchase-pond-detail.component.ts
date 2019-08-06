import { Component, OnInit } from '@angular/core';

class Tabs {
  name: string;
  selected: boolean;
}
const TABS: Tabs[] = [
  { name: '1688采购单', selected: true },
  { name: '其他采购单', selected: false },
];
@Component({
  selector: 'app-purchase-pond-detail',
  templateUrl: './purchase-pond-detail.component.html',
  styleUrls: ['./purchase-pond-detail.component.scss']
})

export class PurchasePondDetailComponent implements OnInit {
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
