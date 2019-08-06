import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AmazonAccountListModel } from "../../../../../../shared/models/channels/amazon-account-list.model";
import { ShopAccountService } from "../../../../../../shared/services/shop.account.service";
import { RootComponent } from "../../../../../../shared/component/root.component";
import { ShopAmazonCreateAccountModel } from "../../../../../../shared/models/channels/shop.amazon.createaccount";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AmazonModalComponent } from '../modals/amazon-modal/amazon-modal.component';
import { SettingServicesComponent } from '../modals/setting-services/setting-services.component';
import { SettingUserComponent } from '../modals/setting-user/setting-user.component';

@Component({
  selector: 'app-amazon',
  templateUrl: './amazon.component.html',
  styleUrls: ['../../../style.scss', './amazon.component.scss'],
  providers: [ShopAccountService]
})
export class AmazonComponent extends RootComponent implements OnInit {
  country = [
    { Id: null, Name: '全部' },
    { Id: 'CA', Name: '加拿大' },
    { Id: 'US', Name: '美国' },
    { Id: 'MX', Name: '墨西哥' },
    { Id: 'ES', Name: '西班牙' },
    { Id: 'UK', Name: '英国' },
    { Id: 'FR', Name: '法国' },
    { Id: 'DE', Name: '德国' },
    { Id: 'IT', Name: '意大利' },
    { Id: 'IN', Name: '印度' },
    { Id: 'CN', Name: '中国' },
    { Id: 'JP', Name: '日本' },
    { Id: 'AU', Name: '澳大利亚' },
  ];
  searchType = [
    { Id: 'ByAccountName', Name: '账户名' },
    { Id: 'ByMerchantId', Name: 'MerchantId' },
    { Id: 'ByCustomerName', Name: '客服名称' },
  ];

  MarketplaceIdItem = [
    { code: 'A2EUQ1WTGCTBG2', flag: 'assets/country/CA.svg', countryName: '加拿大' },
    { code: 'ATVPDKIKX0DER', flag: 'assets/country/US.svg', countryName: '美国' },
    { code: 'A1AM78C64UM0Y8', flag: 'assets/country/MX.svg', countryName: '墨西哥' },
    { code: 'A1RKKUPIHCS9HS', flag: 'assets/country/ES.svg', countryName: '西班牙' },
    { code: 'A1F83G8C2ARO7P', flag: 'assets/country/GB.svg', countryName: '英国' },
    { code: 'A13V1IB3VIYZZH', flag: 'assets/country/FR.svg', countryName: '法国' },
    { code: 'A1PA6795UKMFR9', flag: 'assets/country/DE.svg', countryName: '德国' },
    { code: 'APJ6JRA9NG5V4', flag: 'assets/country/IT.svg', countryName: '意大利' },
    { code: 'A21TJRUUN4KGV', flag: 'assets/country/IN.svg', countryName: '印度' },
    { code: 'AAHKV2X7AFYLW', flag: 'assets/country/CN.svg', countryName: '中国' },
    { code: 'A1VC38T7YXB528', flag: 'assets/country/JP.svg', countryName: '日本' },
    { code: 'A39IBJ37TRP1C6', flag: 'assets/country/AU.svg', countryName: '澳大利亚' },
    { code: 'A2Q3Y263D00KWC', flag: 'assets/country/BR.svg', countryName: '巴西' },
  ]

  dataState = false;

  enable = 0;

  private submitted: boolean = false;

  pageSize: number = 20;
  pageNumber: number = 1;
  total: number = 0;
  amazonPageItems: AmazonAccountListModel[] = [];

  selectCountryCode: string;
  selectSearchType: string = 'ByAccountName';
  searchText: string;

  constructor(private shopAccountService: ShopAccountService,
    private modalService: NgbModal,
  ) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(pageNumber: number = 1) {

    this.shopAccountService.getAmazonAccountList(pageNumber, this.pageSize, this.selectSearchType, this.searchText, this.selectCountryCode).subscribe(data => {
      this.dataState = data.success;
      const pageData = data.content;
      this.amazonPageItems = pageData.items;
      this.chooseMarketplaceId();
      this.pageNumber = pageData.pageInfo.pageIndex + 1;
      this.pageSize = pageData.pageInfo.pageSize;
      this.total = pageData.pageInfo.totalCount;
    }, this.handleError);
  }


  chooseMarketplaceId() {
    for (let i of this.amazonPageItems) {
      for (let index of this.MarketplaceIdItem) {
        if (i.marketplaceId === index.code) {
          i.countryName = index.countryName;
          i.flag = index.flag;
        }
      }
    }
  }


  pageChanged(pN: number): void {
    this.dataState = false;
    this.loadData(pN);
  }

  reloadData() {
    this.loadData(this.pageNumber);
  }

  enableAccount(accountId: number) {
    this.enable = 1;
    this.shopAccountService.enableAccount(accountId).subscribe(data => {
      this.alertMessage("操作成功");
      this.reloadData();
      this.enable = 0;
    }, error => {
      this.submitted = false;
      if (error.error) {
        this.error(error.error.message);
      } else {
        this.error("网络连接出错");
      }
      this.enable = 0;
    });
  }

  disableAccount(accountId: number) {
    this.shopAccountService.disableAccount(accountId).subscribe(data => {
      this.alertMessage("操作成功");
      this.reloadData();
    }, error => {
      this.submitted = false;
      if (error.error) {
        this.error(error.error.message);
      } else {
        this.error("网络连接出错");
      }
    });
  }

  openModal() {
    const accountModel = this.modalService.open(AmazonModalComponent,
      { size: 'sm', backdrop: 'static' });
    accountModel.componentInstance.modalHeader = '添加Amazon账号';
    accountModel.result.then((result) => {
      if (result === 1) {
        this.reloadData();
      }
    }, (reason) => {
      console.info(`Dismissed ${reason}`);
    });
  }

  settingServices(userId: any, channelType: any, siteCode: any, displayName: any) {
    const model = this.modalService.open(SettingServicesComponent,
      { size: 'sm', backdrop: 'static' });
    model.componentInstance.modalHeader = '设置客服账号';
    model.componentInstance.userId = userId;
    model.componentInstance.channelType = channelType;
    model.componentInstance.siteCode = siteCode;
    model.componentInstance.displayName = displayName;
    model.result.then((result) => {
      if (result === 1) {
        this.reloadData();
      }
    }, (reason) => {
      console.info(`Dismissed ${reason}`);
    });
  }

  doSearch() {
    this.loadData();
  }

  onSelectCountry($event, type, value) {
    this.selectCountryCode = value;
    this.loadData();
  }

  onSelectType($event, type, value) {
    this.selectSearchType = value;
  }

  settingUser(accountId:any,accountName:any) {
    this.shopAccountService.GetUserByAccount(accountId,1).subscribe(data => {
     const userId = data.content;
      const model = this.modalService.open(SettingUserComponent,
        { size: 'sm', backdrop: 'static' });
      model.componentInstance.userId = userId;
      model.componentInstance.userWithType = 1;
      model.componentInstance.accountId = accountId;
      model.componentInstance.accountName = accountName;
      model.result.then((result) => {
        if (result === 1) {
          this.reloadData();
        }
      }, (reason) => {
        console.info(`Dismissed ${reason}`);
      });


    }, this.handleError);


  }
}
