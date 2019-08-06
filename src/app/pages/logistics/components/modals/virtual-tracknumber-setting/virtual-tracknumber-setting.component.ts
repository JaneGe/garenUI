import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RootComponent } from 'app/shared/component/root.component';
import {ShippingMethodService} from "../../../../../shared/services/shipping-method-service";

@Component({
  selector: 'app-virtual-tracknumber-setting',
  templateUrl: './virtual-tracknumber-setting.component.html',
  styleUrls: ['./virtual-tracknumber-setting.component.scss'],
  providers:[ShippingMethodService]
})
export class VirtualTracknumberSettingComponent extends RootComponent implements OnInit {
  @Input()
  ssId: number;
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };

  items: any[] = [];
  constructor(private activeModal: NgbActiveModal,
              private shippingMethodService: ShippingMethodService) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  closeModal() {
    this.activeModal.close();
  }
  loadData(pageIndex = 1){
    this.shippingMethodService.fakeTrackingNumberList(this.ssId, pageIndex, this.PageInfo.pageSize).subscribe(data => {
      this.items = data.content.items;
      this.PageInfo.pageSize = data.content.pageInfo.pageSize;
      this.PageInfo.pageIndex = data.content.pageInfo.pageIndex + 1;
      this.PageInfo.totalCount = data.content.pageInfo.totalCount;
    });
  }
  reloadData(){
    this.loadData(this.PageInfo.pageIndex);
  }
  onSelect(event, value) {

  }

  delete(index) {
    this.confirm("确定删除?!", () => {
        this.shippingMethodService.deleteFakeTrackingNumber(index).subscribe(data=>{
          this.reloadData();
        }, this.handleError)
    });
  }

  onQuery(){
     this.loadData();
  }

  pageChanged(pN: number): void {
       this.loadData(pN);
  }

}
