import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-img-preview-modal',
  templateUrl: './img-preview-modal.component.html',
  styleUrls: ['./img-preview-modal.component.scss']
})

export class ImgPreviewModalComponent implements OnInit {
  imgItems = [
    {
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2413568915,3713211463&fm=27&gp=0.jpg',
      checked: true
    }, {
      src: 'http://img11.360buyimg.com/n0/g10/M00/14/0C/rBEQWVFnuPYIAAAAAACxx3hrPywAAD-twDDs_YAALHf050.jpg',
      checked: false
    }, {
      src: 'http://img11.360buyimg.com/popWaterMark/5869/6555ed48-4fbf-4e1b-81b1-5e2387280543.jpg',
      checked: false
    }, {
      src: 'http://img11.360buyimg.com/popWaterMark/5869/6555ed48-4fbf-4e1b-81b1-5e2387280543.jpg',
      checked: false
    }, {
      src: 'http://img11.360buyimg.com/popWaterMark/5869/6555ed48-4fbf-4e1b-81b1-5e2387280543.jpg',
      checked: false
    }, {
      src: 'http://img11.360buyimg.com/popWaterMark/5869/6555ed48-4fbf-4e1b-81b1-5e2387280543.jpg',
      checked: false
    }, {
      src: 'http://img11.360buyimg.com/popWaterMark/5869/6555ed48-4fbf-4e1b-81b1-5e2387280543.jpg',
      checked: false
    }, {
      src: 'http://image.suning.cn/content/catentries/00000000010857/000000000108574148/fullimage/000000000108574148_1f.jpg',
      checked: false
    }, {
      src: 'http://img10.360buyimg.com/n0/g8/M01/11/09/rBEHZ1DVRiUIAAAAAASNGaRIhzAAADYLQGBBncABI0x115.jpg',
      checked: false
    }, {
      src: 'http://img14.360buyimg.com/popWaterMark/jfs/t244/316/1206501902/135685/1cdb6214/53f71d93Nd4f3e7d1.jpg',
      checked: false
    }, {
      src: 'http://img38.ddimg.cn/13/28/1054508908-1_u_1.jpg',
      checked: false
    }, {
      src: 'http://img11.360buyimg.com/popWaterMark/5869/6555ed48-4fbf-4e1b-81b1-5e2387280543.jpg',
      checked: false
    }, {
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2413568915,3713211463&fm=27&gp=0.jpg',
      checked: false
    }, {
      src: 'http://image.suning.cn/content/catentries/00000000010857/000000000108574148/fullimage/000000000108574148_1f.jpg',
      checked: false
    }, {
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2413568915,3713211463&fm=27&gp=0.jpg',
      checked: false
    }, {
      src: 'http://image.suning.cn/content/catentries/00000000010857/000000000108574148/fullimage/000000000108574148_1f.jpg',
      checked: false
    }, {
      src: 'http://image.suning.cn/content/catentries/00000000010857/000000000108574148/fullimage/000000000108574148_1f.jpg',
      checked: false
    }, {
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2413568915,3713211463&fm=27&gp=0.jpg',
      checked: false
    }, {
      src: 'http://image.suning.cn/content/catentries/00000000010857/000000000108574148/fullimage/000000000108574148_1f.jpg',
      checked: false
    },
  ]

  checkedImg;

  constructor(private chooseModal: NgbActiveModal,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.checkedImg = this.imgItems[0];
    this.checkedItem(0);
  }

  closeModal() {
    this.chooseModal.close();
  }

  checkedItem(index) {
    this.imgItems.forEach(element => {
      element.checked = false;
    });
    this.imgItems[index].checked = true;
    this.checkedImg = this.imgItems[index];
  }

}
