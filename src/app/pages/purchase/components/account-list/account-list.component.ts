import { Component, OnInit } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountInfoEditComponent } from '../modals/account-info-edit/account-info-edit.component';
import {PurchaseAccountServiceService} from "../../../../shared/services/purchase-account-service.service";
import {RootComponent} from "../../../../shared/component/root.component";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss', '../../style.scss'],
  providers:[PurchaseAccountServiceService]
})
export class AccountListComponent extends RootComponent implements OnInit {
  platformTypes = [{ Id: null, Name: '全部' }, { Id: 1, Name: '淘宝' }, { Id: 2, Name: '京东' }];


  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };

  DataItems: any[] = [];
  selectedPlatformType: string;
  searchText: string;

  constructor(private modalService: NgbModal,
              private purchaseAccountServiceService: PurchaseAccountServiceService) {
    super();
  }

  ngOnInit() {
    this.onQuery();
  }

  pageChanged(pN: number): void {
    this.onQuery(pN);
  }

  onQuery(pageNumber: number = 1) {
     this.purchaseAccountServiceService.getPageList(this.selectedPlatformType, this.searchText, pageNumber,
       this.PageInfo.pageSize).subscribe(res => {
          this.DataItems = res.content.items;
          this.PageInfo.pageIndex = res.content.pageInfo.pageIndex + 1;
          this.PageInfo.pageSize = res.content.pageInfo.pageSize;
          this.PageInfo.totalCount = res.content.pageInfo.totalCount;
     }, this.handleError);
  }
  reload() {
    this.onQuery(this.PageInfo.pageIndex)
  }
  doSearch() {
    this.onQuery();
  }
  onSelectPlatform(target, pId) {
    this.selectedPlatformType = pId;
    this.doSearch();
  }
  openAddModal() {
    const modal = this.modalService.open(AccountInfoEditComponent, { backdrop: 'static', size: 'sm' });
    modal.result.then(result => {
      this.reload();
    }, reject => {
    });
  }
  openEditModal(data) {

    const modal = this.modalService.open(AccountInfoEditComponent, { backdrop: 'static', size: 'sm' });
    modal.componentInstance.accountId = data.id;
    modal.componentInstance.accountName = data.accountName;
    modal.componentInstance.selectedPlatformType = data.platformTypeInt;

    modal.result.then(result => {
      this.reload();
    }, reject => {
    });
  }
}
