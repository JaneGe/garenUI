import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {
  barType: Boolean = true
  twoBarType: Boolean = false
  private timer
  constructor(private printModal: NgbActiveModal) { }
  @Input()
  code: string

  ngOnInit() { }

  ngDoCheck() {
    if (this.barType) {
      this.getBarCode()
    } else if (this.twoBarType) {
      this.getQRcode()
    }
  }

  // 切换条形码/二维码
  chooseBarType() {
    this.barType = true
    this.twoBarType = false
  }

  chooseTwoBarType() {
    this.barType = false
    this.twoBarType = true
  }

  // 是否打印
  printPDF() {
    ($('.print-content') as any).print();
    this.closeModal()
  }

  closeModal() {
    this.printModal.close()
  }

  // 生成二维码
  getQRcode() {
    ($("#qrcode") as any).empty();
    ($("#qrcode") as any).qrcode({
      render: "table",
      width: 90,
      height: 90,
      text: this.code
    });
  }

  // 生成条形码
  getBarCode() {
    var value = this.code;
    var btype = 'code128';
    var renderer = 'css';
    var settings = {
      output: renderer
    };
    ($("#barCode") as any).html("").show().barcode(value, btype, settings)
  }
}
