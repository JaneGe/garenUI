import { Component, OnInit } from '@angular/core';
import {NgbActiveModal,NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RootComponent} from "../../../../../shared/component/root.component";
import {ChooseSkuListModel} from "../../../../../shared/models/products/ChooseSku-list-model";
import {ChooseSkuService} from "../../../../../shared/services/Choose-sku-service";

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

 chooseSkuIds:number[]=[];

  searchText: string;
  searchType: string;


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
    this.activeModal.close(this.chooseSkuIds);
  }

  toggleSelectSkuId(checked:boolean,  skuId: number){
    if(checked){
      if(this.chooseSkuIds.indexOf(skuId) >=0){
        return;
      }
      this.chooseSkuIds.push(skuId);
    }
    else{
      let numberIndex = this.chooseSkuIds.indexOf(skuId);
      if(numberIndex >= 0 ){
        this.chooseSkuIds.splice(numberIndex, 1);
      }
    }

  }
  toggleSelectAll(checked:boolean){
    this.chooseSkuIds = [];
    if(checked){

      for(let sku of this.items){
        this.chooseSkuIds.push(sku.id);
      }
    }
  }
  isSelectAll(): boolean{
    return this.items.length >0 && this.chooseSkuIds.length == this.items.length
  }

}
