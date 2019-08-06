import {ShippingMethodListModel} from "../../../../shared/models/warehouses/shipping-method-list-model";
import {LogisticStyleModalComponent} from '../modals/logisticStyleModal/logisticStyleModal.component';
import {WarehouseOptionModel} from "../../../../shared/models/warehouses/warehouse-option-model";
import {ShippingProviderLiteModel} from "../../../../shared/models/sps/shipping-provider-lite";
import {ShippingProviderService} from "../../../../shared/services/shippingprovider.service";
import {ShippingMethodService} from "../../../../shared/services/shipping-method-service";
import {WarehouseService} from "../../../../shared/services/warehouse-service";
import {RootComponent} from "../../../../shared/component/root.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Component, OnInit} from '@angular/core';
import {ShippingServiceSettingComponent} from "../modals/shipping-service-setting/shipping-service-setting.component";
import {ImportTraceNumComponent} from "./import-trace-num/import-trace-num.component";
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
import {InShamTracknumberComponent} from "app/pages/logistics/components/modals/in-sham-tracknumber/in-sham-tracknumber.component";
import {VirtualTracknumberSettingComponent} from "app/pages/logistics/components/modals/virtual-tracknumber-setting/virtual-tracknumber-setting.component";
import {CommonOptionModel} from "app/shared/services/site-const";


@Component({
  selector: 'app-shipping-service-list',
  templateUrl: './shipping-service-list.component.html',
  styleUrls: ['./shipping-service-list.component.scss'],
  providers: [WarehouseService, ShippingProviderService, ShippingMethodService]
})

export class ShippingServiceListComponent extends AuthorityComponent implements OnInit {

  pageSize: number = 20;
  pageNumber: number = 1;
  total: number = 0;

  isShippingMethodsUsing?: boolean = null;

  searchText: string;

  allWarehouses: WarehouseOptionModel[] = [];
  searchTypes: CommonOptionModel[] = [{text: '物流名称', value: 'SsName'}, {text: '渠道代码', value: 'SpMethodCode'}];
  allSps: ShippingProviderLiteModel[] = [];
  pageShippingMethods: ShippingMethodListModel[] = [];

  selectedWarehouseId: number;
  selectedSpId?: number = null;
  selectedSearchType: string = 'SsName';

  constructor(private modalService: NgbModal,
              private shippingProviderService: ShippingProviderService,
              private shippingMethodService: ShippingMethodService,
              private warehouseService: WarehouseService, public activerouter: ActivatedRoute, public router: Router) {
    super(activerouter, router);
  }

  ngOnInit() {
    this.warehouseService.getAllOptions().subscribe(data => {
      this.allWarehouses = data.content;
      this.selectedWarehouseId = this.allWarehouses[0].warehouseId;
      this.loadData();
    });
    this.shippingProviderService.getAllShippingProviders().subscribe(data => {
      this.allSps = data.content;
      let item = new ShippingProviderLiteModel();
      item.spId = null;
      item.spCode = '';
      item.spName = '全部';
      this.allSps.unshift(item);
    });
  }

  loadData(pageNumber: number = 1) {
    if (this.selectedWarehouseId < 1) {
      return;
    }
    this.shippingMethodService.getShippingMethodes(pageNumber,
      this.pageSize,
      this.searchText,
      this.selectedWarehouseId,
      this.selectedSpId,
      this.isShippingMethodsUsing,
      this.selectedSearchType).subscribe(data => {
      this.pageShippingMethods = data.content.items;
      this.pageSize = data.content.pageInfo.pageSize;
      this.pageNumber = data.content.pageInfo.pageIndex + 1;
      this.total = data.content.pageInfo.totalCount;
    }, this.handleError);
  }

  openShippingFeeRuleModal(ssId: number, ssName: string) {
    const searchModal = this.modalService.open(LogisticStyleModalComponent, {size: 'lg', backdrop: 'static'});
    searchModal.componentInstance.ssId = ssId;
    searchModal.componentInstance.ssName = ssName;
  }

  openShippingServiceSettingModal(ssId: number) {
    const modal = this.modalService.open(ShippingServiceSettingComponent, {size: 'sm', backdrop: 'static'});
    modal.componentInstance.modalHeader = '编辑物流方式';
    modal.componentInstance.ssId = ssId;
    modal.componentInstance.warehouseId = this.selectedWarehouseId;
  }

  reloadData() {
    this.loadData(this.pageNumber);
  }

  doSearch() {
    this.loadData();
  }

  pageChanged(pN: number): void {
    $('html, body').animate({scrollTop: 0}, 0);
    this.loadData(pN);
  }

  onWarehouseSelect(warehouseId: number) {
    this.selectedWarehouseId = warehouseId;
    this.loadData();
  }
  onSearchTypeSelect(sTypeValue: string) {
    this.selectedSearchType = sTypeValue;
  }

  onSpSelect(spId: number) {
    this.selectedSpId = spId;
    this.loadData();
  }

  setIsUsingFilterValue(isUsing?: boolean) {
    this.isShippingMethodsUsing = isUsing;
    this.loadData();
  }

  selectShippingService(ssId: number) {
    this.confirm("确定启用该物流方式?", () => {
      this.shippingMethodService.selectShippingService(ssId, this.selectedWarehouseId).subscribe(data => {
        this.reloadData();
      }, this.handleError)
    });
  }

  unSelectShippingService(ssId: number) {
    this.confirm("确定停用该物流方式?", () => {
      this.shippingMethodService.unSelectShippingService(ssId, this.selectedWarehouseId).subscribe(data => {
        this.reloadData();
      }, this.handleError)
    });
  }

  deleteCustomShippingService(ssId: number) {
    this.confirm("确定删除该物流方式?", () => {
      this.shippingMethodService.deleteCustomShippingService(ssId).subscribe(data => {
        this.reloadData();
      }, this.handleError)
    });
  }

  openAddShippingServiceSettingModal() {
    const modal = this.modalService.open(ShippingServiceSettingComponent, {size: 'sm', backdrop: 'static'});
    modal.componentInstance.modalHeader = '添加物流方式';
    modal.componentInstance.warehouseId = this.selectedWarehouseId;
    modal.result.then(result => {
      this.reloadData();
    }, reason => {
    });
  }

  openImportTraceNumModal(ssId: number) {
    const modal = this.modalService.open(ImportTraceNumComponent, {size: 'lg', backdrop: 'static'});
    modal.componentInstance.modalHeader = '导入跟踪号';
    modal.componentInstance.ssId = ssId;
  }

  openInShamTrackNumberModal() {
    const modal = this.modalService.open(InShamTracknumberComponent, {size: 'sm', backdrop: 'static'});
    modal.componentInstance.modalHeader = '导入虚拟跟踪号';
    modal.result.then(result => {
    }, reason => {
    });
  }

  openVirtualTracknumberSettingModal(ssId: number) {
    const modal = this.modalService.open(VirtualTracknumberSettingComponent, {
      size: 'sm', backdrop: 'static'
    });
    modal.componentInstance.ssId = ssId;
  }

}



