import { Component, OnInit, Input } from '@angular/core';
import { RootComponent } from '../../../../shared/component/root.component';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss']
})
export class ReportModalComponent extends RootComponent implements OnInit {
  @Input()
  modalHeader: string;
  result: { reason: string, operateKind: string, num: string } = { reason: '无', operateKind: '', num: '' };
  operateKind: string = '0';
  num: string = '';
  constructor(private activaModal: NgbActiveModal) { super(); }
  report:any[] = [];
  ngOnInit() {
  }
  closeModal() {
    this.activaModal.close();
  }
  isUnsignedInteger(a) {
    var reg = /^\+?[1-9][0-9]*$/
    if (!reg.test(a) && a != 0) {
      this.error("只能输入正整数");
      return false;
    }
  }
  onSubmit(reason: any) {
    if (this.num == '' || this.num == '0') { this.error("报损报溢值不能为0或空!") }
    else {
      if (reason != '') { this.result.reason = reason; }
      this.result.operateKind = this.operateKind;
      this.result.num = this.num;
      this.activaModal.close(this.result);
    }
  }
}
