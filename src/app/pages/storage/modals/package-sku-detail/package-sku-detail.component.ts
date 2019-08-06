import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as Slide from '../../../../shared/animations/modal-Slide';
import {TaskService} from "../task-detail/task.service";
import {PickingService} from "../../../../shared/services/picking.service";

@Component({
  selector: 'app-package-sku-detail',
  templateUrl: './package-sku-detail.component.html',
  styleUrls: ['../../public.scss','./package-sku-detail.component.scss'],
  providers:[TaskService,PickingService]
})
export class PackageSkuDetailComponent implements OnInit {
  @Input()
  modalHeader: string;
  node:any;
  skus:Array<any>=[];
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = {pageIndex: 0, pageSize: 5, totalCount: 0};
  packageId:number;

  constructor(private activeModal:NgbActiveModal,private taskService:TaskService,private pickingService: PickingService) {
  }

  ngOnInit() {
    this.node=$('#form1')[0].parentNode.parentNode.parentNode;
    $('#form1').parent().parent().css({'width':'1000px',left:'-100px'});
    Slide.slideIn(this.node);
    this.OnQuery();
  }
  closeModal(){
    Slide.slideLeft(this.node,this);
  }
  pageChanged(pn){
    this.OnQuery(pn);
  }
  OnQuery(pageNumber: number = 1){
    this.pickingService.PickTaskForSkuDetailById(this.packageId,pageNumber - 1,this.PageInfo.pageSize).subscribe(data => {
      this.skus = data.content.items;
      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
    });
  }
}
