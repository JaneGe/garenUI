import { Component, OnInit, Input } from '@angular/core';
import * as Slide from '../../../../shared/animations/modal-Slide';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-brokerage',
  templateUrl: './edit-brokerage.component.html',
  styleUrls: ['../modal-public.scss', './edit-brokerage.component.scss']
})
export class EditBrokerageComponent implements OnInit {
  @Input()
  modalHeader: string;
  node: any;
  settingValue: string;
  platform: string = '';
  platForms = ['AMZ', 'WISH', 'CDISCOUNT', 'JD', 'SMT'];
  selectedPlatform = '';
  selectedallaccount: boolean = false;
  brokerage = '';
  warningprofit = '';
  info = { id: null, platForm: '', brokerage: '', operator: '六六六', time: '' };
  info1 = { id: null, platForm: '', warningprofit: '', operator: '六六六', time: '' };
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.node = document.getElementById("form").parentNode.parentNode.parentNode;
    Slide.slideIn(this.node);
    this.selectedPlatform = this.platForms[0];
  }
  closeModal() {
    Slide.slideLeft(this.node, this);
  }
  Onsubmit() {
    if (this.settingValue == '佣金') {
      this.info.platForm = this.selectedPlatform;
      this.info.brokerage = this.brokerage;
      this.info.time = new Date().toLocaleDateString();
      Slide.slideRight(this.node, this, this.info);
    }
    if (this.settingValue == '利润警戒值') {
      this.info1.platForm = this.selectedPlatform;
      this.info1.warningprofit = this.warningprofit;
      this.info1.time = new Date().toLocaleDateString();
      Slide.slideRight(this.node, this, this.info1);
    }
  }
  selectAllaccount() {
    if (this.selectedallaccount == false) {
      this.selectedallaccount = true;
    }
    else {
      this.selectedallaccount = false;
    }
  }
}
