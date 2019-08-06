import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GoodsInfoService } from "../../../../shared/services/goodsInfo.service";
import { RootComponent } from "../../../../shared/component/root.component";
import { SkuListModel } from "../../../../shared/models/products/sku-list-model";
import { SkuService } from "../../../../shared/services/sku-service";
import { SkuDetailModalComponent } from "./sku-detail-modal/sku-detail-modal.component";
import { ForbiddenReasonModalComponent } from './forbidden-reason-modal/forbidden-reason-modal.component';
import { InSkuModalComponent } from './in-sku-modal/in-sku-modal.component';
import { environment } from "environments/environment";
import { JwtService } from "../../../../shared/services/jwt.service";
import { AuthorityComponent } from "../../../../shared/component/authority.component";
import { ActivatedRoute, Router } from "@angular/router";
import { PrintNumberModalComponent } from './print-number-modal/print-number-modal.component';

class SelectOptionModel {
  value: string;
  name: string;
}

@Component({
  selector: 'app-sku-list',
  templateUrl: './sku-list.component.html',
  styleUrls: ['./sku-list.component.scss', '../public.scss'],
  providers: [SkuService, GoodsInfoService, JwtService]
})
export class SkuListComponent extends AuthorityComponent implements OnInit {

  pageSize: number = 20;
  pageNumber: number;
  total: number;
  items: SkuListModel[] = [];

  searchText: string = '';
  searchType: string = 'ByCode';
  selectShippingAttribute: string;
  selectSearchUnusualType: string;
  selectSearchIfPurchaseLink: string = null;
  selectSearchIfComponent: string = null;

  selectSkuIds: number[] = [];
  isCheckAllPages: boolean = false;
  exportParams: any;


  constructor(private modalService: NgbModal,
    private goodsInfoService: GoodsInfoService,
    private skuService: SkuService,
    private jwtService: JwtService, public activerouter: ActivatedRoute, public router: Router) {
    super(activerouter, router);
  }

  // attr: SelectOptionModel[] = [{name: '全部', value: ''}
  //   , {name: '普货', value: 'Normal'}
  //   , {name: '纯电池', value: 'Battery'}
  //   , {name: '带内置电池', value: 'InternalBattery'}
  //   , {name: '带外置电池', value: 'ExternalBattery'}];



  attrs: SelectOptionModel[] = [
    { name: '全部', value: null },
    { name: '普货', value: 'NormalGood' },
    { name: '带电', value: 'Eri' },
    { name: '仿品', value: 'Copy' },
    { name: '违禁品', value: 'Peccancy' },
    { name: '液体', value: 'Water' },
    { name: '粉末', value: 'Powder' }
  ];
  types: SelectOptionModel[] = [
    { name: 'SkuCode', value: 'ByCode' },
    { name: '商品名称', value: 'ByName' }
  ];

  unusualTypes: SelectOptionModel[] = [
    { name: '全部', value: null },
    { name: '停售', value: 'Discontinued' },
    { name: '停产', value: 'NoProduction' },
    { name: '侵权', value: 'IsInfringement' },
    { name: '疑似侵权', value: 'IsSuspectedInfringement' },
    { name: '禁用', value: 'Disable' }
  ];

  haspurchaseLink: SelectOptionModel[] = [
    { name: '全部', value: null },
    { name: '有', value: 'yes' },
    { name: '无', value: 'no' },
  ];
  ifComponent: SelectOptionModel[] = [
    { name: '全部', value: null },
    { name: '是', value: 'yes' },
    { name: '否', value: 'no' },
  ];

  authorities: any[] = [
    { name: 'Add', value: 1 },
    { name: 'Import', value: 2 },
    { name: 'Update', value: 3 },
    { name: 'Delete', value: 4 },
    { name: 'Unable', value: 5 },
    { name: 'Export', value: 6 }
  ];

  getCurrentAuthoritiy(name) {
    return this.checkAuthority(this.authorities.find(f => f.name == name).value)
  }

  ngOnInit() {

    this.loadData();
  }

  cleanSearchText() {
    this.searchText = '';
  }

  onShippingAttributeSelect($event, shippingAttribute: string) {
    this.selectShippingAttribute = shippingAttribute;

    this.doSearch()
  }

  onSearchTypeSelect($event, selectSearchType: string) {
    this.searchType = selectSearchType;
  }

  onSearchUnusualTypeSelect($event, selectSearchUnusualType: string) {
    this.selectSearchUnusualType = selectSearchUnusualType;
    this.doSearch()
  }

  onSearchIfPurchaseLink($event, selectSearchIfPurchaseLink: string) {
    this.selectSearchIfPurchaseLink = selectSearchIfPurchaseLink;
    this.doSearch();
  }
  onSearchIsCompoennt($event, selectSearchIfComponent: string) {
    this.selectSearchIfComponent = selectSearchIfComponent;
    this.doSearch();
  }

  loadData(pageNumber: number = 0) {
    this.skuService.getPageList(this.selectShippingAttribute, this.searchText, this.searchType, pageNumber, this.pageSize,
      this.selectSearchUnusualType,this.selectSearchIfComponent, this.selectSearchIfPurchaseLink).subscribe(data => {
        this.items = data.content.items;
        const pageInfo = data.content.pageInfo;
        this.pageSize = pageInfo.pageSize;
        this.pageNumber = pageInfo.pageIndex + 1;
        this.total = pageInfo.totalCount;
        this.onCheckAllOrderChanged(this.isCheckAllPages);
        console.log(this.items);
      }, this.handleError);
  }

  reload() {
    this.loadData(this.pageNumber);
  }

  doSearch() {
    this.loadData();
  }

  pageChanged(pN: number): void {
    $('html, body').animate({ scrollTop: 0 }, 0);
    this.loadData(pN);
  }

  openAddModal() {
    const searchModal = this.modalService.open(SkuDetailModalComponent, { size: 'sm', backdrop: 'static' });
    searchModal.result.then(result => {
      //this.reload();
    }, reason => {
    });
  }

  openInSKUModal() {
    const modal = this.modalService.open(InSkuModalComponent, { size: 'sm', backdrop: 'static' });
    modal.result.then(result => {
      this.reload();
    }, reason => {
    });
  }

  openEditSkuModal(skuId: number) {
    const detailModal = this.modalService.open(SkuDetailModalComponent, { size: 'sm', backdrop: 'static' });
    detailModal.componentInstance.skuId = skuId;

    detailModal.result.then(result => {
      this.loadData();
    }, reason => {
    });
  }

  deleteSku(skuId: number) {
    this.confirm('确定删除该Sku？', () => {
      this.skuService.deleteSku(skuId).subscribe(data => {
        this.alertMessage('删除成功');
        this.reload();

      }, this.handleError);
    });
  }

  openForbiddenModal(skuId: number) {
    const searchModal = this.modalService.open(ForbiddenReasonModalComponent, { size: 'sm', backdrop: 'static' });
    searchModal.componentInstance.skuId = skuId;
    searchModal.componentInstance.modalHeader = "禁用";
    searchModal.result.then(result => {
      this.reload();
    }, reason => {
    });
  }

  activateSku(skuId: number, isDiscontinued: boolean, isNoProduction: boolean, isInfringement: boolean, isSuspectedInfringement: boolean, skuDisableInfo: any) {
    var suspectedInfringementChannels = skuDisableInfo.suspectedInfringementChannels;
    const searchModal = this.modalService.open(ForbiddenReasonModalComponent, { size: 'sm', backdrop: 'static' });
    searchModal.componentInstance.skuId = skuId;
    searchModal.componentInstance.modalHeader = "激活";
    searchModal.componentInstance.halt = isDiscontinued;
    searchModal.componentInstance.stopProduction = isNoProduction;
    searchModal.componentInstance.tort = isInfringement;
    searchModal.componentInstance.meybeTort = isSuspectedInfringement;
    searchModal.componentInstance.value = suspectedInfringementChannels;
    searchModal.result.then(result => {
      this.reload();
    }, reason => {
    });
  }

  onCheclAllPageChange(checked: boolean) {
    if (checked) {
      this.selectSkuIds = [];
      for (let o of this.items) {
        this.selectSkuIds.push(o.id);
      }
      this.isCheckAllPages = true;
    }
    else {
      this.selectSkuIds = [];
      this.isCheckAllPages = false;
    }
  }

  onCheckAllOrderChanged(checked: boolean) {
    if (checked) {
      this.selectSkuIds = [];
      for (let o of this.items) {
        this.selectSkuIds.push(o.id);
      }
    }
    else {
      this.selectSkuIds = [];
      this.isCheckAllPages = false;
    }
  }

  onCheckOrderChanged(isChecked: boolean, orderId: number) {
    if (isChecked) {
      const skuIndex = this.selectSkuIds.indexOf(orderId);
      if (skuIndex >= 0) {
        return;
      }
      else {
        this.selectSkuIds.push(orderId);
      }
    }
    else {
      const skuIndex = this.selectSkuIds.indexOf(orderId);
      if (skuIndex >= 0) {
        this.selectSkuIds.splice(skuIndex, 1);
      }
      this.isCheckAllPages = false;
    }
  }

  openOutputModal() {
    if (this.selectSkuIds.length == 0) {
      this.error("请选择需要导出的SKU");
      return;
    }
    let queryData = {
      'searchUnusualType': this.selectSearchUnusualType,
      'shippingAttribute': this.selectShippingAttribute,
      'skuHasCombineType': this.selectSearchIfComponent,
      'searchType': this.searchType,
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
      params.set('skuIds', this.selectSkuIds.join(','))
    }

    var urlPre = `${environment.api_url}/api/v1/sku/skuExport`;

    let url = [urlPre, params.toString()].join('?');

    let win = window.open(url);
    win.focus();
    win.location.href = url;

  }

  printSkuLabel(skuId: string) {
    const modal = this.modalService.open(PrintNumberModalComponent, { size: 'sm', backdrop: 'static' });
    modal.componentInstance.skuId = skuId;
    modal.result.then(result => { }, reason => { });
  }
}
