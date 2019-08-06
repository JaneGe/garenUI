import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PackageReturnService} from "../../../../shared/services/package-return.service";
import {RootComponent} from "../../../../shared/component/root.component";

@Component({
  selector: 'app-setting-return-reason',
  templateUrl: './setting-return-reason.component.html',
  styleUrls: ['./setting-return-reason.component.scss'],
  providers: [PackageReturnService]
})

export class SettingReturnReasonComponent extends RootComponent implements OnInit {
  @Input()
  packageReturnRecordId: number;
  note: string = null;

  constructor(private modal: NgbActiveModal,
              private packageReturnService: PackageReturnService) {
    super();
  }


  ngOnInit() {
    if (this.packageReturnRecordId != null) {
      this.packageReturnService.getReturnRecordNote(this.packageReturnRecordId).subscribe(data => {
        this.note = data.content;
      }, this.handleError);
    }

  }

  closeModal() {
    this.modal.dismiss();
  }

  saveData() {
    if (this.packageReturnRecordId == null) {
      return;
    }
    if (this.isNullOrEmpty(this.note)) {
      this.error('备注不能为空');
      return;
    }
    let postData = {
      recordId: this.packageReturnRecordId,
      note: this.note
    };

    this.packageReturnService.addReturnRecordNote(postData).subscribe(data => {
      this.alertMessage('保存成功');
      this.modal.close();
    }, this.handleError);

  }
}
