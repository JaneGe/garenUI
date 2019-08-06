import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChannelTypeName, CommonOptionModel, SiteConst} from "../../../../shared/services/site-const";
import {AuthorityComponent} from "../../../../shared/component/authority.component";
@Component({
  selector: 'app-select-plateform',
  templateUrl: './select-plateform.component.html',
  styleUrls: ['./select-plateform.component.scss']
})
export class SelectPlateformComponent extends AuthorityComponent implements OnInit {
  platforms:ChannelTypeName[]=SiteConst.supportChannelTypeNoManual;
  constructor(public router:Router,public activerouter: ActivatedRoute
  ) {
    super(activerouter,router);
  }

  ngOnInit() {
  }
}
