import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs/Observable";
import {SkuService} from "../../../../shared/services/sku-service";
import {of} from "rxjs/observable/of";
import {SkuSearchLiteModel} from "../../../../shared/models/products/sku-search-lite-model";
import {Select2OptionData} from "ng2-select2";
import {RootComponent} from "../../../../shared/component/root.component";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-appoincommodity',
  templateUrl: './appoincommodity.component.html',
  providers: [SkuService],
  styleUrls: ['./appoincommodity.component.scss', '../../public.scss']
})
export class AppoincommodityComponent extends RootComponent implements OnInit {
  search = (text$: Observable<string>) =>
    text$
      .debounceTime(100)
      .distinctUntilChanged()
      .switchMap(term => {
        if (term == null || term.length < 1) {
          return of([]);
        }
        else {

          let data = this.loadSkusProise(term).catch((e) => {
            this.handleError(e);
            return of([]);
          });
          return data;
        }
      });

  limitingcommodity: Array<any> = []; //skucode数组
  commodityList: Array<any> = [];
  name: string = '';
  reSelectList: Array<any> = [];
  modalHeader: any = '';
  allSkus: SkuSearchLiteModel[] = [];

  checkSkus: SkuSearchLiteModel[] = [];

  constructor(private activeModal: NgbActiveModal,
              private skuService: SkuService) {
    super();
  }

  loadSkusProise(searchText) {
    return this.skuService.serachSkus(searchText).map(data => {
      const theSkus = data.content;
      const dropSkus = [];
      for (const sku  of  theSkus) {
        const item = <any>{};
        item.id = sku.skuId.toString();
        item.text = sku.skuCode;
        dropSkus.push(item);
        if (this.allSkus.findIndex(m => m.skuId == sku.skuId) < 0) {
          this.allSkus.push(sku)
        }
      }
      return dropSkus;
    });
  }

  OnselectItem(val) {
    const itemInfo = val.item;
    const skuCode = itemInfo.text;
    if (skuCode != '' && (this.limitingcommodity.indexOf(skuCode) == -1)) {
      this.limitingcommodity.push(skuCode);
    }
    else {
      console.log(this.limitingcommodity);
      this.reSelectList.push(skuCode)
    }
    $('#cleanButton')[0].focus();
  }

  skuFormatter = (x: Select2OptionData) => `${x.text}-[${x.id}]`;
  disPlaySkuFormatter = (x: Select2OptionData) => x.text;

  cleanSearchText() {
    $('#product').val('');
    $('#product')[0].focus();
  }

  ngOnInit() {
    //console.log(this.commodityList);
    $('#product')[0].focus();
  }

  closeModal() {
    this.activeModal.close();
  }

  OnSubmit() {
    this.activeModal.close(this.limitingcommodity);
  }

  choose(e: any) {
    if (e.value != '' && (this.commodityList.indexOf(e.value) != -1) && (this.limitingcommodity.indexOf(e.value) == -1)) {
      this.limitingcommodity.push(e.value);
      this.refreshSkus();
    }
    else {
      console.log(this.limitingcommodity);
      this.reSelectList.push(e.value)
    }
  }

  getRepeatNum(item: string) {
    return this.reSelectList.filter(data => data == item).length;
  }

  del(item: string) {

    const valueIndex = this.limitingcommodity.findIndex(m => m == item);
    if(valueIndex >= 0){
      this.limitingcommodity.splice(valueIndex,1);
      this.refreshSkus();
    }
  }

  refreshSkus() {
    //this.checkSkus = this.allSkus.filter(m => this.limitingcommodity.findIndex(x => x == m.skuId) >= 0);
  }
}
