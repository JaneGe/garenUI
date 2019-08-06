import { Component, OnInit } from '@angular/core';
import { TabelChartService } from "../table-chart/tabelChart.service";
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-purchase-money',
  templateUrl: './purchase-money.component.html',
  styleUrls: ['./purchase-money.component.scss']
})
export class PurchaseMoneyComponent  extends AuthorityComponent implements OnInit {
  linemoneyData: any = [];
  purchseMoneyData: any = [];
  title = "7天采购金额走势";

  constructor(private tabelChartService: TabelChartService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
    this.linemoneyData = this.tabelChartService.InSevenDayMoney;
    this.purchseMoneyData = this.tabelChartService.purchseMoneyData;
  }

  ngOnInit() {
  }

}
