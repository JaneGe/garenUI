import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-print-goods-bills',
  templateUrl: './print-goods-bills.component.html',
  styleUrls: ['./print-goods-bills.component.scss']
})

export class PrintGoodsBillsComponent implements OnInit {

  goodsList = [
    { id: 1, text: 'DGHBS00001' },
    { id: 2, text: 'DGHBS00002' },
    { id: 3, text: 'DGHBS00003' },
    { id: 4, text: 'DGHBS00004' },
    { id: 5, text: 'DGHBS00005' },
  ];

  constructor(private printModal: NgbActiveModal) { }

  ngOnInit() { }

  closeModal() {
    this.printModal.close();
  }

  onChanged($event) {
    console.log($event.value);
  }
}
