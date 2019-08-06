import { Component, OnInit } from '@angular/core';
import { ThirdTimesService } from "./thirdTimes.service";
import { RootComponent } from 'app/shared/component/root.component';
import {AuthorityComponent} from "../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
import swal from 'sweetalert2';

@Component({
  selector: 'app-third-times',
  templateUrl: './third-times.component.html',
  styleUrls: ['../public.scss', './third-times.component.scss'],
  providers: [ThirdTimesService]
})
export class ThirdTimesComponent extends AuthorityComponent implements OnInit {
  scanType: string = "TrackingNumber";

  PageInfo: {
    pageIndex: number,
    pageSize: number,
    totalCount: number
  } = {
      pageIndex: 0,
      pageSize: 10,
      totalCount: 0
    };
  PackageDate: Array<any>;
  storeSearchKey: string = '';

  constructor(private thirdTimesService: ThirdTimesService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
  }

  ngOnInit() {
    $('#search').focus();
    // this.loadData();
  }

  loadData(pageNumber: number = 1, isEnterJudge: boolean = false) {
    if (this.storeSearchKey == '') {
      this.PackageDate = [];
      this.PageInfo = { pageIndex: 0, pageSize: 10, totalCount: 0 };
      return;
    }
    this.thirdTimesService.SearchPackageProductQuery(pageNumber - 1, this.PageInfo.pageSize, this.storeSearchKey).subscribe(data => {
      this.PackageDate = data.content.items;
      console.log(this.PackageDate);
      if (isEnterJudge) {
        this.enterJudge();
      }
      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
    });


  }

  enterJudge() {
    for (let index in this.PackageDate) {
      if (this.PackageDate[index].isException === null) {
        this.isAllFinish = false;
        break;
      } else {
        this.isAllFinish = true;
      }
    }
    if (this.isAllFinish) {
      //this.alertMessage('包裹复核完成');

      swal({
        title: '包裹复核完成!',
        text: '包裹复核完成',
        timer: 500,
        onOpen: () => {
          //swal.showLoading()
        }
      }).then((result) => {
        if (result.dismiss.toString() === 'timer') {
          console.log('I was closed by the timer')
        }
      })

      this.storeSearchKey = '';
      this.PackageDate = [];
    }
  }


  Save(IsException: boolean) {
    if (this.PackageDate.length > 0) {
      this.thirdTimesService.UpdatePackageStatusQuery(this.PackageDate[0].packageId, IsException).subscribe(data => {
        this.loadData(this.PageInfo.pageIndex, true);
        this.storeSearchKey = '';
      });

    } else {
      this.error("当前没有包裹信息！");
    }
  }

  isAllFinish: boolean = false;
  SaveItem(packageItemId: number, isException: boolean) {
    this.thirdTimesService.UpdatePackageItemStatusQuery(packageItemId, isException).subscribe(data => {
      this.loadData(this.PageInfo.pageIndex, true);

    });
  }

  pageChanged(pn: number) {
    this.loadData(pn, true);
  }

}
