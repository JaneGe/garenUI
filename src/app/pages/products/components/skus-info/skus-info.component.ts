import {Component, OnInit} from '@angular/core';

class Tabs { //选项卡
  name: string;
  selected: boolean;
}

const TABS: Tabs[] = [
  {name: '商品SKU', selected: true},
  {name: '虚拟SKU', selected: false},
  {name: '渠道SKU', selected: false},
];

@Component({
  selector: 'app-skus-info',
  templateUrl: './skus-info.component.html',
  styleUrls: ['./skus-info.component.scss']
})

export class SkusInfoComponent implements OnInit {
  tabs: Tabs[] = TABS;
  selectedTab: Tabs;

  constructor() {

    this.selectedTab =  this.tabs.find(e => e.selected);


  }

  ngOnInit() {

  }

  tabChoose(i: Tabs) {

    for (const a of this.tabs) {
      a.selected = false;
    }

    this.selectedTab = i;
    i.selected = true;
  }

}
