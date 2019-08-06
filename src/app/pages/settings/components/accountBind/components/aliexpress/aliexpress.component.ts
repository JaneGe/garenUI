import { Component, OnInit } from '@angular/core';
import { ShopAccountService } from "../../../../../../shared/services/shop.account.service";
import { RootComponent } from "../../../../../../shared/component/root.component";
import { AliExpressAccountListModel } from "../../../../../../shared/models/channels/AliExpressAccountListModel";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AliexpressModalComponent } from '../modals/aliexpress-modal/aliexpress-modal.component';
import { SettingUserComponent } from '../modals/setting-user/setting-user.component';

@Component({
  selector: 'app-aliexpress',
  templateUrl: './aliexpress.component.html',
  styleUrls: ['../../../style.scss', './aliexpress.component.scss'],
  providers: [ShopAccountService]
})
export class AliexpressComponent extends RootComponent implements OnInit {
  pageSize: number = 20;
  pageNumber: number = 1;
  total: number = 0;
  aliexpressdata: AliExpressAccountListModel[] = [];
  searchText: string;

  authLoginUrl: string = null;

  constructor(private modalService: NgbModal,
    private shopAccountService: ShopAccountService) {
    super();

  }

  ngOnInit() {
    this.loadData();
  }

  loadData(pageNumber: number = 1) {
    this.shopAccountService.getAliExpressAccountList(this.selectSearchType,this.searchText,pageNumber, this.pageSize)
      .subscribe(data => {
        const pageData = data.content;
        console.log(pageData);

        this.aliexpressdata = pageData.items;
        this.pageNumber = pageData.pageInfo.pageIndex + 1;
        this.pageSize = pageData.pageInfo.pageSize;
        this.total = pageData.pageInfo.totalCount;
      }, this.handleError);
  }

  redoAuthorize(channelId) {
    this.authLoginUrl = null;
    this.shopAccountService.getLoginUrl(channelId, null).subscribe(data => {
      this.authLoginUrl = data.content;
      const win = window.open();
      win.location.href = this.authLoginUrl;
    }, this.handleError);
  }
  reloadData(){
    this.loadData(this.pageNumber);
  }
  enableAccount(accountId: number) {
    this.shopAccountService.enableAccount(accountId).subscribe(data => {
      this.alertMessage("操作成功");
      this.reloadData();
    }, this.handleError);
  }

  disableAccount(accountId: number) {
    this.shopAccountService.disableAccount(accountId).subscribe(data => {
      this.alertMessage("操作成功");
      this.reloadData();
    }, this.handleError);
  }
  aliexpressModal() {
    const modal = this.modalService.open(AliexpressModalComponent,{ size: 'sm', backdrop: 'static' });
    modal.result.then((result) => {
    }, reason => {
    });
  }


  searchType = [
    { Id: 'ByAccountName', Name: '账户名' },
    { Id: 'ByCustomerName', Name: '客服名称' },
  ];
  selectSearchType: string = 'ByAccountName';
  onSelectType($event, type, value) {
    this.selectSearchType = value;
  }
  settingUser(accountId:any,accountName:any) {
    this.shopAccountService.GetUserByAccount(accountId,4).subscribe(data => {
      const userId = data.content;
      const model = this.modalService.open(SettingUserComponent,
        { size: 'sm', backdrop: 'static' });
      model.componentInstance.userId = userId;
      model.componentInstance.userWithType = 4;
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
