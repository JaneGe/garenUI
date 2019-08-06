import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgUploaderOptions } from "ngx-uploader/src/classes/ng-uploader-options.class";
import { environment } from "../../../../../environments/environment";
import { JwtService } from "../../../../shared/services/jwt.service";
import { ChooseSkuModalComponent } from "app/pages/order/components/modals/choose-sku-modal/choose-sku-modal.component";
import { RootComponent } from "../../../../shared/component/root.component";
import { ChannelSkuService } from "app/shared/services/channel-sku-service";
import { AuthorityComponent } from "../../../../shared/component/authority.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Select2OptionData } from "ng2-select2";
import { OptionsService } from "../../../rules/options.Service";
import { PurchaseOrder1688Service } from "../../../purchase/components/purchase-1688/purchase-1688.service";
import { ChannelTypeName, SiteConst } from "../../../../shared/services/site-const";
import { AccountLiteListModel } from "app/shared/models/channels/account-lite-list-model";
import { ShopAccountService } from "../../../../shared/services/shop.account.service";


@Component({
  selector: 'app-logistics-sku',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.scss', '../public.scss'],
  providers: [ChannelSkuService, OptionsService, PurchaseOrder1688Service, ShopAccountService]
})
export class LogisticsSkuComponent extends AuthorityComponent implements OnInit {

  suppprtSearchTypes: CommonOptionModel[] = [{ text: '渠道SKU', value: 'ByChannelSku' },
  { text: '虚拟SKU/库存SKU', value: 'ByVirtualSkuOrSku' }, { text: '商品中文名', value: 'BySkuName' }];

  supportChannelTypes: ChannelTypeName[] = [];

  shopAccouns: AccountLiteListModel[] = [];
  amazonAccounts: AccountLiteListModel[] = [];

  selectTypes: SelectOptionModel[] = [
    { name: 'SkuCode', value: 'ByCode' },
    { name: '商品名称', value: 'ByName' }
  ];

  virtualSkuselectTypes: SelectOptionModel[] = [
    { name: '虚拟SKU', value: 'VirtualCode' }];


  skuTypes: SelectOptionModel[] = [
    { name: '库存Sku', value: 'StockSku' },
    { name: '虚拟Sku', value: 'VirtualSku' }
  ];

  selectedChannelType: string;
  selectedAccountsId: number;

  selectSearchType: string = 'ByChannelSku';
  searchText: string = '';


  pageSize: number = 10;
  pageNumber: number = 1;
  total: number = 1;
  selectLogisticsSkuIds = [];
  isCheckAllPages: boolean = false;
  exportParams: any;

  logisticsSkuModalTitle: string;
  items: any[] = [];

  logisticsSku: string;
  addlogisticsSkus: AddlogisticsSkus[] = [];

  SKUsearchType: string;
  SKUsearchText: string;
  SKUType: string = 'StockSku';
  skuOrVirtualSkuListItems: any[] = [];

  skuPageInfo = { pageSize: 10, pageNumber: 1, total: 1 };
  selectedSku: number;
  selectedSkuCode: string;

  Platforms: Array<any> = ['Amazon', 'Wish', '速卖通'];
  accountList: any[] = [];
  selectedPlatform: string;
  isFristChoose: boolean = false;

  allUsers: any[] = [];
  selectPurchaseUserId: number = 0;
  isChanged: boolean = false;

  selectedSellTypeId: any = 'SelfSell';
  selectedChannelId: number = 0;
  SellTypes: SelectOptionModel[] = [
    { name: '自主上架', value: 'SelfSell' }, { name: '跟卖', value: 'FollowSell' }];
  EAN: string;
  UPC: string;
  ASIN: string;
  ListingUrl: string;

  channelSkuId: number;

  channelInfo: any;

  upfileData: any = { channelId: null, channelType: null };

  cId: number;
  public fileUploaderOptions: NgUploaderOptions = {
    // url: `${environment.api_url}/api/v1/virtualsku/virtualSkuImports`,
    url: ` `,
  };


  constructor(private modalService: NgbModal,
    private jwtService: JwtService,
    private _optionsService: OptionsService,
    private purchaseOrderService: PurchaseOrder1688Service,
    private shopAccountService: ShopAccountService,
    private channelService: ChannelSkuService, public activerouter: ActivatedRoute, public router: Router) {
    super(activerouter, router);

    const types = SiteConst.supportChannelTypeNoManual;

    this.supportChannelTypes = types.map(x => x);
    this.supportChannelTypes.unshift({ displayName: '全部', code: '' });
  }

  authorities: any[] = [
    { name: 'Add', value: 12 },
    { name: 'Import', value: 13 },
    { name: 'Update', value: 14 },
    { name: 'Delete', value: 15 },
    { name: 'Export', value: 16 }
  ];

  getCurrentAuthoritiy(name) {
    return this.checkAuthority(this.authorities.find(f => f.name == name).value);
  }

  ngOnInit() {
    if (this.SKUType == 'StockSku') {
      this.SKUsearchType = 'ByCode';
    }
    else {
      this.SKUsearchType = 'ByVirtualSku';
    }

    this.fileUploaderOptions.authToken = this.jwtService.getToken().toString();
    this.fileUploaderOptions.cors = true;
    // this.fileUploaderOptions.url = `${environment.api_url}/api/v1/channelSku/channelSkuImports?cId=${this.cId}`;
    this.fileUploaderOptions.url = `${environment.api_url}/api/v1/channelSku/channelSkuImports`;

    this.fileUploaderOptions.data = this.upfileData;
    this.selectedPlatform = 'Amazon';

    this.shopAccountService.getAllAccountLiteList().subscribe(data => {
      this.shopAccouns = data.content;
      this.amazonAccounts = this.shopAccouns.filter(m => m.channelType === 'Amazon');

    }, this.handleError);

    this.loadData();

    console.log(this.selectPurchaseUserId);
    console.log(this.selectedChannelId);

  }

  cleanSearchText() {
    this.searchText = '';
  }
  onSelectChannelType(channelType: string) {
    if (channelType != this.selectedChannelType) {
      this.selectedAccountsId = null;
    }
    this.selectedChannelType = channelType;
    this.doSearch();
  }

  onSelectChannelId(channelId: number) {
    this.selectedAccountsId = channelId;
    this.doSearch();
  }

  isShowChannelAccount(channelType: string): boolean {
    return this.selectedChannelType == channelType;
  }

  onSelectSearchType(type: string) {
    this.selectSearchType = type;
  }


  onCheclAllPageChange(checked: boolean) {
    if (checked) {
      this.selectLogisticsSkuIds = [];
      for (let o of this.items) {
        this.selectLogisticsSkuIds.push(o.id);
      }
      this.isCheckAllPages = true;
    }
    else {
      this.selectLogisticsSkuIds = [];
      this.isCheckAllPages = false;
    }
  }

  onCheckOrderChanged(isChecked: boolean, orderId: number) {
    if (isChecked) {
      const logisticsSkuIndex = this.selectLogisticsSkuIds.indexOf(orderId);
      if (logisticsSkuIndex >= 0) {
        return;
      }
      else {
        this.selectLogisticsSkuIds.push(orderId);
      }
    }
    else {
      const logisticsSkuIndex = this.selectLogisticsSkuIds.indexOf(orderId);
      if (logisticsSkuIndex >= 0) {
        this.selectLogisticsSkuIds.splice(logisticsSkuIndex, 1);
      }
      this.isCheckAllPages = false;
    }
  }

  onCheckAllOrderChanged(checked: boolean) {
    if (checked) {
      this.selectLogisticsSkuIds = [];
      for (let o of this.items) {
        this.selectLogisticsSkuIds.push(o.id);
      }
    }
    else {
      this.selectLogisticsSkuIds = [];
      this.isCheckAllPages = false;
    }
    console.log(this.selectLogisticsSkuIds);
  }

  openAddLogisticsSkuModal(content, logiSkuId?: number) {

    console.log('第一次进来编辑用户账号' + this.selectPurchaseUserId);
    console.log('第一次进来编辑平台账号' + this.selectedChannelId);

    const modal = this.modalService.open(content, { backdrop: 'static', size: 'lg' });
    //平台列表
    this.loadAccounts();

    //用户列表
    this.purchaseOrderService.GetUserListQuery().subscribe(data => {
      let users = [{ id: '0', text: '请选择..' }];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.id;
        item.text = `${c.userName}-${c.workerNo}`;
        users.push(item);
      }
      this.allUsers = users;
    });

    this.clearText();

    console.log('第二次进来编辑用户账号' + this.selectPurchaseUserId);
    console.log('第二次进来编辑平台账号' + this.selectedChannelId);

    if (logiSkuId) {

      this.channelService.getChannelSkuDetail(logiSkuId).subscribe(data => {
        this.channelInfo = data.content;
        console.log(this.channelInfo);
        this.selectedPlatform = this.channelInfo.channelType;
        this.selectedChannelId = this.channelInfo.channelId;
        this.selectPurchaseUserId = this.channelInfo.sellerUserId;
        this.selectedSellTypeId = this.channelInfo.sellType;
        this.logisticsSku = this.channelInfo.channelSkuCode;
        this.EAN = this.channelInfo.ean;
        this.UPC = this.channelInfo.upc;
        this.ASIN = this.channelInfo.asin;
        this.ListingUrl = this.channelInfo.listingUrl;

        this.selectedSku = this.channelInfo.theSkuId;
        this.selectedSkuCode = this.channelInfo.skuCode;
        var model = new AddlogisticsSkus();
        model.skuId = this.channelInfo.theSkuId;
        model.skuCode = this.channelInfo.skuCode;
        this.addlogisticsSkus.push(model);

        this.channelSkuId = this.channelInfo.id;
      }, this.handleError);

      this.logisticsSkuModalTitle = '编辑渠道SKU';
    }
    else {
      this.logisticsSkuModalTitle = '添加渠道SKU';
    }
  }

  openSelectModal(content) {
    this.SKUsearchText = '';
    this.SKUType = 'StockSku';
    this.SkuOrVirtualSkuListLoadData();
    const modal = this.modalService.open(content, { backdrop: 'static', size: 'lg' });
  }

  deleteItem(id: number) {
    let deleteSkus = this.addlogisticsSkus.filter(m => m.skuId == id);
    for (let sku of deleteSkus) {
      let index = this.addlogisticsSkus.indexOf(sku);
      this.addlogisticsSkus.splice(index, 1);
    }
    this.selectedSku = null;
    this.selectedSkuCode = null;
    if (this.addlogisticsSkus.length == 0) {
      $('#add').removeAttr('hidden');
    }

  }

  onSkuSelecteSearch($event, selectSearchType: string) {
    this.SKUsearchType = selectSearchType;
  }

  onSkuSelecteType($event, selectSearchType: string) {
    this.SKUType = selectSearchType;
    this.doSkuOrVirtualSkuListLoadDataSearch();
  }

  openImportLogisticsSkuModal(content) {
    const modal = this.modalService.open(content, { backdrop: 'static', size: 'lg' });
    this.cId = 0;
    this.upfileData.channelId = 0;
    this.upfileData.channelType = 'Amazon';
    //平台列表
    this.loadAccounts();
  }

  SkuOrVirtualSkuListLoadData(pageNumber: number = 1) {
    this.channelService.getSkuOrVirtualSkuList(this.SKUType, this.SKUsearchText, this.SKUsearchType, pageNumber, this.skuPageInfo.pageSize).subscribe(data => {
      this.skuOrVirtualSkuListItems = data.content.items;
      const pageInfo = data.content.pageInfo;
      this.skuPageInfo.pageSize = pageInfo.pageSize;
      this.skuPageInfo.pageNumber = pageInfo.pageIndex + 1;
      this.skuPageInfo.total = pageInfo.totalCount;
    }, this.handleError);
  }

  doSkuOrVirtualSkuListLoadDataSearch() {
    this.SkuOrVirtualSkuListLoadData();
  }

  skupageChanged(pN: number): void {
    $('html, body').animate({ scrollTop: 0 }, 0);
    this.SkuOrVirtualSkuListLoadData(pN);
  }

  confirmSku(close: any) {
    console.log(this.SKUType);
    console.log(this.selectedSku);
    console.log(this.selectedSkuCode);

    var model = new AddlogisticsSkus();
    model.skuId = this.selectedSku;
    model.skuCode = this.selectedSkuCode;
    // model.quantity = 1;
    this.addlogisticsSkus.push(model);

    if (this.addlogisticsSkus.length > 0) {
      $('#add').attr('hidden', 'true');
    }
    close();
  }

  isSkuChoose: boolean = false;
  selectSkuOrVirtualSku(id: number, code: string) {
    this.isSkuChoose = true;
    this.selectedSku = id;
    this.selectedSkuCode = code;
  }

  chooseSaleMan(val) {
  }

  doSave(close: any) {
    console.log(this.selectedPlatform);
    console.log(this.selectedChannelId);
    console.log(this.selectPurchaseUserId);
    console.log(this.selectedSellTypeId);
    console.log(this.logisticsSku);
    console.log(this.EAN);
    console.log(this.UPC);
    console.log(this.ASIN);
    console.log(this.ListingUrl);

    console.log(this.SKUType);
    console.log(this.selectedSku);
    console.log(this.selectedSkuCode);
    if (this.selectedChannelId == null || this.selectedChannelId == 0) {
      this.error('请选择账号');
      return;
    }
    // if (this.selectPurchaseUserId == null || this.selectPurchaseUserId == 0) {
    //   this.error('请选择销售人员');
    //   return;
    // }
    if (this.selectedSellTypeId == null) {
      this.error('请选择销售类型');
      return;
    }
    if (this.logisticsSku == null || this.logisticsSku.trim().length == 0) {
      this.error('渠道Sku必填');
      return;
    }
    if (this.selectedSku == null || this.selectedSkuCode == null) {
      this.error('对应的Sku或虚拟Sku必选');
      return;
    }

    let channelSkuData = {
      id: this.channelSkuId,
      channelType: this.selectedPlatform,
      channelId: this.selectedChannelId,
      channelSkuCode: this.logisticsSku,

      skuType: this.SKUType,
      theSkuId: this.selectedSku,
      skuCode: this.selectedSkuCode,

      eAN: this.EAN,
      uPC: this.UPC,
      aSIN: this.ASIN,
      listingUrl: this.ListingUrl,

      sellerUserId: this.selectPurchaseUserId,
      sellType: this.selectedSellTypeId,
    };

    if (this.channelSkuId == 0) {
      this.channelService.saveChannelSku(channelSkuData).subscribe(data => {
        this.alertMessage("添加成功");
        close();
        this.loadData();
      }, this.handleError);
    }
    else {
      this.channelService.saveChannelSku(channelSkuData).subscribe(data => {
        this.alertMessage("修改成功");
        close();
        this.loadData();
      }, this.handleError);
    }

  }

  choose(selaccount: any) {
    if (this.isFristChoose) {
      this.selectedChannelId = selaccount.value;
    }
    this.isFristChoose = true;
  }

  fileUpChoose(selaccount: any) {
    // if (this.isFristChoose) {
    this.cId = selaccount.value;
    this.upfileData.channelId = this.cId;
    this.upfileData.channelType = this.selectedPlatform;
    // }
    // this.isFristChoose = true;
  }

  onChangePurchaseUserChanged(data: any) {
    if (this.isChanged) {
      this.selectPurchaseUserId = data.value;
    }
    this.isChanged = true;
  }

  addClass(target: any) {
    var selectedaccount = target.innerText;
    this.toggleSingleClass(target);
    if (selectedaccount == 'ebay') { this.selectedPlatform = 'ebay'; }
    if (selectedaccount == 'Amazon') { this.selectedPlatform = 'Amazon'; }
    if (selectedaccount == '速卖通') { this.selectedPlatform = '速卖通'; }
    if (selectedaccount == 'Wish') { this.selectedPlatform = 'Wish'; }
    if (selectedaccount == 'Lazada') { this.selectedPlatform = 'Lazada'; }
    if (selectedaccount == 'Cdiscount') { this.selectedPlatform = 'Cdiscount'; }
    if (selectedaccount == 'PrinceMinister') { this.selectedPlatform = 'PrinceMinister'; }
    if (selectedaccount == '手工订单') { this.selectedPlatform = 'manual'; }
    if (selectedaccount == 'Shopee') { this.selectedPlatform = 'Shopee'; }
    this.loadAccounts();
  }
  toggleSingleClass(target: any) {
    var a = this.siblings(target);
    for (var i = 0; i < a.length; i++) {
      a[i].style.cssText = "background:none;color:white";
    }
    target.style.cssText = " background:#fff;color:#061f1c;";
  }

  siblings(el: any) {
    var a = [];
    var b = el.parentNode.children;
    for (var i = 0; i < b.length; i++) {
      if (b[i] !== el) a.push(b[i]);
    }
    return a;
  }

  loadAccounts() {
    //平台列表
    this._optionsService.GetChannelAccounts(this.selectedPlatform).subscribe(data => {
      let accountSource = [{ id: '0', text: '请选择..' }];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.channelId;
        item.text = `${c.displayName}`;
        accountSource.push(item);
        this.accountList = accountSource;
      }
    }, this.handleError);
  }

  loadData(pageNumber: number = 1) {
    this.channelService.getPageList(this.selectedChannelType, this.selectedAccountsId, this.selectSearchType, this.searchText, pageNumber, this.pageSize).subscribe(data => {
      this.items = data.content.items;
      console.log(this.items);
      const pageInfo = data.content.pageInfo;
      this.pageSize = pageInfo.pageSize;
      this.pageNumber = pageInfo.pageIndex + 1;
      this.total = pageInfo.totalCount;
    }, this.handleError);
  }

  doSearch() {
    this.loadData();
  }

  deleteChannelSku(skuId: number) {
    this.confirm('确定删除该渠道Sku？', () => {
      this.channelService.deleteChannelSku(skuId).subscribe(data => {
        this.alertMessage('删除成功');
        this.loadData();
      }, this.handleError);
    });
  }

  clearText() {
    //this.accountList = [{id: '0', text: '请选择..'}];
    // this.allUsers = [{id: '0', text: '请选择..'}];
    // this.allUsers=[];
    //this.accountList=[];

    this.selectedPlatform = 'Amazon';
    this.channelSkuId = 0;
    this.selectedChannelId = 0;
    this.selectPurchaseUserId = 0;
    this.selectedSellTypeId = 'SelfSell';
    this.logisticsSku = null;
    this.EAN = null;
    this.UPC = null;
    this.ASIN = null;
    this.ListingUrl = null;

    this.selectedSku = null;
    this.selectedSkuCode = null;
    this.addlogisticsSkus = [];
  }

  pageChanged(pN: number): void {
    $('html, body').animate({ scrollTop: 0 }, 0);
    this.loadData(pN);
  }

  uploadCompleted(res: any, close: any) {
    let response = JSON.parse(res.response);

    if (response.content == null && !response.success) {
      this.error(response.error.message);
      return;
    }
    let data = response.content;
    let message = "";
    if (data.totalCount > 0 && data.errorMessages.length < 0) {
      message += `总数:${data.totalCount},成功:${data.succeedCount},失败:${data.failedCount}.`;
      this.error(message);
      close();
      this.loadData();
    }
    if (data.failedCount > 0 || data.errorMessages.length > 0) {
      message += `错误信息如下:\r\n ${data.errorMessages.join(";\r\n")}`;
      this.error(message);
      this.loadData();
    }
    else {
      this.alertMessage(message);
      close();
      this.loadData();
    }
  }

  openOutputLogisticsSkuModal() {
    if (this.selectLogisticsSkuIds.length == 0) {
      this.error("请选择需要导出的SKU");
      return;
    }
    let queryData = {
      'channelType': this.selectedChannelType,
      'channelId': this.selectedAccountsId,
      'searchType': this.selectSearchType,
      'searchText': this.searchText,
    };
    this.exportParams = queryData;

    let params = new URLSearchParams();
    const token = this.jwtService.getToken();
    params.set('token', token.toString());

    if (this.isCheckAllPages) {
      for (let key in this.exportParams) {
        if (this.exportParams[key] == null) {
          params.set(key, '')
        }
        else {
          params.set(key, this.exportParams[key])
        }
      }
    }
    else {
      params.set('channelSkuIds', this.selectLogisticsSkuIds.join(','))
    }

    var urlPre = `${environment.api_url}/api/v1/channelSku/channelSkuExport`;

    let url = [urlPre, params.toString()].join('?');

    let win = window.open(url);
    win.focus();
    win.location.href = url;
  }


}

class SelectOptionModel {
  value: string;
  name: string;
}

export class LogisticsSkuModel {
  id: string;
  from: string;
  logisticsSku: string;
  skukind: string;
  skuCode: string;
  UPC: string;
  ASIN: string;
  salemen: string;
  createdUserName: string;
  time: TimeModel;
  salekind: string;
}

export class TimeModel {
  updateTime: string;
  createdTime: string;
}

export class AddlogisticsSkus {
  skuCode: string;
  // quantity: number;
  skuId: number;
}

export class ChannelSkuInfoModel {
  id: number;
  channelId: number;
  channelSkuCode: string;
  skuType: string;
  name: string;
  length: number;
  width: number;
  height: number;
  weight: number;

}
export class CommonOptionModel {
  text: string;
  value: any;
}
