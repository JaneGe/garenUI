import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RootComponent} from "../../../../../shared/component/root.component";
import {PackageService} from "../../../../../shared/services/package-search-service";

@Component({
  selector: 'app-edit-weight-modal',
  templateUrl: './edit-weight-modal.component.html',
  styleUrls: ['./edit-weight-modal.component.scss'],
  providers: [PackageService]
})
export class EditWeightModalComponent extends RootComponent implements OnInit {

  editShipWeight: number;
  oldEditShipWeight: number;
  packageId: number;

  constructor(private activeModal: NgbActiveModal,
              private packageSearchService: PackageService) {
    super();
  }

  ngOnInit() {
    this.oldEditShipWeight= this.editShipWeight;
  }

  closeModal() {
    this.activeModal.close();
  }

  editeWeight() {
    if( this.oldEditShipWeight== this.editShipWeight)
    {
      this.error("与原始重量一致,请重新输入！");
      return;
    }
    if (this.editShipWeight == null || this.editShipWeight.toString().trim()=='') {
      this.error("请输入发货重量");
      return;
    }
    this.confirm('确定修改该包裹重量？', () => {
      this.packageSearchService.editPackageShipWeight(this.packageId,this.editShipWeight ).subscribe(data => {
        this.alertMessage('修改成功');
        this.activeModal.close(true);
      }, this.handleError);
    });
  }
}
