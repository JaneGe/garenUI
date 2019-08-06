import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RootComponent} from "../../../../shared/component/root.component";
import {PackageService} from "../../../../shared/services/package-search-service";
import {CommonOptionModel} from "../../../../shared/services/site-const";

@Component({
  selector: 'app-abnormalDetail',
  templateUrl: './abnormalDetail.component.html',
  styleUrls: ['./abnormalDetail.component.scss'],
  providers: [PackageService]
})
export class AbnormalDetailComponent extends RootComponent implements OnInit {

  pageSize: number = 5;
  pageNumber: number = 1;
  total: number;

  pickingId: number;
  packageId: number;
  item:any[]=[];
  searchType:string='Sku';
  searchText: string;

  suppprtSearchTypes: CommonOptionModel[] = [
    {text: 'Sku', value: 'Sku'},{text: '订单号', value: 'OrderNumber'}];

  constructor(private purchaseOrdeModal: NgbActiveModal,
              private packageService: PackageService) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(pageNumber: number = 1) {
    this.packageService.getPackagePickingFailInfoById(pageNumber, this.pageSize,this.packageId,this.searchText,
      this.searchType).subscribe(data => {

      this.item = data.content.items;

      const pageInfo = data.content.pageInfo;

      this.pageSize = pageInfo.pageSize;
      this.pageNumber = pageInfo.pageIndex + 1;
      this.total = pageInfo.totalCount;
    }, this.handleError);

  }

  doSearch() {
    this.loadData();
  }

  onSearchTypeChanged($event) {

  }

  closeModal() {
    this.purchaseOrdeModal.close();
  }

  pageChanged(pN: number): void {
    this.loadData(pN);
  }
}
