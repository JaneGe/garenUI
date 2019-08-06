import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { OrderIdDetailModalComponent } from '../modals/orderId-detail-modal/orderId-detail-modal.component';
import { RootComponent } from 'app/shared/component/root.component';
import { Set1688orderModalComponent } from '../modals/set-1688order-modal/set-1688order-modal.component';
import { CompleteOrderModalComponent } from '../modals/complete-order-modal/complete-order-modal.component';
import { PurchaseHistoryModalComponent } from '../modals/purchase-history-modal/purchase-history-modal.component';
import { InventoryHistoryModalComponent } from '../modals/Inventory-history-modal/Inventory-history-modal.component';
import { PurchaseSkuOrderService } from "../../../../shared/services/purchaseSkuOrder-service";
import { PurchaseOrder1688Service } from "../purchase-1688/purchase-1688.service";
import { CommonOptionModel } from "../../../../shared/services/site-const";
import { MessageService } from 'app/message.service';
import { AuthorityComponent } from "../../../../shared/component/authority.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'purchase-pond-detail-1688',
  templateUrl: './purchase-pond-detail-1688.component.html',
  styleUrls: ['./purchase-pond-detail-1688.component.scss', '../../style.scss'],
  providers: [PurchaseSkuOrderService, PurchaseOrder1688Service]
})
export class PurchasePondDetail1688Component extends AuthorityComponent implements OnInit {

  detailData: any[];
  screen: any[];
  taskId: number;
  _isViewTotal: boolean = false;
  allUsers: any[] = [];


  purchaseSkuOrderList: any[];
  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;
  searchText: string;
  selectPurchaseSkuOrderStatus: string;
  selectRemark: string;
  selectPurchaseUrl: string;
  selectHot: string;
  selectPurchaseSkuOrderIds: number[] = [];
  selectWareHouse: string;


  selectPurchaseUserId: string = null;
  isChanged: boolean = false;

  selectedTimeValueType: string;
  ngTimeSearchStart: any = {};
  ngTimeSearchEnd: any = {};
  ngShortTimeStart: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  ngShortTimeEnd: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  timeSearchStart: string = '';

  timeSearchEnd: string = '';
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };

  allWarehouse = [{ text: '全部', value: '0' },
  { text: '仓库1', value: '1' }, { text: '仓库2', value: '2' }];

  allPurchaseSkuOrderStatus: CommonOptionModel[] = [{ text: '全部', value: null },
  { text: '未处理', value: 'Untreated' }, { text: '已完成', value: 'Completed' }, { text: '已忽略', value: 'Ignoreed' },
  { text: '财务拒绝', value: 'FinancialRefused' }, { text: '商家拒绝', value: 'SellerRefused' }];

  allRemark: CommonOptionModel[] = [{ text: '全部', value: null },
  { text: '有备注', value: 'True' }, { text: '无备注', value: 'False' }];

  allPurchaseUrl: CommonOptionModel[] = [{ text: '全部', value: null }, { text: '是', value: 'True' },
  { text: '否', value: 'False' }];

  allHot: CommonOptionModel[] = [{ text: '全部', value: null }, { text: '是', value: 'True' }, { text: '否', value: 'False' }];

  timeSpan: CommonOptionModel[] = [{ text: '全部', value: null }, { text: '今天', value: 1 },
  { text: '昨天', value: 0 }, { text: '7天以内', value: 7 }, { text: '30天以内', value: 30 }, { text: '自定义', value: 'custom' }];

  suppprtTimeValueTypes: CommonOptionModel[] = [{ text: '全部', value: null },
  { text: '今天', value: 'Today' }, { text: '昨天', value: 'Yesterday' }, { text: '7天以内', value: 'Within7Days' },
  { text: '30天以内', value: 'Within30Days' }, { text: '自定义', value: 'Custom' }];

  constructor(public http: Http,
    private modalService: NgbModal,
    private purchaseOrderService: PurchaseOrder1688Service,
    protected purchaseSkuOrderService: PurchaseSkuOrderService,
    private messageService: MessageService, public activerouter: ActivatedRoute, public router: Router) {
    super(activerouter, router);
  }

  authorities: any[] = [
    { name: 'CreateOrder', value: 1 },
    { name: 'MarkComplete', value: 2 }
  ];

  getCurrentAuthoritiy(name) {
    return this.checkAuthority(this.authorities.find(f => f.name == name).value)
  }

  ishasImportant: boolean = false;
  sendMessage(): void {
    this.messageService.sendMessage(this.ishasImportant);
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }

  ishasUntreated: boolean = false;
  ishasFinancialRefused: boolean = false;

  ishasSellerRefused: boolean = false;

  hasUntreated(pageNumber: number = 1) {
    this.purchaseSkuOrderService.getPageList(this.selectWareHouse, this.selectPurchaseUserId, 'Untreated',
      this.selectRemark, this.selectPurchaseUrl, this.selectHot, this.searchText,
      this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd,
      pageNumber, this.pageSize).subscribe(data => {
        data.content.items.length > 0 ? this.ishasUntreated = true : this.ishasUntreated = false;
      }, this.handleError);
  }

  hasFinancialRefused(pageNumber: number = 1) {
    this.purchaseSkuOrderService.getPageList(this.selectWareHouse, this.selectPurchaseUserId, 'FinancialRefused',
      this.selectRemark, this.selectPurchaseUrl, this.selectHot, this.searchText,
      this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd,
      pageNumber, this.pageSize).subscribe(data => {
        //console.log(data.content);

        data.content.items.length > 0 ? this.ishasFinancialRefused = true : this.ishasFinancialRefused = false;
      }, this.handleError);
  }

  hasSellerRefused(pageNumber: number = 1) {
    this.purchaseSkuOrderService.getPageList(this.selectWareHouse, this.selectPurchaseUserId, 'SellerRefused',
      this.selectRemark, this.selectPurchaseUrl, this.selectHot, this.searchText,
      this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd,
      pageNumber, this.pageSize).subscribe(data => {
        //console.log(data.content);

        data.content.items.length > 0 ? this.ishasSellerRefused = true : this.ishasSellerRefused = false;
      }, this.handleError);
  }


  ngOnInit() {
    this.selectPurchaseSkuOrderStatus = 'Untreated';
    this.loadStoreQuery();
    this.purchaseOrderService.GetUserListQuery().subscribe(data => {
      let users = [{ id: '0', text: '全部' }];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.id;
        item.text = `${c.userName}-${c.workerNo}`;
        users.push(item);
      }
      this.allUsers = users;
    });
    //this.loadData();
  }

  loadStoreQuery() {
    this.purchaseOrderService.GetStorageData().subscribe(data => {
      // this.allWarehouse = data.content;
      // if(this.allWarehouse.length>0){
      //   this.selectedWarehouse=this.allWarehouse[0].warehouseId;
      //   this.OnQuery();
      // }
      let storages = [];
      for (let c of data.content) {
        //console.log(c);

        const item = <any>{};
        item.value = c.warehouseId;
        item.text = c.name;
        item.ishasImportant = c.ishasImportant;
        if (c.ishasImportant) {
          this.ishasImportant = true;
          this.sendMessage();
        }
        this.sendMessage();
        storages.push(item);
      }
      this.allWarehouse = storages;
      if (this.allWarehouse.length > 0) {
        this.selectWareHouse = this.allWarehouse[0].value;
      }
      this.loadData();
    });
  }

  loadData(pageNumber: number = 1, supplierIdItem = []) {
    this.purchaseSkuOrderService.getPageList(this.selectWareHouse, this.selectPurchaseUserId, this.selectPurchaseSkuOrderStatus,
      this.selectRemark, this.selectPurchaseUrl, this.selectHot, this.searchText,
      this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd,
      pageNumber, this.pageSize).subscribe(data => {
        this.purchaseSkuOrderList = data.content.items;
        console.log(this.purchaseSkuOrderList);
        
        for (let item of this.purchaseSkuOrderList) {
          item.isViewTotal = false;
          for (let i of supplierIdItem) {
            if (item.supplierId === i) {
              item.isViewTotal = true;
            }
          }
        }
        const pageInfo = data.content.pageInfo;
        this.pageSize = pageInfo.pageSize;
        this.pageNumber = pageInfo.pageIndex + 1;
        this.total = pageInfo.totalCount;
      }, this.handleError);


    this.hasUntreated();
    this.hasFinancialRefused();
    this.hasSellerRefused();

  }

  queryViewState() {
    if (this.purchaseSkuOrderList.length > 0) {
      let viewTotalItem = [];
      for (let i = 0; i < this.purchaseSkuOrderList.length; i++) {
        if (this.purchaseSkuOrderList[i].isViewTotal) {
          viewTotalItem.push(this.purchaseSkuOrderList[i].supplierId);
        }
      }
      this.doSearch(viewTotalItem);
    } else {
      this.doSearch();
    }
  }

  onSelectPurchaseSkuOrderStatus(status: string) {
    this.selectPurchaseSkuOrderStatus = status;
    this.queryViewState();
    //this.doSearch();
  }

  onSelectWarehouse(wareId: string) {
    this.selectWareHouse = wareId;
    this.queryViewState();
  }
  onSelectRemark(status: string) {
    this.selectRemark = status;
    //this.doSearch();
    this.queryViewState();

    //console.log(this.selectRemark);
  }

  onSelectPurchaseUrl(status: string) {
    this.selectPurchaseUrl = status;
    //this.doSearch();
    this.queryViewState();

    //console.log(this.selectPurchaseUrl);
  }

  onSelectHot(status: string) {
    this.selectHot = status;
    //this.doSearch();
    this.queryViewState();

    //console.log(this.selectHot);
  }

  doSearch(supplierIdItem = <any>[]) {
    this.loadData(this.pageNumber, supplierIdItem);
    //this.loadData(supplierIdItem);
  }


  editNum(num: any, id: number) {
    if (isNaN(num)) {
      this.error("请输入正确的整数！");
      return;
    }
    if (num.length == 0) {
      this.error("请输入正确的整数！");
      return;
    }

    let viewTotalItem = [];
    for (let i = 0; i < this.purchaseSkuOrderList.length; i++) {
      if (this.purchaseSkuOrderList[i].isViewTotal) {
        viewTotalItem.push(this.purchaseSkuOrderList[i].supplierId);
      }
    }

    this.purchaseSkuOrderService.setActualNumber(id, num).subscribe(data => {
      this.alertMessage("修改数量成功");
      this.loadData(this.pageNumber, viewTotalItem);
    }, e => {
      this.handleError(e);
    });
  }

  overLookOrder(id: number, index) {
    this.confirm("确定忽略该订单？若忽略，则有风险导致平台订单退款或差评！", () => {

      this.purchaseSkuOrderService.overLookOrder(id).subscribe(data => {
        this.alertMessage("忽略订单成功");
        //this.loadData(this.pageNumber, index);
        //this.loadData(this.pageNumber);
        this.loadStoreQuery();
      }, e => {
        this.handleError(e);
      });
    });
  }

  pageChanged(pN: number): void {
    $('html, body').animate({ scrollTop: 0 }, 0);
    this._isViewTotal = false;
    this.loadData(pN);
  }

  reloadData() {
    this.loadData(this.pageNumber);
  }

  onSelect($event, i) {
    //console.log($event.innerText);
  }

  allChecked($event, index) {
    if ($event.checked) {
      this.selectPurchaseSkuOrderIds = [];
      for (let i of this.purchaseSkuOrderList[index].items) {
        i.checked = $event.checked
        this.selectPurchaseSkuOrderIds.push(i.id)
      }
      this.purchaseSkuOrderList[index].isAll = $event.checked;
    }
    else {
      this.selectPurchaseSkuOrderIds = [];
      for (let i of this.purchaseSkuOrderList[index].items) {
        i.checked = $event.checked
      }
      this.purchaseSkuOrderList[index].isAll = $event.checked;

    }

    //console.log(this.selectPurchaseSkuOrderIds);
  }

  Checked($event, i, index) {

    this.purchaseSkuOrderList[i].items[index].checked = $event.checked;
    const id = this.purchaseSkuOrderList[i].items[index].id;

    if ($event.checked) {
      for (let a = 0; a < this.purchaseSkuOrderList[i].items.length; a++) {
        if (!this.purchaseSkuOrderList[i].items[a].checked) {
          this.purchaseSkuOrderList[i].isAll = false;
          break;
        } else {
          this.purchaseSkuOrderList[i].isAll = true;
          const purchaseSkuOrderIndex = this.selectPurchaseSkuOrderIds.indexOf(id);
          if (purchaseSkuOrderIndex >= 0) {
            break;
          }
          this.selectPurchaseSkuOrderIds.push(id)
        }

      }
    } else {
      const purchaseSkuOrderIndex = this.selectPurchaseSkuOrderIds.indexOf(id);
      if (purchaseSkuOrderIndex >= 0) {
        this.selectPurchaseSkuOrderIds.splice(purchaseSkuOrderIndex, 1);
      }
      this.purchaseSkuOrderList[i].isAll = false;
    }

    //console.log(this.selectPurchaseSkuOrderIds);

  }


  openOrderIdModal(purchasePlanId: number, purchaseOrderId: any, skuId: number) {
    const orderIdModal = this.modalService.open(OrderIdDetailModalComponent,
      { size: 'sm', backdrop: 'static' });
    orderIdModal.componentInstance.purchasePlanId = purchasePlanId;
    orderIdModal.componentInstance.purchaseOrderId = purchaseOrderId;
    orderIdModal.componentInstance.skuId = skuId;
  }

  openOnePurchaseOrderModal(supplierId: number, purchaseId: number) {
    const purchaseIds: number[] = [purchaseId];

    this.openSetOrderModal(supplierId, purchaseIds);
  }

  openSupplierPurchaseOrderModal(supplierId: number) {
    const purchaseIds = this.selectPurchaseSkuOrderIds;
    //console.log(this.selectPurchaseSkuOrderIds);
    this.openSetOrderModal(supplierId, purchaseIds);
  }

  openSetOrderModal(supplierId: number, purchaseIds: number[]) {
    const setOrderModal = this.modalService.open(Set1688orderModalComponent,
      { size: 'sm', backdrop: 'static' });
    setOrderModal.componentInstance.supplierId = supplierId;
    setOrderModal.componentInstance.purchaseIds = purchaseIds;

    setOrderModal.result.then(r => {
      //this.reloadData();
      this.loadStoreQuery();
    }, reason => {
    });

  }

  openCompleteOrderModal() {
    const completeOrderModal = this.modalService.open(CompleteOrderModalComponent,
      { size: 'sm', backdrop: 'static' });
  }

  openPurchaseHistoryModal(supplierId: number, skuId: number) {
    //console.log(supplierId, skuId);

    const PurchaseModal = this.modalService.open(PurchaseHistoryModalComponent,
      { size: 'sm', backdrop: 'static' });
    PurchaseModal.componentInstance.supplierId = supplierId;
    PurchaseModal.componentInstance.skuId = skuId;
  }

  openInventoryHistoryModal() {
    const InventoryModal = this.modalService.open(InventoryHistoryModalComponent,
      { size: 'sm', backdrop: 'static' });
  }

  viewTotal(index) {
    //console.log(index);
    this.purchaseSkuOrderList[index].isViewTotal = !this.purchaseSkuOrderList[index].isViewTotal;
    /*     if (this.purchaseSkuOrderList[index].isViewTotal) {
          for (let a = 0; a < this.purchaseSkuOrderList.length; a++) {
            if (!this.purchaseSkuOrderList[a].isViewTotal) {
              this.purchaseSkuOrderList[a].isViewTotal = false;
              break;
            } else {
              this.purchaseSkuOrderList[a].isViewTotal = true;
            }
          }
        } else {
          this._isViewTotal = false;
        } */
  }

  viewTotalStore($event) {
    if (this._isViewTotal) {
      for (let item of this.purchaseSkuOrderList) {
        this._isViewTotal = false;
        item.isViewTotal = this._isViewTotal;
      }
    } else {
      for (let item of this.purchaseSkuOrderList) {
        this._isViewTotal = true;
        item.isViewTotal = this._isViewTotal;
      }
    }

  }

  onChangePurchaseUserChanged(data: any) {

    if (this.isChanged) {
      this.selectPurchaseUserId = data.value;
      if (this.selectPurchaseUserId == '全部') {
        this.selectPurchaseUserId = null;
      }
      this.doSearch(null);
    }
    this.isChanged = true;

  }

  onSelectTimeValueType(timeValue: string) {
    this.selectedTimeValueType = timeValue;
    if (timeValue != 'Custom') {
      this.loadData();
    } if (timeValue === 'Custom') {
      this.dateTransition();
    }
  }

  dateTransition() {
    if (this.ngTimeSearchStart.year && this.ngShortTimeStart) {
      this.timeSearchStart = this.ngTimeSearchStart.year + '-' + this.ngTimeSearchStart.month + '-' + this.ngTimeSearchStart.day + ' ' +
        this.ngShortTimeStart.hour + ':' + this.ngShortTimeStart.minute + ':' + this.ngShortTimeStart.second;

    } else {
      this.timeSearchStart = '';
    }
    if (this.ngTimeSearchEnd.year && this.ngShortTimeEnd) {
      this.timeSearchEnd = this.ngTimeSearchEnd.year + '-' + this.ngTimeSearchEnd.month + '-' + this.ngTimeSearchEnd.day + ' ' +
        this.ngShortTimeEnd.hour + ':' + this.ngShortTimeEnd.minute + ':' + this.ngShortTimeEnd.second;
    } else {
      this.timeSearchEnd = '';
    }
  }
  doTimeSearch() {
    this.dateTransition();

    if (this.timeSearchStart == null || this.timeSearchStart.length < 1) {
      this.error("开始时间不能为空")
      return;
    }
    if (this.timeSearchEnd == null || this.timeSearchEnd.length < 1) {
      this.error("结束时间不能为空")
      return;
    }
    this.loadData();
  }
}
