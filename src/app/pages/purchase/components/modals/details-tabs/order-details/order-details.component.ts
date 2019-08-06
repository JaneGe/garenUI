import {Component, Input, OnInit} from '@angular/core';
import {OrderDetailsService} from "./orderDetails.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddRemarksComponent} from "../../add-remarks/add-remarks.component";
import {PlatformOrderDetailSearchModel} from "../../../../../../shared/models/purchases/purchase-order1688-model";
import {PurchaseOrder1688Service} from "../../../purchase-1688/purchase-1688.service";
import {RootComponent} from "../../../../../../shared/component/root.component";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  providers: [OrderDetailsService, PurchaseOrder1688Service]
})
export class OrderDetailsComponent extends RootComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 6;
  total: number = 1;
  @Input()
  orderDetails: any;

  @Input()
  isEdit: boolean = false;

  @Input()
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number };

  @Input()
  platOrderId: any;
  searchParam: PlatformOrderDetailSearchModel;
  ifhasError: boolean;
  item: any[] = [];

  updateCount: number;

  constructor(private orderDetailsService: OrderDetailsService,
              private modalservice: NgbModal,
              private purchaseOrderService: PurchaseOrder1688Service) {
    super();
  }

  ngOnInit() {
    this.loadData();

  }

  addRemarks(target: any, id: number) {
    let activemodal = this.modalservice.open(AddRemarksComponent, {size: 'sm', backdrop: 'static'});
    activemodal.componentInstance.modalHeader = '添加处理备注';
    activemodal.result.then((result) => {
      if (result != undefined) {

        console.log(result);
        this.purchaseOrderService.PlatformOrderProcessingComplete(id.toString(), result).subscribe(data => {
          console.log(data);
          this.alertMessage("标记处理完成!");
          $(target).html('处理完成').removeClass('btn-danger').addClass('btn-success')
            .attr('disabled', 'true');
        });

      }
    }, () => {
    })
  }

  loadData() {
    this.total = this.orderDetails.items.length;
    this.orderDetails.items.forEach(element => {
      element.isEdit = false;
    });
  }

  pageChanged(pn: number) {
    this.currentPage = pn;
    this.loadData();
  }


  openDetail(SkuDetail: any, id: number) {

    this.purchaseOrderService.GetPlatformOrderSkuArrivalGoodsDetailQuery(id).subscribe(data => {
      this.item = data.content;
    });

    let modal = this.modalservice.open(SkuDetail, {size: 'lg', backdrop: 'static'});
  }


  editBuyCount(item) {
    item.isEdit = !item.isEdit;

    if (this.updateCount != null) {
      if (this.updateCount == 0) {
        this.error("购买数量不能为0");
        this.updateCount = null;
        return;
      }

      this.confirm("确定修改下单数量?", () => {
        this.purchaseOrderService.updateBuyCount(item.purchasePlatformOrdersId, item.id, this.updateCount).subscribe(data => {
          this.alertMessage("修改下单数量成功!");

          this.orderDetails.items.forEach(element => {
            if (element.id == item.id) {
              element.buyCount = this.updateCount;
            }
          });
          this.updateCount = null;
        }, this.handleError);
      })

    }


  }
}
