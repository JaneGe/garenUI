import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-supply-info-head',
  templateUrl: './supply-info-head.component.html',
  styleUrls: ['../../public.scss','./supply-info-head.component.scss']
})
export class SupplyInfoHeadComponent implements OnInit {
  @Input() status:Array<any>;
  @Input() searchKind:Array<any>;
  @Output()  eimtstatu:EventEmitter<string>=new EventEmitter<string>();
  @Output()  eimtsearchKind:EventEmitter<string>=new EventEmitter<string>();
  selectedstatu:string;
  selectedsearchKind:string;
  constructor() { }

  ngOnInit() {
    this.selectedstatu=this.status[0];
    this.selectedsearchKind=this.searchKind[0];
  }
  selectStatu(selectedstatu:any){
    this.selectedstatu=selectedstatu;
    this.eimtstatu.emit(selectedstatu);
  }
  selectsearchKind(selectedsearchKind){
    this.selectedsearchKind=selectedsearchKind;
    this.eimtsearchKind.emit(selectedsearchKind);
  }
}
