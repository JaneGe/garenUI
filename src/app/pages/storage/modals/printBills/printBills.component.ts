import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as JQuery from "jquery";

@Component({
  selector: 'app-printBills',
  templateUrl: './printBills.component.html',
  styleUrls: ['./printBills.component.scss']
})
export class PrintBillsComponent implements OnInit {

  pdfSrc = "assets/W-1009.pdf";

  private timer;

  constructor(private printModal: NgbActiveModal) {
  }

  ngOnInit() {
    /* this.printPDF();
    this.timer = setInterval(()=>{
      this.closeModal();
    },2000) */
  }

  printPDF(){
    /* let newWin = window.open("assets/W-1009.pdf");
    newWin.print();
    this.timer = setInterval(()=>{
      newWin.close();
    },2000) */
    ($('.ifr') as any).print();
  }

  ngOnDestroy(){
    if(this.timer){
      clearInterval(this.timer);
    }
  }

  closeModal() {
    this.printModal.close();
  }
}
