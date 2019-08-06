import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { SkuService } from "../../../../../shared/services/sku-service";
import { RootComponent } from "../../../../../shared/component/root.component";
import { SkuDeclaration, SkuDetailModel } from "../../../../../shared/models/products/sku-detail-model";
import { OrderService } from "../../../../../shared/services/order-service";

@Component({
  selector: 'app-completionDeclarationModal',
  templateUrl: './completionDeclarationModal.component.html',
  styleUrls: ['./completionDeclarationModal.component.scss'],
  providers: [SkuService, OrderService]
})

export class CompletionDeclarationModalComponent extends RootComponent implements OnInit {

  @Input()
  orderLineTitle: string;
  @Input()
  skuId: number;
  @Input()
  orderId: number;


  skuDetail: SkuDetailModel = <SkuDetailModel>{};

  declaration: SkuDeclaration = <SkuDeclaration>{};

  constructor(private completionModel: NgbActiveModal,
    private orderService: OrderService,
    private skuService: SkuService) {
    super();
  }

  ngOnInit() {
    this.skuService.getSkuDetail(this.skuId).subscribe(data => {
      this.skuDetail = data.content;
      this.declaration = this.skuDetail.declaration;
    }, e => this.handleError(e));
  }

  saveDeclaration() {
    let pData = <any>{};
    pData.orderId = this.orderId;
    pData.skuId = this.skuId;
    pData.declaration = {
      chineseName: this.declaration.chineseName,
      englishName: this.declaration.englishName,
      declaredValue: this.declaration.declaredValue,
      hsCode: this.declaration.hsCode
    };


    this.orderService.saveOrderLineDeclaration(this.orderId, pData).subscribe(data => {

      this.alertMessage('保存成功');
      this.completionModel.close();
    }, this.handleError);

  }

  closeModal() {
    this.completionModel.dismiss();
  }
}
