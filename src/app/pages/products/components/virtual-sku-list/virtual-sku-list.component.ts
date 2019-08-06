import {animate, Component, OnInit, state, style, transition, trigger} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GoodsInfoService} from "../../../../shared/services/goodsInfo.service";
import {RootComponent} from "../../../../shared/component/root.component";
import {VirtualSkuListModel} from "../../../../shared/models/products/virtual-sku-list-model";
import {VirtualSkuService} from "../../../../shared/services/virtual-sku-service";
import {VirtualSkuDetailComponent} from "./virtual-sku-detail/virtual-sku-detail.component";
import {InSkuModalComponent} from 'app/pages/products/components/sku-list/in-sku-modal/in-sku-modal.component';
import {InVirtualSkuModalComponent} from "./in-virtualsku-modal/in-virtualsku-modal.component";
import {environment} from "../../../../../environments/environment";
import {JwtService} from "../../../../shared/services/jwt.service";
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";

class SelectOptionModel {
  value: string;
  name: string;
}

@Component({
  selector: 'app-virtual-sku-list',
  templateUrl: './virtual-sku-list.component.html',
  styleUrls: ['./virtual-sku-list.component.scss', '../public.scss'],
  providers: [VirtualSkuService, GoodsInfoService, JwtService],
  animations: [
    trigger('imgMove', [
      /** 不显示 */
      state('off', style({'display': 'none', 'z-index': '0', 'transform': 'translateX(0)'})),
      /** 上一张图片 */
      state('prev', style({
        'z-index': '1',
        'transform': 'translateX(-100%)'
      })),
      /** 下一张图片 */
      state('next', style({'z-index': '2', 'transform': 'translateX(100%)'})),
      /** 当前图片 */
      state('on', style({'z-index': '3', 'transform': 'translateX(0)'})),
      transition('prev=>on', [
        animate('0.3s ease-in')
      ]),
      transition('next=>on', [
        animate('0.3s ease-in')
      ]),
      transition('on=>prev', [
        animate('0.3s ease-in')
      ]),
      transition('on=>next', [
        animate('0.3s ease-in')
      ])
    ])
  ]
})
export class VirtualSkuListComponent extends AuthorityComponent implements OnInit {

  pageSize: number = 5;
  pageNumber: number = 1;
  total: number;
  items: VirtualSkuListModel[] = [];
  searchText: string;

  selectVirtualSkuIds: number[] = [];
  isCheckAllPages: boolean = false;
  exportParams: any;

  constructor(private modalService: NgbModal,
              private goodsInfoService: GoodsInfoService,
              private virtualSkuService: VirtualSkuService,
              private jwtService: JwtService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
  }


  types: SelectOptionModel[] = [
    {name: '虚拟SKU', value: 'VirtualCode'}];


  ngOnInit() {
    this.loadData();
  }

  authorities:any[]=[
    {name: 'Add', value: 7},
    {name: 'Import', value: 8},
    {name: 'Update', value: 9},
    {name: 'Delete', value: 10},
    {name: 'Export', value: 11}
  ];

  getCurrentAuthoritiy(name){
    return this.checkAuthority(this.authorities.find(f=>f.name==name).value)
  }


  loadData(pageNumber: number = 1) {
    this.virtualSkuService.getPageList(this.searchText, pageNumber, this.pageSize).subscribe(data => {
      this.items = data.content.items;
      const pageInfo = data.content.pageInfo;

      this.pageSize = pageInfo.pageSize;
      this.pageNumber = pageInfo.pageIndex + 1;
      this.total = pageInfo.totalCount;
    }, this.handleError);
  }

  reload() {
    this.loadData(this.pageNumber);
  }

  doSearch() {

    this.loadData();
  }

  pageChanged(pN: number): void {
    $('html, body').animate({scrollTop: 0}, 0);
    this.loadData(pN);
  }


  openModal() {
    const searchModal = this.modalService.open(VirtualSkuDetailComponent,
      {size: 'sm', backdrop: 'static'});

    searchModal.componentInstance.modalTitle = '创建虚拟Sku';
    searchModal.result.then(result => {
      this.reload();
    }, reason => {
    });
  }


  openEditVirtualSkuModal(virtualSkuId: number) {
    const detailModal = this.modalService.open(VirtualSkuDetailComponent, {size: 'sm', backdrop: 'static'});
    detailModal.componentInstance.virtualSkuId = virtualSkuId;
    detailModal.componentInstance.modalTitle = '编辑虚拟Sku';
    detailModal.result.then(result => {
      this.reload();
    }, reason => {
    });
  }


  deleteVirtualSku(skuId: number) {
    this.confirm('确定删除该虚拟Sku？', () => {
      this.virtualSkuService.deleteSku(skuId).subscribe(data => {
        this.alertMessage('删除成功');
        this.reload();

      }, this.handleError);
    });
  }

  openInVirtualSKUModal() {
    const modal = this.modalService.open(InVirtualSkuModalComponent, {size: 'sm', backdrop: 'static'});
    modal.result.then(result => {
      this.reload();
    }, reason => {
    });
  }

  onCheclAllPageChange(checked: boolean) {
    if (checked) {
      this.selectVirtualSkuIds = [];
      for (let o of this.items) {
        this.selectVirtualSkuIds.push(o.id);
      }
      this.isCheckAllPages = true;
    }
    else {
      this.selectVirtualSkuIds = [];
      this.isCheckAllPages = false;
    }
  }

  onCheckAllOrderChanged(checked: boolean) {
    if (checked) {
      this.selectVirtualSkuIds = [];
      for (let o of this.items) {
        this.selectVirtualSkuIds.push(o.id);
      }
    }
    else {
      this.selectVirtualSkuIds = [];
      this.isCheckAllPages = false;
    }
  }

  onCheckOrderChanged(isChecked: boolean, orderId: number) {
    if (isChecked) {
      const virtualSkuIndex = this.selectVirtualSkuIds.indexOf(orderId);
      if (virtualSkuIndex >= 0) {
        return;
      }
      else {
        this.selectVirtualSkuIds.push(orderId);
      }
    }
    else {
      const virtualSkuIndex = this.selectVirtualSkuIds.indexOf(orderId);
      if (virtualSkuIndex >= 0) {
        this.selectVirtualSkuIds.splice(virtualSkuIndex, 1);
      }
      this.isCheckAllPages = false;
    }
  }

  openOutputModal() {
    if (this.selectVirtualSkuIds.length == 0) {
      this.error("请选择需要导出的虚拟SKU");
      return;
    }
    let queryData = {
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
      params.set('virtualSkuIds', this.selectVirtualSkuIds.join(','))
    }

    var urlPre = `${environment.api_url}/api/v1/virtualsku/virtualSkuExport`;

    let url = [urlPre, params.toString()].join('?');

    let win = window.open(url);
    win.focus();
    win.location.href = url;


  }

}
