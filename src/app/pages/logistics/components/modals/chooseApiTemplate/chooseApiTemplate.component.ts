import { Component, OnInit, Input, animate, style, transition, trigger, state, HostListener } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-chooseApiTemplate',
  templateUrl: './chooseApiTemplate.component.html',
  styleUrls: ['./chooseApiTemplate.component.scss'],
  animations: [
    trigger('imgMove', [
      state('off', style({ 'display': 'none', 'z-index': '0', 'transform': 'translateX(0)' })),
      state('prev', style({ 'z-index': '1','transform': 'translateX(-100%)' })),
      state('next', style({ 'z-index': '2', 'transform': 'translateX(100%)' })),
      state('next1', style({ 'z-index': '2', 'transform': 'translateX(200%)' })),
      state('next2', style({ 'z-index': '2', 'transform': 'translateX(300%)' })),
      state('next3', style({ 'z-index': '2', 'transform': 'translateX(400%)' })),
      state('next4', style({ 'z-index': '2', 'transform': 'translateX(500%)' })),
      state('next5', style({ 'z-index': '2', 'transform': 'translateX(600%)' })),
      state('on', style({ 'z-index': '3', 'transform': 'translateX(0)' })),
      transition('prev=>on', [
        animate('0.3s ease-in')
      ]),
      transition('next=>on', [
        animate('0.3s ease-in')
      ]),
      transition('next1=>next', [
        animate('0.3s ease-in')
      ]),
      transition('next2=>next1', [
        animate('0.3s ease-in')
      ]),
      transition('next3=>next2', [
        animate('0.3s ease-in')
      ]),
      transition('next4=>next3', [
        animate('0.3s ease-in')
      ]),
      transition('next5=>next4', [
        animate('0.3s ease-in')
      ]),
      transition('on=>prev', [
        animate('0.3s ease-in')
      ]),
      transition('on=>next', [
        animate('0.3s ease-in')
      ]),
      transition('next=>next1', [
        animate('0.3s ease-in')
      ]),
      transition('next1=>next2', [
        animate('0.3s ease-in')
      ]),
      transition('next2=>next3', [
        animate('0.3s ease-in')
      ]),
      transition('next3=>next4', [
        animate('0.3s ease-in')
      ]),
      transition('next4=>next5', [
        animate('0.3s ease-in')
      ])
    ])
  ]
})
export class ChooseApiTemplateComponent implements OnInit {
  @Input()
  bill;

  public current;

  prevState:boolean = false;

  nextState:boolean = true;

  click_bill;

  isChoose:number;

  constructor(private chooseModal: NgbActiveModal,
              private modalService: NgbModal,) {
    this.current = 0;
  }

  public ImgState(index) {
    if (this.bill && this.bill.length) {
      if (this.current === 0) {
        return index === 0 ? 'on' :
          index === 1 ? 'next' :
            index === 2 ? 'next1' :
              index === 3 ? 'next2' :
                index === 4 ? 'next3' :
                  index === 5 ? 'next4' :
                    index === 6 ? 'next5' :'off';
      }
      switch (index - this.current) {
        case 0:
          return 'on';
        case 1:
          return 'next';
        case 2:
          return 'next1';
        case 3:
          return 'next2';
        case 4:
          return 'next3';
        case 5:
          return 'next4';
        case 6:
          return 'next5';
        case -1:
          return 'prev';
        default:
          return 'off';
      }
    } else {
      return 'off';
    }
  }
  public Next() {
    if(this.current === this.bill.length - 7){
      this.prevState = true;
      this.nextState = false;
    }else{
      this.prevState = true;
      this.nextState = true;
    }
    this.current = (this.current + 1) % this.bill.length;
  }
  public Prev() {
    if(this.current === 1){
      this.prevState = false;
      this.nextState = true;
    }else{
      this.prevState = true;
      this.nextState = true;
    }
    this.current = this.current - 1 < 0 ? this.bill.length - 1 : this.current - 1;
  }

  public Change(e) {
    if (e === 'left') {
      this.Next();
    } else if (e === 'right') {
      this.Prev();
    }
  }

  ngOnInit() {
    this.click_bill = this.bill[0];
  }

  chooseBill(i) {
    this.click_bill = this.bill[i];
    this.isChoose = i;
  }

  closeModal() {
    this.chooseModal.close(this.click_bill);
  }

}
