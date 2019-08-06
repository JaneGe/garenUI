import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressModalComponent } from '../modals/1688-address/1688-address.component';
import { Ali1688AccountService } from "../../../../../../shared/services/ali1688-account-service";
import { RootComponent } from "../../../../../../shared/component/root.component";
import { Ali1688AccountListModel } from "../../../../../../shared/models/channels/ali1688/ali1688-account-list-model";
import { Add1688AccountComponent } from "../modals/add1688-account/add1688-account.component";
import { SetLoginInfoComponent } from "../../../modals/set-login-info/set-login-info.component";
import { SettingUserComponent } from '../modals/setting-user/setting-user.component';
import {ShopAccountService} from "../../../../../../shared/services/shop.account.service";

@Component({
  selector: 'app-alibaba',
  templateUrl: './alibaba.component.html',
  styleUrls: ['../../../style.scss', './alibaba.component.scss'],
  providers: [Ali1688AccountService,ShopAccountService]
})

export class AlibabaComponent extends RootComponent implements OnInit {
  searchType = [
    { Id: 'ByAccountName', Name: '账户名' },
    { Id: 'ByCustomerName', Name: '客服名称' },
  ];

  pageSize: number = 20;
  pageNumber: number = 1;
  total: number = 0;
  items: Ali1688AccountListModel[] = [];

  constructor(private modalService: NgbModal,
    private ali1688AccountService: Ali1688AccountService,private shopAccountService: ShopAccountService) {
    super();
  }

  ngOnInit() {
    this.loadData();

  }

  enableAccount(accountId: number) {
    this.ali1688AccountService.enableAccount(accountId).subscribe(data => {
      this.reload();
    }, this.handleError);
  }

  disableAccount(accountId: number) {
    this.ali1688AccountService.disableAccount(accountId).subscribe(data => {
      this.reload();
    }, this.handleError);
  }

  reload() {
    this.loadData(this.pageNumber);
  }

  loadData(pageNumber: number = 1) {
    this.ali1688AccountService.getAccountList(this.selectSearchType,this.searchText,pageNumber, this.pageSize).subscribe(data => {
      this.items = data.content.items;
      console.log(this.items);

      const pageInfo = data.content.pageInfo;
      this.pageSize = pageInfo.pageSize;
      this.pageNumber = pageInfo.pageIndex + 1;
      this.total = pageInfo.totalCount;
    }, this.handleError);
  }

  openAuthModal(accountId: number = null) {
    const addAccountModel = this.modalService.open(Add1688AccountComponent,
      { size: 'sm', backdrop: 'static' });
    addAccountModel.componentInstance.accountId = accountId;
    addAccountModel.result.then((result) => {
      this.reload();
    }, reason => {
    });
  }

  openSettingUserLogin(accountId: number = null, loginId: number = null) {
    const addAccountModel = this.modalService.open(SetLoginInfoComponent,
      { size: 'lg', backdrop: 'static' });
    addAccountModel.componentInstance.accountId = accountId;
    addAccountModel.componentInstance.modalHeader = '设置用户登录信息';
    addAccountModel.result.then((result) => {
      if (result != undefined) {
        console.log(result);
      }
      this.reload();
    }, reason => {
    });
  }

  openEditModal(accountId: number) {

    const addressModel = this.modalService.open(AddressModalComponent, { size: 'sm', backdrop: 'static' });
    addressModel.componentInstance.accountId = accountId;
  }

  pageChanged(pN: number): void {
    this.loadData(pN);
  }

  selectSearchType: string = 'ByAccountName';
  searchText: string;
  onSelectType($event, type, value) {
    this.selectSearchType = value;
  }
  settingUser(accountId:any,accountName:any) {
    this.shopAccountService.GetUserByAccount(accountId,2).subscribe(data => {
      const userId = data.content;
      const model = this.modalService.open(SettingUserComponent,
        { size: 'sm', backdrop: 'static' });
      model.componentInstance.userId = userId;
      model.componentInstance.userWithType = 2;
      model.componentInstance.accountId = accountId;
      model.componentInstance.accountName = accountName;
      model.result.then((result) => {
        if (result === 1) {
          this.loadData();
        }
      }, (reason) => {
        console.info(`Dismissed ${reason}`);
      });


    }, this.handleError);
  }
  doSearch() {
    this.loadData();
  }
}
