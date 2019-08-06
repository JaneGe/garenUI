import { AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { tablePic } from "../../../../../shared/animations/tablePic";
import { OrderInfoService } from "../../../../../shared/services/order.service";
import { Observable } from "rxjs/Observable";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { tableService } from "./table.service";
import { AllOrderExceptionListModel } from "../../../../../shared/models/orders/all-orderException-list-model";
import { OrderDetailModalComponent } from "../../modals/order-detail-modal/order-detail-modal.component";
import { Http } from "@angular/http";
import { OrderExceptionService } from "../../../../../shared/services/orderException-service";
import { orderErrorList, OrderManualService } from "../../../../orderManual.service";
import { RootComponent } from "../../../../../shared/component/root.component";
import { AuthorityComponent } from "../../../../../shared/component/authority.component";
import { ActivatedRoute, Router } from "@angular/router";
import { PackageModalComponent } from "../../modals/packageModal/packageModal.component";
import { DetailsComponent } from '../../../../purchase/components/modals/details/details.component';
import { EditeBackInfo } from '../modals/edite-back-info/edite-back-info.component.ts.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['../../../style.scss', './table.component.scss'],
  providers: [tableService, OrderInfoService, OrderExceptionService],
  animations: [tablePic]
})
export class TableComponent extends AuthorityComponent implements OnInit, OnChanges {

  orderinfo = [];// table订单信息
  //  pageSize: number = 20;
  // pageNumber: number = 1;
  dataNumber: number = 1;
  detail: any;

  tagselected;//销售渠道详细展示
  searchMore = 0;//高级筛选按钮状态
  modalstate = 0;
  screen = [];//假数据数组
  dataSource: Observable<any>;
  dataState = false;
  @Input()
  warehouseId: any;
  @Input()
  orderException: string;
  @Input()
  orderCompleteSalesStatus: string;
  @Input()
  selectedChannelType: string = '';
  @Input()
  selectedChannelId: number;
  @Input()
  selectCountryCode: string = '';
  @Input()
  selectedTimeFiltType: string;
  @Input()
  selectedTimeValueType: string = '';
  @Input()
  timeSearchStart: string;
  @Input()
  timeSearchEnd: string;
  @Input()
  selectSearchType: string;
  @Input()
  searchText: string;
  @Input()
  orderBatchsearchType: string;
  @Input()
  orderBatchsearchText: string;
  @Input()
  isCheck: boolean;
  @Input()
  orderBatchsearch: string;
  @Input()
  isRefresh: boolean;
  @Input()
  hasWarehouse: boolean;
  @Input()
  isContinue: boolean = false;
  @Input()
  isProfit: boolean = false;
  @Input()
  isNoSKU: boolean = false;
  @Input()
  isCustoms: boolean = false;
  @Input()
  isNoStorage: boolean = false;
  @Input()
  isFaileBack: boolean = false;
  @Input()
  selectedChannelIds: any[] = [];
  // 物流信息异常
  @Input()
  isLogisticsInfo: boolean = false;
  @Output() childselectOrderIds = new EventEmitter<any>();
  @Output() childIsCheckAllPages = new EventEmitter<any>();
  @Output() childIsRefresh = new EventEmitter<any>();

  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;
  items: AllOrderExceptionListModel[] = [];


  selectOrderIds: number[] = [];
  isCheckAllPages: boolean = false;


  // orderBatchsearchType: string= 'OrderNumber';
  // orderBatchsearchText: string;


  constructor(public http: Http,
    private orderInfoService: OrderInfoService,
    private tableService: tableService,
    private modalService: NgbModal,
    private orderExceptionService: OrderExceptionService,
    private orderManualService: OrderManualService,
    public activerouter: ActivatedRoute,
    public router: Router) {
    super(activerouter, router);
    this.detail = tableService.detail[0];
  }

  changeLog: string[] = [];

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log('ngOnChanges');
    let isReturn = true;
    for (let propName in changes) {
      if (propName == 'isCheck') {
        this.onCheclAllPageChange(this.isCheck);
      }
      else if (propName == 'isRefresh') {
        //this.loadData();
        isReturn = false;
      }
      else {
        isReturn = false;
      }
    }

    if (isReturn) {
      return;
    }

    // ||this.isRefresh == true
    if (this.orderBatchsearch == null) {
      if (!this.hasWarehouse) {
        this.loadData();
      }
      else {
        if (this.warehouseId) {
          this.loadData();
        }
      }
      //  this.isRefresh=false;

    }
    this.childIsRefresh.emit(this.isRefresh);

  }


  ngOnInit() {

  }

  public ImgState(i, index) {
    if (this.orderinfo[i].orderUrls && this.orderinfo[i].orderUrls.length) {
      if (this.orderinfo[i].current === 0) {
        return index === 0 ? 'on' :
          index === 1 ? 'next' :
            index === this.orderinfo[i].orderUrls.length - 1 ? 'prev' :
              'off';
      } else if (this.orderinfo[i].current === this.orderinfo[i].orderUrls.length - 1) {
        return index === this.orderinfo[i].orderUrls.length - 1 ? 'on' :
          index === this.orderinfo[i].orderUrls.length - 2 ? 'prev' :
            index === 0 ? 'next' :
              'off';
      }
      switch (index - this.orderinfo[i].current) {
        case 0:
          return 'on';
        case 1:
          return 'next';
        case -1:
          return 'prev';
        default:
          return 'off';
      }
    } else {
      return 'off';
    }
  }

  Next(i) {
    this.orderinfo[i].current = (this.orderinfo[i].current + 1) % this.orderinfo[i].orderUrls.length;
    this.orderinfo[i].goodsindex = this.orderinfo[i].current;
  }

  Prev(i) {
    this.orderinfo[i].current = this.orderinfo[i].current - 1 < 0 ? this.orderinfo[i].orderUrls.length - 1 : this.orderinfo[i].current - 1;
    this.orderinfo[i].goodsindex = this.orderinfo[i].current;
  }

  Change(e, i) {
    if (e === 'left') {
      this.Next(i);
    } else if (e === 'right') {
      this.Prev(i);
    }
  }

  //右上方切换筛选搜索
  seekmode = 0;

  seekMode(i) {
    this.seekmode = i;
    console.log(this.seekmode);
  }

  displaynum = 0;

  DisplayNum() {
    this.displaynum ? this.displaynum = 0 : this.displaynum = 1;
  }


  pageChanged(pN: number): void {
    $('html, body').animate({ scrollTop: 0 }, 0);
    this.dataState = false;
    this.loadData(pN);
  }

  reloadData() {
    this.loadData(this.pageNumber);
  }

  onSelect($event, i) {
    console.log($event.innerText);
    if (i != undefined) {
      this.tagselected = i;
    }
  }

  SearchMore() {
    if (this.searchMore === 1) {
      this.searchMore = 0;
    } else {
      this.searchMore = 1;
    }
  }

  ModalState() {
    this.modalstate ? this.modalstate = 0 : this.modalstate = 1;
  }

  openPackageDetailModal(packageId: string, ordernumber: string, status: string) {
    const searchModal = this.modalService.open(PackageModalComponent, { size: 'lg', backdrop: 'static' });
    searchModal.componentInstance.modalHeader = '包裹详情';
    searchModal.componentInstance.packageId = packageId;
    searchModal.componentInstance.ordernumber = ordernumber;
    searchModal.componentInstance.status = status;
    searchModal.result.then(result => {
      this.reloadData();
    }, reason => {
    })
  }
  openOrderDetailModal(orderId: number) {
    const searchModal = this.modalService.open(OrderDetailModalComponent, { size: 'sm', backdrop: 'static' });
    searchModal.componentInstance.modalHeader = '订单详情';
    searchModal.componentInstance.orderId = orderId;
    searchModal.result.then(result => {
      this.reloadData();
    }, reason => {
    })
  }

  editeBackInfo(order: number) {
    const searchModal = this.modalService.open(EditeBackInfo, { size: 'sm', backdrop: 'static' });
    searchModal.componentInstance.orderId = order;
    searchModal.result.then(result => {
      this.reloadData();
    }, reason => {
    })
  }
  ignoreCompleteSale(order: number) {
    let orderIds: number[] = [order];
    this.confirm('确定不再回传', () => {

      this.orderExceptionService.NoComesBack(null,
        null, null, null, null,
        null, null, null, null, null,
        null, null, orderIds
      ).subscribe(data => {
        this.alertMessage("订单已设为不再回传");
        this.reloadData();
      }, this.handleError);
    });
  }

  loadData(pageNumber: number = 1) {
    this.selectOrderIds = [];
    this.childselectOrderIds.emit(this.selectOrderIds);
    this.orderExceptionService.searchOrderExceptionList(this.orderException, this.orderCompleteSalesStatus,
      pageNumber, this.pageSize, this.warehouseId, this.selectedChannelType,
      this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
      this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
      this.orderBatchsearchType, this.orderBatchsearchText, null, this.selectedChannelIds
    )
      .subscribe(data => {
        const pageData = data.content;
        console.log(data.content.items);
        this.items = pageData.items;
        let errType = this.orderException ? this.orderException : this.orderCompleteSalesStatus;

        let channelAll, countrylAll;
        channelAll = this.selectedChannelType == undefined || this.selectedChannelType.length == 0;
        countrylAll = this.selectCountryCode == undefined || this.selectCountryCode.length == 0;
        //console.log(channelAll,countrylAll);

        if (channelAll && countrylAll && this.items.length == 0) {
          this.orderManualService.sendMessage({ kill: true, errType: errType });
          console.log('table不存在数据');
        }
        if (channelAll && countrylAll && this.items.length > 0) {
          this.orderManualService.sendMessage({ kill: false, errType: errType });
          console.log('table存在数据');
        }
        this.pageNumber = pageData.pageInfo.pageIndex + 1;
        this.pageSize = pageData.pageInfo.pageSize;
        this.total = pageData.pageInfo.totalCount;
      });

  }


  // 选中所有页
  onCheclAllPageChange(checked: boolean) {
    if (this.isCheckAllPages == checked) {
      return;
    }

    if (checked) {
      this.selectOrderIds = [];
      for (let o of this.items) {
        this.selectOrderIds.push(o.id);
      }
    }
    else {
      this.selectOrderIds = [];
    }
    this.isCheckAllPages = checked;
    this.childselectOrderIds.emit(this.selectOrderIds);
  }


  onCheckAllOrderChanged(checked: boolean) {
    if (checked) {
      this.selectOrderIds = [];
      for (let o of this.items) {
        this.selectOrderIds.push(o.id);
      }
    }
    else {
      this.selectOrderIds = [];
      this.isCheckAllPages = false;
    }

    console.info(this.selectOrderIds);
    this.childselectOrderIds.emit(this.selectOrderIds);
    this.childIsCheckAllPages.emit(this.isCheckAllPages);
  }

  onCheckOrderChanged(isChecked: boolean, orderId: number) {
    if (isChecked) {
      const orderIndex = this.selectOrderIds.indexOf(orderId);
      if (orderIndex >= 0) {
        return;
      }
      else {
        this.selectOrderIds.push(orderId);
      }
    }
    else {
      const orderIndex = this.selectOrderIds.indexOf(orderId);
      if (orderIndex >= 0) {
        this.selectOrderIds.splice(orderIndex, 1);
      }
      else {
        return;
      }
      this.isCheckAllPages = false;
    }

    this.childselectOrderIds.emit(this.selectOrderIds);
    this.childIsCheckAllPages.emit(this.isCheckAllPages);
  }


  continueDeliver(orderId: number) {
    this.confirm("确定继续发货该订单?", () => {

      this.orderExceptionService.ContinueShipmentById(orderId).subscribe(data => {
        this.alertMessage('该订单已经重新推送到仓库');
        this.orderBatchsearch = null;
        this.isCheckAllPages = false;
        this.reloadData();
      }, this.handleError);

    })
  }

  openDetailsModal(id: any) {
    const activeModal = this.modalService.open(DetailsComponent, { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = "1688订单详情";
    activeModal.componentInstance.platOrderId = id;
    activeModal.result.then(result => {
      if (result != undefined) {
        console.log(result);
      }
    })
  }
}
