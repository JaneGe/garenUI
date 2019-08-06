import {Component, Input, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailModalComponent } from 'app/pages/order/components/modals/order-detail-modal/order-detail-modal.component';
import {TabelChartService} from "../tabelChart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../../shared/component/authority.component";

@Component({
  selector: 'app-order-lose-money',
  templateUrl: './order-lose-money.component.html',
  styleUrls: ['../../public.scss', './order-lose-money.component.scss'],
  providers: [TabelChartService]
})
export class OrderLoseMoneyComponent extends AuthorityComponent implements OnInit {
  PageInfo = { pageSize: 100, pageIndex: 1, totalCount: 0 };

  @Input()
  selectedplateForm: any;
  @Input()
  selectedordertimesearch: any = 1;
  @Input()
  selectedorder: any = 1;
  @Input()
  selectedcountry: string = '全部';
  @Input()
  rangeTimes: any = {};
  @Input()
  rangeCurreny: any = {};

  lostmoneys:any[]=[];
  selectedAccounts: any[] = [];
  accountList: any[] = [];
  aLLAccountDescList: any[] = [];
  constructor(private tabelChartService: TabelChartService, public activerouter: ActivatedRoute,
              public router: Router,private modalService: NgbModal) {
    super(activerouter, router);
  }

  ngOnInit() {
    this.OnQuery();
  }

  getchildChangePlateForm(val: any) {
    this.selectedplateForm = val;
    this.OnQuery();
  }

  getchildChangeOrdertimeSearch(val: any) {
    this.selectedordertimesearch = val;
    this.OnQuery();
  }

  getchildSelectOrder(val: any) {
    this.selectedorder = val;
    if (this.selectedorder != 5) {
      this.OnQuery();
    }
  }


  getchildChangeAccounts(val: any) {
    this.selectedAccounts = val;
    this.OnQuery();
  }

  getchildChangeCountry(val: any) {
    this.selectedcountry = val;
    this.OnQuery();
  }

  getchildOnchangeTime(val: { beginTime: any, endTime: any, directly: boolean }) {
    this.rangeTimes = {beginTime: val.beginTime, endTime: val.endTime};
    if (val.directly) {
      this.OnQuery();
    }
  }

  getchildOnchangeCurreny(currencyRange:any) {
    this.rangeCurreny = currencyRange;
      this.OnQuery();
  }

  pageChanged(pn) {
    this.PageInfo.pageIndex = pn;
    this.OnQuery(pn);
  }

  OnQuery(pageNumber: number = 1) {
    const param = {
      ChannelType: this.selectedplateForm,
      TimeSearchType: this.selectedordertimesearch,
      TimeSpanEnum: this.selectedorder,
      BeginTime: this.rangeTimes.beginTime,
      EndTime: this.rangeTimes.endTime,
      Country: this.selectedcountry,
      PageIndex: pageNumber - 1,
      PageSize: this.PageInfo.pageSize,
      SelectedAccounts: this.selectedAccounts,
      MinCurreny: this.rangeCurreny.MinCurreny,
      MaxCurreny: this.rangeCurreny.MaxCurreny
    };
    this.tabelChartService.GetOrderLoseMoneyStatisticQuery(param).subscribe(data => {
      this.lostmoneys = data.content.items;
      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;

    }, this.handleError);

  }

  orderModal(orderId: number) {
    const modal = this.modalService.open(OrderDetailModalComponent, { size: 'sm', backdrop: 'static' });
    modal.componentInstance.modalHeader = '编辑订单';
    modal.componentInstance.orderId = orderId;
    modal.result.then(result => {
      /*  if (result === 1) {
         this.reloadData();
       } */
    }, reason => {
    })
  }
}
