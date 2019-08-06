import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ShopAccountService} from "../../../../../../shared/services/shop.account.service";
import {RootComponent} from "../../../../../../shared/component/root.component";
import {WishAccountListModel} from "../../../../../../shared/models/channels/WishAccountListModel";
import {WishAuthModalComponent} from "../modals/wish-auth-modal/wish-auth-modal.component";
import { SettingUserComponent } from '../modals/setting-user/setting-user.component';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['../../../style.scss', './wish.component.scss'],
  providers:[ ShopAccountService ]
})

export class WishComponent  extends RootComponent  implements OnInit {

  pageSize: number = 20;
  pageNumber: number = 1;
  total: number = 0;
  accounts: WishAccountListModel[] = [];
  authLoginUrl: string = null;

  searchType = [{ Id: 'ByAccountName', Name: '账户名' }, { Id: 'ByCustomerName', Name: '客服名称' }];
  selectSearchType: string = 'ByAccountName';
  searchText: string;

  constructor(private modalService: NgbModal,
              private shopAccountService: ShopAccountService) {
    super();
  }
  ngOnInit() {
    this.loadData();
  }

  loadData(pageNumber: number = 1) {
    this.shopAccountService.getWishAccountList(this.selectSearchType,this.searchText, pageNumber, this.pageSize)
      .subscribe(data => {
        const pageData = data.content;

        this.accounts = pageData.items;
        this.pageNumber = pageData.pageInfo.pageIndex + 1;
        this.pageSize = pageData.pageInfo.pageSize;
        this.total = pageData.pageInfo.totalCount;
      }, this.handleError);
  }
  addNewAccount() {
    const modal = this.modalService.open(WishAuthModalComponent,{ size: 'sm', backdrop: 'static' });
    modal.result.then((result) => {
      this.reloadData();
    }, reason => {
    });
  }
  redoAuthorize(channelId) {
    this.authLoginUrl = null;
    this.shopAccountService.getWishLoginUrl(channelId, null).subscribe(data => {
      this.authLoginUrl = data.content;
      const win = window.open();
      win.location.href = this.authLoginUrl;
    }, this.handleError);
  }
  reloadData(){
    this.loadData(this.pageNumber);
  }

  pageChanged(pN: number): void {
    this.loadData(pN);
  }


  enableAccount(accountId: number) {
    this.shopAccountService.enableAccount(accountId).subscribe(data => {
      this.alertMessage("操作成功");
      this.reloadData();
    }, this.handleError);
  }



  onSelectType($event, type, value) {
    this.selectSearchType = value;
  }
  settingUser(accountId:any,accountName:any) {
    this.shopAccountService.GetUserByAccount(accountId,3).subscribe(data => {
      const userId = data.content;
      const model = this.modalService.open(SettingUserComponent,
        { size: 'sm', backdrop: 'static' });
      model.componentInstance.userId = userId;
      model.componentInstance.userWithType = 3;
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
