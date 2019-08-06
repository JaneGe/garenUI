import { Component, OnChanges, OnInit } from '@angular/core';
import { NgbModal, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { AddRemarksComponent } from "../../modals/add-remarks/add-remarks.component";
import { DetailsComponent } from "../../modals/details/details.component";
import { RootComponent } from "../../../../../shared/component/root.component";
import { MoreSkuComponent } from "../../modals/more-sku/more-sku.component";
import { SkupurchaseHistoryComponent } from "../../modals/skupurchase-history/skupurchase-history.component";
import { PurchaseOrder1688Service } from "../purchase-1688.service";
import {
  OtherPlatformOrderModel,
  PlatformOrderModel,
  PlatformSearchOrderModel, PlatformSearchOtherOrderModel
} from "../../../../../shared/models/purchases/purchase-order1688-model";
import { isInteger } from "@ng-bootstrap/ng-bootstrap/util/util";
import { PurchaseHistoryModalComponent } from 'app/pages/purchase/components/modals/purchase-history-modal/purchase-history-modal.component';
import { AuthorityComponent } from "../../../../../shared/component/authority.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'other-purchase',
  templateUrl: './other-purchase.component.html',
  styleUrls: ['../../public.scss', './other-purchase.component.scss'],
  providers: [PurchaseOrder1688Service]
})
export class OtherPurchaseComponent extends AuthorityComponent implements OnInit {

  ngTimeSearchStart: any = {};
  ngTimeSearchEnd: any = {};
  ngShortTimeStart: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  ngShortTimeEnd: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  timeSearchStart: string = '';

  timeSearchEnd: string = '';
  ifnagotiate: boolean = true;
  selectPackageIds: number[] = [];
  isCheckAllPages: boolean = false;
  checkedAll: boolean = false;
  isopen: boolean = false;
  selectedstorageStu: number;
  selectAccountId: any=-1;
  selectSupplierIds: Array<any> = [];
  selectValues: Array<any> = [];
  man: Array<any> = [];
  selectValue: string = '';
  clicktop: number = 0;
  clickbottom: number = 0;
  pageSize: number = 20;
  Topage: string;
  totalCount: number = 3;
  pageIndex: number = 1;
  selectedAll: boolean = false;
  selectedThisPage: boolean = false;
  selectedSigleid: Array<any> = [];
  noPayMoney: any;
  payMoney: any;
  totalMoney: any;
  platForms: Array<any> = [{ id: -1, text: '全部' }, { id: 1, text: '1688订单' }, { id: 2, text: '手工订单' }, { id: 3, text: '淘宝订单' }];
  selected1688: number = -1;
  selectedplf: number = -1;
  waitSendDay: string = '';
  searchText: string = '';
  status: Array<any> = [{ id: -1, text: '全部' }, { id: 1, text: '等待买家付款' }, { id: 2, text: '等待卖家发货' }, { id: 3, text: '等待买家收货' }
    , { id: 4, text: '交易成功' }, { id: 5, text: '交易关闭' }];
  selectedstatu: number = -1;
  specialSearch: Array<any> = [{ id: -1, text: '全部' }, { id: 1, text: '1天内' }, { id: 2, text: '2天内' },
  { id: 3, text: '3天内' }, { id: 4, text: '3天以上' }, { id: 5, text: '自定义天数' }];

  paySearch: Array<any> = [{ id: -1, text: '全部' }, { id: 1, text: '未议价' }, { id: 2, text: '议价完成' }, { id: 4, text: '已付款' }, { id: 5, text: '已拒绝' }];
  isRemark: Array<any> = [{ id: -1, text: '全部' }, { id: 1, text: '有备注' }, { id: 2, text: '无备注' }];
  unpackStatus: Array<any> = [{ id: -1, text: '全部' }, { id: 1, text: '未拆包' }, { id: 2, text: '部分拆包' },
  { id: 3, text: '手工完结' }, { id: 4, text: '已销单' }];
  receiveStatus: Array<any> = [{ id: -1, text: '全部' }, { id: 0, text: '未到货' }, { id: 1, text: '部分到货' }, { id: 2, text: '已到货' }];
  storageStatus: Array<any> = [{ id: -1, text: '全部' }, { id: 0, text: '已创建' }, { id: 2, text: '已收货' }, {
    id: 4,
    text: '部分拆包'
  }, { id: 3, text: '已拆包' }, { id: 6, text: '手工完结' }];
  unpackError: Array<any> = [{ id: -1, text: '全部' }, { id: 1, text: '是' }, { id: 2, text: '否' }];
  isunpackError: Array<any> = [{ id: 1, text: '数量不准确' }, { id: 2, text: '质量有问题' }, { id: 3, text: '货品不对版' }];
  ishandledone: Array<any> = [{ id: -1, text: '全部' }, { id: 1, text: '是' }, { id: 2, text: '否' }];
  nothandleday: Array<any> = [{ id: -1, text: '全部' }, { id: 1, text: '1天未处理' }, { id: 2, text: '2天未处理' }, {
    id: 3,
    text: '3天未处理'
  }, { id: 4, text: '3天以上' }];
  warehouse: Array<any> = [];

  selectedSpecial: number = -1;
  auditId: number = -1;
  unSendGoodDayUseSet: string;
  selectedPay: number = -1;
  selectedWarehouse: number = -1;
  selectedIsRemark: number = -1;
  selectedunpackStatus: number = -1;
  selectedreceiveStatus: number = -1;
  selectedunpackError: number = -1;
  selectednothandleday: number = -1;
  selectedishandledone: number = -1;
  selectedisunpackError: Array<any> = [];
  searchKind: Array<any> = [{ id: 1, text: '订单号' }, { id: 2, text: '卖家' }, { id: 3, text: '卖家公司名' }, {
    id: 4,
    text: '下单号'
  }, { id: 5, text: '跟踪号' }, { id: 6, text: 'SKUCode' }];
  selectedConfirm: Array<any> = [{ id: -1, text: '全部' }, { id: 1, text: '是' }, { id: 2, text: '否' }];
  selectedTime: Array<any> = [{ id: 0, text: '全部' }, { id: 1, text: '今天' }, { id: 2, text: '昨天' }, {
    id: 3,
    text: '7天以内'
  }, { id: 4, text: '30天以内' }, { id: 5, text: '自定义' }];
  selectTime: number = 0;

  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };
  selectedsearchKind: number = 1;
  selectConfirm: number = -1;
  waittoPay = 10000;
  alreadyPay = 5000;
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };
  searchParam: OtherPlatformOrderModel;
  searchOrderParam: PlatformSearchOtherOrderModel;
  info: Array<any> = [];

  sync1688OrderIds: number[] = [];

  allAudit: any[];
  constructor(private ModalService: NgbModal, private purchaseOrderService: PurchaseOrder1688Service, public activerouter: ActivatedRoute, public router: Router) {
    super(activerouter, router);
  }

  authorities: any[] = [
    { name: 'Price', value: 1 },
    { name: 'Refused', value: 2 },
    { name: 'Pay', value: 3 },
    { name: 'Snyc', value: 4 },
    { name: 'TrackNumber', value: 5 }
  ];
  allOtherAccounts= [{ text: '全部', value: -1 },
    { text: '账号1', value: 0 }, { text: '账号2', value: 1}];
  getCurrentAuthoritiy(name) {
    return this.checkAuthority(this.authorities.find(f => f.name == name).value)
  }

  ngOnInit() {
    this.loadUserQuery();
    this.loadStoreQuery();
    this.loadPurchaseAccountQuery();
  }

  loadStoreQuery() {
    this.purchaseOrderService.GetStorageData().subscribe(data => {
      this.warehouse = data.content;
      if (this.warehouse.length > 0) {
        this.selectedWarehouse = this.warehouse[0].warehouseId;
        this.OnQuery();
      }
    });
  }

  loadPurchaseAccountQuery(){
    this.purchaseOrderService.GetPurchaseAccountsQuery().subscribe(data => {
      let accounts = [{ value: -1, text: '全部' }];
      for (let c of data.content) {
        const item = <any>{};
        item.value = c.id;
        item.text = c.showName;
        accounts.push(item);
      }
      this.allOtherAccounts = accounts;
    });
  }

  OnSelectAccounts(item:any){
    this.selectAccountId=item.value;
    this.OnQuery();
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
    this.OnQuery();
  }

  mergeSameOrderNumber(){
    this.purchaseOrderService.MergePurchaseForSameOtherNumber().subscribe(data => {
      this.alertMessage(data.content);
      this.reload();
    }, this.handleError);
  }

  changeDisCountPrice(price: any, itemId: any) {
    this.purchaseOrderService.ChangeDisCountPrice(price, itemId).subscribe(data => {

    }, this.handleError);
  }

  selectplf(val: any) {
    this.selectedplf = val;
    this.OnQuery();
  }

  select1688(val: any) {
    this.selected1688 = val;
    this.OnQuery();
  }

  selectStatu(val: any) {
    this.selectedstatu = val;
    this.OnQuery();
  }

  Specialchoose(val: boolean) {
    this.isopen = val;

    this.selectedSpecial = -1;
    this.selectedunpackError = -1;
    this.selectedishandledone = -1;
    this.selectednothandleday = -1;
  }

  selectSpecial(val: any) {
    this.selectedSpecial = val;
    this.OnQuery();
  }

  selectWarehouse(val: any) {
    this.selectedWarehouse = val;
    this.OnQuery();
  }

  selectPay(val: any) {
    this.selectedPay = val;
    this.OnQuery();
  }

  selectunpackStatus(val: any) {
    this.selectedunpackStatus = val;
    this.OnQuery();
  }

  selectreceiveStatus(val: any) {
    this.selectedreceiveStatus = val;
    this.OnQuery();
  }

  selectIsRemark(val: any) {
    this.selectedIsRemark = val;
    this.OnQuery();
  }

  selectunpackError(val: any) {
    this.selectedunpackError = val;
    if (this.selectedunpackError == 1) {
      this.selectedishandledone = -1;
      this.selectednothandleday = -1;
      this.selectedisunpackError = [];
    }
    this.OnQuery();
  }

  selectishandledone(val: any) {
    this.selectedishandledone = val;
    this.OnQuery();
  }

  selectnothandleday(val: any) {
    this.selectednothandleday = val;
    this.OnQuery();
  }

  selectIsunpackError(val: any) {
    let exsit = this.selectedisunpackError.indexOf(val);
    if (exsit == -1) {
      this.selectedisunpackError.push(val);
    }
    else {
      this.selectedisunpackError.splice(exsit, 1);
    }
    this.OnQuery();
  }


  selectConfirmFun(val: any) {
    this.selectConfirm = val;
    this.OnQuery();
  }

  selectTimeConfirm(val: any) {
    this.selectTime = val;
    if (val != 5) {
      this.OnQuery();
    }
  }

  OnUserSetTimeQuery() {
    this.OnQuery();
  }

  SelectedAll() {   //选择所有页checkbox
    this.selectedAll = this.selected(this.selectedAll);
  }

  selectsearchKind(val: any) {
    this.selectedsearchKind = val;
  }

  SelectedThisPage() {     //选择本页checkbox
    this.selectedThisPage = this.selected(this.selectedThisPage);
  }

  selectSigle(id: any) {    //选择单个checkbox
    let index = this.selectedSigleid.indexOf(id);
    if (index != -1) {
      this.selectedSigleid.splice(index, 1)
    }
    else {
      this.selectedSigleid.push(id)
    }
  }

  confirmPrice(id: any, currentPage) {
    this.purchaseOrderService.ConfirmPriceForOrder(id).subscribe(data => {
      this.reload(currentPage);
    });
  }


  loadUserQuery() {
    this.purchaseOrderService.GetUserListQuery().subscribe(data => {
      let users = [];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.id;
        item.text = c.userName;
        users.push(item);
      }
      let auser = [{ id: -1, text: '全部' }];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.id;
        item.text = c.userName;
        auser.push(item);
      }
      this.man = users;
      this.allAudit = auser;
    });
  }


  OnQuery(pageNumber: number = 1) {
    if (this.clicktop == 0) {
      this.searchParam = new OtherPlatformOrderModel();
      this.searchParam.AccountId = this.selectAccountId;
      this.searchParam.WarehouseId = this.selectedWarehouse;
      this.searchParam.IsHighSearch = (this.clickbottom == 1);
      this.searchParam.OrderStatus = this.selectedstatu;
      this.searchParam.AuditId = this.auditId;
      this.searchParam.SpecialType = this.selectedSpecial;
      this.searchParam.SendGoodDay = this.waitSendDay;
      this.searchParam.IsSpecialSearch = this.isopen;
      this.searchParam.PayChoose = this.selectedPay;
      this.searchParam.TimeChoose = this.selectTime;
      this.searchParam.NoteChoose = this.selectedIsRemark;
      this.searchParam.BeginTime = this.timeSearchStart;
      this.searchParam.EndTime = this.timeSearchEnd;
      this.searchParam.IsBargaining = this.selectConfirm;
      this.searchParam.UnSendGoodsDay = this.selectedSpecial;
      this.searchParam.UnSendGoodDayUseSet = this.unSendGoodDayUseSet;
      this.searchParam.SkuStatus = this.selectedstorageStu;
      this.searchParam.Unpack = this.selectedunpackError;
      this.searchParam.IsDeal = this.selectedishandledone;
      this.searchParam.UnpackNoDealDay = this.selectednothandleday;
      this.searchParam.UnPackageExceptionType = this.selectedisunpackError;
      this.searchParam.UnpackStatus = this.selectedunpackStatus;
      this.searchParam.ReceivepackageStatus = this.selectedreceiveStatus;
      this.searchParam.PageIndex = pageNumber - 1;
      this.searchParam.PageSize = this.PageInfo.pageSize;

      this.purchaseOrderService.PlatformOtherOrderQuery(this.searchParam).subscribe(data => {
        this.noPayMoney = data.content.noPayMoney;
        this.payMoney = data.content.payMoney;
        this.totalMoney = data.content.totalMoney;
        this.info = data.content.pageLists.items;
        this.PageInfo = data.content.pageLists.pageInfo;
        this.PageInfo.pageIndex++;
      }, this.handleError);
    } else {
      this.searchOrderParam = new PlatformSearchOtherOrderModel();
      this.searchOrderParam.OrderType = this.selectedsearchKind;
      this.searchOrderParam.AuditId = this.auditId;
      this.searchOrderParam.WarehouseId = this.selectedWarehouse;
      this.searchOrderParam.AccountId = this.selectAccountId;
      this.searchOrderParam.SearchText = this.searchText;
      this.searchOrderParam.SubmitUserIds = this.selectValues.map(m => m.id);
      this.searchOrderParam.PageIndex = pageNumber - 1;
      this.searchOrderParam.PageSize = this.PageInfo.pageSize;
      this.purchaseOrderService.PlatformOtherOrderSearchQuery(this.searchOrderParam).subscribe(data => {
        this.noPayMoney = data.content.noPayMoney;
        this.payMoney = data.content.payMoney;
        this.totalMoney = data.content.totalMoney;
        this.info = data.content.pageLists.items;
        this.PageInfo = data.content.pageLists.pageInfo;
        this.PageInfo.pageIndex++;
      }, this.handleError);
    }
  }

  reload(pn: number = 1) {
    this.OnQuery(pn);
  }

  Enter(e: any) {
    var char_code = e.charCode ? e.charCode : e.keyCode;
    if ((char_code != 46 && char_code < 48) || char_code > 57) {
      return false;
    }
    else {
      return true;
    }
  }

  selected(select: boolean) {
    if (select == false) {
      select = true;
    }
    else {
      select = false
    }
    return select;
  }

  getDate() {
    var date = new Date();
    return date.toLocaleString();
  }

  isNumber(e: any) {
    var char_code = e.charCode ? e.charCode : e.keyCode;
    if (char_code < 48 || char_code > 57) {
      return false;
    }
    else {
      return true;
    }
  }

  setUnSendGoodDayUseSet(target: any) {
    this.unSendGoodDayUseSet = target.value;
  }

  pageChanged(pn: any) {
    $('html, body').animate({ scrollTop: 0 }, 0);
    this.OnQuery(pn);
  }

  toggle(val: any) {
    if (val == 0) {
      this.clicktop = 1;
    }
    else {
      this.clicktop = 0;
    }
    console.log(this.clicktop);
  }

  toggle1(val: any) {
    if (val == 0) {
      this.clickbottom = 1;
    }
    else {
      this.clickbottom = 0;
    }
  }

  onChangeCountryChanged(data: any) {

    let item = this.man.find(m => m.id == data.value);

    let text = item.text;

    this.selectValue = text;

    let existItems = this.selectValues.filter(f => f.id == item.id);
    if (existItems.length == 0) {
      this.selectValues.push(item);
      this.OnQuery();
    }


  }

  del(item: any) {
    for (var i = 0; i < this.selectValues.length; i++) {
      let obj = this.selectValues[i];
      if (obj == item) {
        this.selectValues.splice(i, 1);
      }
    }
    this.OnQuery();
  }

  openAddRemarksModal(id: any, target: any) {
    const activeModal = this.ModalService.open(AddRemarksComponent, { size: 'sm', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = "添加拒绝原因";
    activeModal.componentInstance.platOrderId = id;
    activeModal.result.then(result => {
      if (result != undefined) {
        this.purchaseOrderService.CancelOtherOrder(id, result).subscribe(data => {
          this.alertMessage("拒绝成功!");
          this.reload();
        }, this.handleError);
      }
    }, () => null)
  }

  openDetailsModal(id: any, purchaseNumber: any) {
    console.log(id);

    var Index = 0;
    this.info.forEach((value, index) => {
      if (value.id == id) {
        Index = index;
      }
    });
    const activeModal = this.ModalService.open(DetailsComponent, { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = "1688订单详情";
    //activeModal.componentInstance.info=this.info[Index];
    activeModal.componentInstance.platOrderId = id;
    activeModal.componentInstance.purchaseNumber = purchaseNumber;
    activeModal.componentInstance.isOther = false;
    activeModal.componentInstance.isNotShowAnyc = true;
  }

  testDetailsModal() {
    const activeModal = this.ModalService.open(DetailsComponent, { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = "1688订单详情";
  }

  openMoreSkuModal(id: any) {
    var Index = 0;
    this.info.forEach((value, index) => {
      if (value.id == id) {
        Index = index;
      }
    });
    const activeModal = this.ModalService.open(MoreSkuComponent, { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = "SKU详情";
    activeModal.componentInstance.platOrderId = id;
    activeModal.result.then(result => {
      if (result != undefined) {
        console.log(result);
      }
    })
  }

  /*   openPurchaseModal(id: any) {
      var Index = 0;
      this.info.forEach((value, index) => {
        if (value.id == id) {
          Index = index;
        }
      });
      const activeModal = this.ModalService.open(SkupurchaseHistoryComponent, { size: 'lg', backdrop: 'static' });
      activeModal.componentInstance.modalHeader = "SKU采购历史";
      activeModal.componentInstance.detail = this.info[Index].detail;
      activeModal.result.then(result => {
        if (result != undefined) {
          console.log(result);
        }
      })
    } */

  openPurchaseHistoryModal(supplierId: number, skuId: number, platformOrderItems) {
    console.log(supplierId, skuId);

    const PurchaseModal = this.ModalService.open(PurchaseHistoryModalComponent,
      { size: 'sm', backdrop: 'static' });
    PurchaseModal.componentInstance.supplierId = supplierId;
    PurchaseModal.componentInstance.skuId = skuId;
    PurchaseModal.componentInstance.platformOrderItems = platformOrderItems;
    PurchaseModal.componentInstance.is1688Order = true;
  }

  ConfirmPayForOtherOrder(id: any, currentPage) {
    this.confirm("是否确定付款?", () => {
      this.purchaseOrderService.ConfirmPayForOtherOrder(id).subscribe(data => {
        this.reload(currentPage);
      }, this.handleError);
    });
  }

  onCheckPackageChanged(isChecked: boolean, orderId: number) {

    if (isChecked) {
      const orderIndex = this.selectPackageIds.indexOf(orderId);
      if (orderIndex >= 0) {
        return;
      }
      else {
        this.selectPackageIds.push(orderId);
      }
    }
    else {
      const orderIndex = this.selectPackageIds.indexOf(orderId);
      if (orderIndex >= 0) {
        this.selectPackageIds.splice(orderIndex, 1);
      }
      this.isCheckAllPages = false;
    }
  }

  onCheckAllPackageChanged(checked: boolean) {
    if (checked) {
      this.selectPackageIds = [];
      for (let o of this.info) {
        this.selectPackageIds.push(o.orderNumber);
      }
    }
    else {
      this.selectPackageIds = [];
      this.isCheckAllPages = false;
    }
    console.info(this.selectPackageIds);
  }

  onCheclAllPageChange(checked: boolean) {

    if (checked) {
      this.selectPackageIds = [];
      for (let o of this.info) {
        this.selectPackageIds.push(o.orderNumber);
      }
      this.isCheckAllPages = true;
    }
    else {
      this.selectPackageIds = [];
      this.isCheckAllPages = false;
    }
  }

  sync1688Order(id: any, currentPage) {
    this.sync1688OrderIds.push(id);
    this.purchaseOrderService.sync1688Order(id).subscribe(data => {

      const i = this.sync1688OrderIds.indexOf(id);
      if (i >= 0) {
        this.sync1688OrderIds.splice(i, 1);
      }

      this.alertMessage('同步成功');
      this.reload(currentPage);
      console.log(currentPage);
    }, e => {
      const i = this.sync1688OrderIds.indexOf(id);
      if (i >= 0) {
        this.sync1688OrderIds.splice(i, 1);
      }

      this.handleError(e);
    });

  }

  checkModal(i, isOver) {
    isOver ? $('.detail-modal-body').eq(i).fadeIn(0) : $('.detail-modal-body').eq(i).fadeOut(0);
  }


  onChangePurchaseAuditChanged(data: any) {

    this.auditId = data.value;
    this.OnQuery();

  }

  batchSyncOrders(currentPage) {

    this.confirm("确定批量同步订单?", () => {
      if (this.selectPackageIds == null || this.selectPackageIds.length == 0) {
        this.error("请选择操作订单!");
        return;
      }
      this.purchaseOrderService.batchSync1688Order(this.selectPackageIds).subscribe(data => {
        // this.alertMessage('批量同步订单成功');
        this.alertMessage(data.content);
        this.reload(currentPage);
      }, e => {
        this.handleError(e);
      });
    })


  }
}
