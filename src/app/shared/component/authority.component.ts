import swal from 'sweetalert2';
import { UserService, CurrentUserInfoModel } from 'app/shared';
import { CommonData } from 'app/shared/common-data';
import { RootComponent } from "./root.component";
import { ActivatedRoute, Router, Routes } from "@angular/router";

export class AuthorityComponent extends RootComponent {
  PAGES_MENU: Routes;
  PAGES_ROLE: any;
  PAGES_OPEATIONS: any[] = [];
  PAGES_CHILDOPEATIONS: any[] = [];
  IsAdmin: string;
  PAGE_CURRENTOPEATIONS: any;
  constructor(public activerouter: ActivatedRoute, public router: Router) {
    super();
    this.PAGES_MENU = [];
    this.PAGES_ROLE = [];
    this.PAGES_MENU = CommonData.GetCurrentPageMenu();
    this.PAGES_ROLE = CommonData.GetCurrentPageRole();

    this.IsAdmin = CommonData.GetIsAdmin();
    if (this.IsAdmin == 'false') {
      this.doAuthority();
    }
    this.getCurrentPageMenu();
  }

  getCurrentPageMenu() {
    let id = this.activerouter.snapshot.queryParams["pid"];
    let url = this.router.url.toLowerCase();
    if (this.PAGES_ROLE == null || this.PAGES_ROLE.length == 0) {
      return;
    }
    let currentOperation = this.PAGES_ROLE.find(f => f.resourceId == id);
    if (currentOperation) {
      this.PAGE_CURRENTOPEATIONS = currentOperation;
    }
  }

  doAuthority() {
    let id = this.activerouter.snapshot.queryParams["pid"];
    let url = this.router.url.toLowerCase();
    if(url.indexOf('/pages/home')!=-1){  //如果是首页,就不验证
      return;
    }
    if (this.PAGES_ROLE == null || this.PAGES_ROLE.length == 0) {
      // this.warnMessage("当前权限加载失败,请重新登录");
      // this.router.navigate(['/login']);
      this.router.navigate(['/error-page', 0]);
      return;
    }
    let currentOperation = this.PAGES_ROLE.find(f => f.resourceId == id);
    if (!currentOperation) {
      this.router.navigate(['/error-page', 1]);
      // this.warnMessage("无权限加载当前页面,返回首页");
      // this.router.navigate(['/pages/index/boss', 1],{ queryParams: { pid: 90 } });
      return;
    }
    this.PAGE_CURRENTOPEATIONS = currentOperation;
    if (!url.includes(currentOperation.pageUrl.toLowerCase())) {
      this.router.navigate(['/error-page', 2]);
      // this.warnMessage("当前页面和权限对应失败,返回首页");
      // this.router.navigate(['/pages/index/boss', 1], {queryParams: {pid: 90}});
      return;
    }
    //针对包裹页面的权限获取()
    if (currentOperation.resourceId == 15) {
      if (currentOperation.operations != null && currentOperation.operations != '') {
        this.PAGES_CHILDOPEATIONS = currentOperation.operations.split(',');
      }
      let parentOperation = this.PAGES_ROLE.find(f => f.resourceId == currentOperation.parentId);
      if (parentOperation && parentOperation.operations) {
        this.PAGES_OPEATIONS = parentOperation.operations.split(',');
      }
    }



    // if(currentOperation.PageUrl.toLowerCase().includes("packagesearch")){
    //  // currentOperation.PageUrl.
    // }
    // if(!this.IsChildComponent) {
    //   if (!url.includes(currentOperation.pageUrl.toLowerCase())) {
    //     this.warnMessage("当前页面和权限对应失败,返回首页");
    //     this.router.navigate(['/pages/index/boss', 1], {queryParams: {pid: 1}});
    //     return;
    //   }
    // }


    if (currentOperation.parentId == 1) {     //代表为订单.
      let parentOperation = this.PAGES_ROLE.find(f => f.resourceId == currentOperation.parentId);
      if (parentOperation && parentOperation.operations) {
        this.PAGES_OPEATIONS = parentOperation.operations.split(',');
      }
      return;
    }
    if (currentOperation.operations != null && currentOperation.operations != '') {
      this.PAGES_OPEATIONS = currentOperation.operations.split(',');
    }

  }

  checkAuthority(authId:number) :boolean{
    let flag:boolean=false;
    if(this.IsAdmin=='false') {
      if (this.PAGES_OPEATIONS.length > 0) {
        if (this.PAGES_OPEATIONS.includes(authId.toString())) {
          flag = true;
          return flag;
        }
      }
    } else {
      return true;
    }
    return flag;
  }

  //针对有子页面。对应的权限
  checkChildAuthority(authId: number): boolean {
    let flag: boolean = false;
    if (this.IsAdmin == 'false') {
      if (this.PAGES_CHILDOPEATIONS.length > 0) {
        if (this.PAGES_CHILDOPEATIONS.includes(authId.toString())) {
          flag = true;
          return flag;
        }
      }
    } else {
      return true;
    }
    return flag;
  }

}
