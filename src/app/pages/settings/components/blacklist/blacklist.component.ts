import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {BlackListModalComponent} from '../modals/blackListModal/blackListModal.component';
import swal from 'sweetalert2';
import {AddShuadanModalComponent} from '../modals/addShuadanModal/addShuadanModal.component';
import {BlacklistService} from './blacklist.service';
import {RootComponent} from 'app/shared/component/root.component';
import {UserService} from "../../../../shared/services/user.service";
import {CommonOptionModel, SiteConst} from "app/shared/services/site-const";
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss', '../style.scss'],
  providers: [BlacklistService, UserService]
})
export class BlacklistComponent extends AuthorityComponent implements OnInit {
  tabChanged: number = 1;


  pageSize: number = 5;
  pageNumber: number = 1;
  dataNumber: number = 1;

  selectOrderIds: number[] = [];
  isCheckAllPages: boolean = false;

  blacklistUserList: any[] = [];
  selectCountryCode: string='GB';
  searchText: string;
  reissueNumberStart: number;
  reissueNumberEnd: number;
  total: number;
  searchType:string=null;

  supportFilterCountries: CommonOptionModel[] = [];

  constructor(public http: Http,
              private modalService: NgbModal,
              private blacklistService: BlacklistService,
              private userService: UserService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
    this.supportFilterCountries = SiteConst.supportFilterCountries.filter(m => m.text != null);
  }

  searchMore: boolean = false;

  screen = [];

  ngOnInit() {
    this.loadData();
  }

  loadData(pageNumber: number = 1) {
    if (this.tabChanged == 1) {
      this.searchType='Reissue';
      this.userService.getBlacklistUserList(pageNumber, this.pageSize, this.selectCountryCode,
        this.reissueNumberStart, this.reissueNumberEnd, this.searchText,this.searchType)
        .subscribe(data => {
          const pageData = data.content;
          this.blacklistUserList = pageData.items;
          this.pageNumber = pageData.pageInfo.pageIndex + 1;
          this.pageSize = pageData.pageInfo.pageSize;
          this.total = pageData.pageInfo.totalCount;
        });
    }
   else if (this.tabChanged == 2) {
      this.searchType='ReturnOfGoods';
      this.userService.getBlacklistUserList(pageNumber, this.pageSize, this.selectCountryCode,
        this.reissueNumberStart, this.reissueNumberEnd, this.searchText,this.searchType)
        .subscribe(data => {
          const pageData = data.content;
          this.blacklistUserList = pageData.items;
          this.pageNumber = pageData.pageInfo.pageIndex + 1;
          this.pageSize = pageData.pageInfo.pageSize;
          this.total = pageData.pageInfo.totalCount;
        });
    }
    else if (this.tabChanged == 3) {
      this.searchType='Refunds';
      this.userService.getBlacklistUserList(pageNumber, this.pageSize, this.selectCountryCode,
        this.reissueNumberStart, this.reissueNumberEnd, this.searchText,this.searchType)
        .subscribe(data => {
          const pageData = data.content;
          this.blacklistUserList = pageData.items;
          this.pageNumber = pageData.pageInfo.pageIndex + 1;
          this.pageSize = pageData.pageInfo.pageSize;
          this.total = pageData.pageInfo.totalCount;
        });
    }
    else if (this.tabChanged == 4) {
      this.searchType='Scalping';
      this.userService.getBlacklistUserList(pageNumber, this.pageSize, this.selectCountryCode,
        this.reissueNumberStart, this.reissueNumberEnd, this.searchText,this.searchType)
        .subscribe(data => {
          const pageData = data.content;
          this.blacklistUserList = pageData.items;
          this.pageNumber = pageData.pageInfo.pageIndex + 1;
          this.pageSize = pageData.pageInfo.pageSize;
          this.total = pageData.pageInfo.totalCount;
        });
    }
  }

  pageChanged(pN: number): void {
    this.loadData(pN);
  }

  reloadData() {
    this.loadData(this.pageNumber);
  }

  onSelect($event, i) {
    console.log($event.innerText);
  }

  SearchMore() {
    if (this.searchMore) {
      this.searchMore = false;
    } else {
      this.searchMore = true;
    }
  }

  tabChange(tabChanged: number) {
    this.tabChanged = tabChanged;
    this.selectCountryCode ='GB';
    this.selectOrderIds = [];
    this.isCheckAllPages = false;
    this.loadData();
  }

  openModal(id: number, modalType) {
    const searchModal = this.modalService.open(BlackListModalComponent,
      {size: 'sm', backdrop: 'static'});
    searchModal.componentInstance.id=id;
    searchModal.componentInstance.modalType = modalType;
}

  openAddShuadanModal() {
    const addModal = this.modalService.open(AddShuadanModalComponent,
      {size: 'sm', backdrop: 'static'});
    addModal.result.then(re => {
      this.loadData();
    }, reason => {
    })
  }

  deleteItem(id: number) {
    this.confirm("确认删除此信息？", () => {

      this.userService.deteleBlacklistUserById(id).subscribe(data => {
        this.alertMessage("列表删除成功!");
        this.loadData();
      }, e => {
        this.handleError(e);
      });


    });
  }

  onCheckAllOrderChanged(checked: boolean) {
    if (checked) {
      this.selectOrderIds = [];
      for (let o of this.blacklistUserList) {
        this.selectOrderIds.push(o.id);
      }
    }
    else {
      this.selectOrderIds = [];
      this.isCheckAllPages = false;
    }

  }

  onCheckOrderChanged(isChecked: boolean, orderId: number) {
    if (isChecked) {
      const orderIndex = this.selectOrderIds.indexOf(orderId);
      if (orderIndex >= 0) {
        return;
      }
      else {
        this.selectOrderIds.push(orderId);
      }
    }
    else {
      const orderIndex = this.selectOrderIds.indexOf(orderId);
      if (orderIndex >= 0) {
        this.selectOrderIds.splice(orderIndex, 1);
      }
      this.isCheckAllPages = false;
    }
  }

  doSearch(){
    this.loadData();
  }

  onSelectCountry(countryCode: string) {
    this.selectCountryCode = countryCode;
    this.doSearch();
  }
}
