import { Component, OnInit } from '@angular/core';

class Tabs {
  name: string;
  selected: boolean;
}
const TABS: Tabs[] = [
  { name: '全部包裹', selected: true },
  { name: '重量异常包裹', selected: false },
];

@Component({
  selector: 'app-packageSearch',
  templateUrl: './packageSearch.component.html',
  styleUrls: ['./packageSearch.component.scss'],
})

export class PackageSearchComponent implements OnInit {
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
