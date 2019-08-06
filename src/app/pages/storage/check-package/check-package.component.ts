import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PackageCheckService} from "./check-package.server";
import {AuthorityComponent} from "../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-check-package',
  templateUrl: './check-package.component.html',
  styleUrls: ['../public.scss','./check-package.component.scss'],
  providers: [PackageCheckService]
})
export class CheckPackageComponent extends AuthorityComponent implements OnInit {

  SkuInfo:Array<any>=[
  ];
  storeSearchKey:string='';
  checkpackageModel:any={};
  constructor(private packageCheckService: PackageCheckService,
              private modalService: NgbModal,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
  }

  ngOnInit() {
  }

  CalePackageBySearchCode()
  {
    if(this.storeSearchKey==''){
      this.SkuInfo=[];
      this.checkpackageModel={};
      return;
    }
    this.packageCheckService.CalePackageBySearchCode(this.storeSearchKey).subscribe(data => {
      this.checkpackageModel=data.content;
      console.log(this.checkpackageModel);

    });
    this.packageCheckService.SearchPackageProductQuery(this.storeSearchKey).subscribe(data => {
      this.SkuInfo=data.content;
      console.log(this.SkuInfo);

    });
  }

}
