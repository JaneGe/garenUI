import {Component, OnInit, Input} from '@angular/core';
import * as Slide from '../../../../shared/animations/modal-Slide';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PackageSkuDetailComponent} from "../package-sku-detail/package-sku-detail.component";
import {TaskService} from "./task.service";
import {PickingService} from "../../../../shared/services/picking.service";
import {PackagePickUpFailModel} from "../../../../shared/models/pickings/picking-task-model";
import {RootComponent} from "../../../../shared/component/root.component";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['../../public.scss', './task-detail.component.scss'],
  providers: [TaskService, PickingService]
})
export class TaskDetailComponent extends RootComponent implements OnInit {
  @Input()
  modalHeader: string;
  taskArray: Array<any> = [];
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = {pageIndex: 0, pageSize: 10, totalCount: 0};
  node: any;
  empName: any;
  pickId: number = -1;
  picknumber: string = '';
  packType: string = '';


  searchTypes = [
    {Name: '跟踪号', Id: 'TrackingNumber'},
    {Name: '包裹号', Id: 'PackageNumber'}
  ];

  printState = [
    {Name: '已打印', Id: 'PrintOk'},
    {Name: '未打印', Id: 'PrintOn'}
  ];

  deliverState = [
    {Name: '已发货', Id: 'ShippingedOk'},
    {Name: '未发货', Id: 'ShippingedOn'}
  ];

  selectSearchType: string = 'TrackingNumber';
  searchText: string;
  selectPrintState: string = 'PrintOk';
  selectShippingState: string = 'ShippingedOk';

  constructor(private activeModal: NgbActiveModal,
              private modalservice: NgbModal,
              private taskService: TaskService, private pickingService: PickingService) {
    super();
  }

  ngOnInit() {
    this.node = $('#form')[0].parentNode.parentNode.parentNode;
    $('#form').parent().parent().css({'width': '1200px', left: '-200px'});
    Slide.slideIn(this.node);
    this.OnQuery();
  }

  closeModal() {
    Slide.slideLeft(this.node, this);
  }

  pageChanged(pn) {
    this.OnQuery(pn);
  }

  doSearch() {
    this.OnQuery();
  }

  OnQuery(pageNumber: number = 1) {

    this.pickingService.PickPackageDetailById(this.pickId, pageNumber - 1, this.PageInfo.pageSize, this.selectSearchType, this.searchText,
      this.selectPrintState, this.selectShippingState).subscribe(data => {
      this.taskArray = data.content.items;
      console.log(this.taskArray);
      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
    }, this.handleError);
  }

  openPackageSkuDetails(packageId: any) {
    const modal = this.modalservice.open(PackageSkuDetailComponent, {size: 'lg', backdrop: 'static'});
    modal.componentInstance.modalHeader = '包裹SKU详情';
    modal.componentInstance.packageId = packageId;
  }

  RemarkPickFailed(packageId: number) {
    let param = new PackagePickUpFailModel();
    param.ActualNumber = 0;
    param.PlanNumber = 0;
    param.PickingId = this.pickId;
    param.PackageId = packageId;
    param.FailedType = 1;
    this.pickingService.PickUpPackageFailed(param).subscribe(data => {
      this.OnQuery();
      $('#swal2-title').css({'font-size': '18px', 'font-weight': 'normal'});
    }, e => {
      this.handleError(e);
    });
  }

  onSelectSearchTypes(type: string) {
    this.selectSearchType = type;
  }

  onSelectPrintState(type: string) {
    this.selectPrintState = type;
    this.OnQuery();
  }

  onSelectDeliverState(type: string) {
    this.selectShippingState = type;
    this.OnQuery();
  }
}
