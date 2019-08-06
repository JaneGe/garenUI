import { Component, OnInit } from '@angular/core';
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-accountBind',
  templateUrl: './accountBind.component.html',
  styleUrls: ['./accountBind.component.scss'],
})


export class AccountBindComponent extends AuthorityComponent implements OnInit {
  tabs = [
    // { name: 'ebay账号', selected: false },
    { name: 'Amazon账号', selected: true },
    { name: 'Ali1688账号', selected: false },
    { name: 'Wish账号', selected: false },
    { name: '速卖通账号', selected: false },
    // { name: 'Wish账号', selected: false },
    // { name: 'Cdiscount账号', selected: false },
  ];

  choose = 0;

  constructor(public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
  }

  ngOnInit() {
  }

  tabChoose(i) {
    for (const a of this.tabs) {
      a.selected = false;
    }
    this.tabs[i].selected = true;
    this.choose = i;
  }
}
