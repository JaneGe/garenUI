import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-printLabel',
  templateUrl: './printLabel.component.html',
  styleUrls: ['./printLabel.component.scss']
})

export class PrintLabelComponent implements OnInit {
  public codeStyle:string = "10*30 二维条码";
  constructor(private printModal: NgbActiveModal) {}

  ngOnInit() { }

  closeModal() {
    this.printModal.close();
  }

  onSelect($event) {
    if($event.innerText != '') {
      this.codeStyle = $event.innerText;
    }
    console.log($event.innerText);
  }
}
