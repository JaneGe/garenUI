import { Component, OnInit } from '@angular/core';
import {NgbActiveModal,NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RootComponent} from "../../../../../shared/component/root.component";
import {ChooseSkuService} from "../../../../../shared/services/Choose-sku-service";
import {ChooseSkuListModel} from "../../../../../shared/models/products/ChooseSku-list-model";
class SelectOptionModel {
  value: string;
  name: string;
}


@Component({
  selector: 'app-choose-sku-modal',
  templateUrl: './choose-sku-modal.component.html',
  styleUrls: ['./choose-sku-modal.component.scss'],
  providers: [ChooseSkuService]
})
export class ChooseSkuModalComponent extends RootComponent implements OnInit {

  pageSize: number = 5;
  pageNumber: number;
  total: number;
  items: ChooseSkuListModel[] = [];

  chooseSku: ChooseSkuListModel = null;

  searchText: string;
  searchType: string='ByCode';


  types: SelectOptionModel[] = [
    {name: 'SkuCode', value: 'ByCode'},
    {name: '商品名称', value: 'ByName'}];



  constructor(private modalService: NgbModal,
              private activeModal: NgbActiveModal,
              private skuService: ChooseSkuService) {
    super();

  }


  ngOnInit() {

    this.loadData();
  }


  onSearchTypeSelect($event, selectSearchType: string) {
    this.searchType = selectSearchType;
  }
  loadData(pageNumber: number = 1) {

    this.skuService.getPageList(this.searchText, this.searchType, pageNumber, this.pageSize).subscribe(data => {
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
    this.loadData(pN);
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  confirm() {
    if (this.chooseSku != null){
      this.activeModal.close(this.chooseSku);

    }
    else{
      this.error("请选择Sku");
    }
  }

  selectSku(sku: ChooseSkuListModel){
    this.chooseSku = sku;

  }

}
