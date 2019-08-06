import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-wish-details',
  templateUrl: './wish-details.component.html',
  styleUrls: ['./wish-details.component.scss']
})
export class WishDetailsComponent implements OnInit {
  isSwitch1: boolean = true;
  isSwitch2: boolean = true;
  isSwitch3: boolean = true;
  infos = [
    ['你好！有什么可以帮到你吗？你好！有什么可以帮到你吗？你好！有什么可以帮到你吗？你好！有什么可以帮到你吗？你好！有什么可以帮到你吗？你好！有什么可以帮到你吗？你好！有什么可以帮到你吗？你好！','你好！有什么可以帮到你吗？'],
    ['你好！我想了解一下德玛特'],
    ['你想了解哪一方面？'],
    ['业务'],
    ['德玛特是一家电商公司，业务方面主要是外贸...'],
    ['贵公司地址在哪里'],
    // ['位于深圳市，龙岗区'],
    // ['现在团队规模有多大？'],
    // ['200多号人'],
    // ['有进一步扩张的计划吗？'],
    // ['有，现在为上市做准备，所以需要扩张到1000多人'],
    // ['好的'],
  ]
  effectProduct = [
    { imgSrc: '', name: 'Restoring Large', productId: '5508464adfa1313', SKU: 'KUI22',size: 'XXXXXL', totalMoney: '$30', color: 'black', city: 'Nevada', state: '运输中', updateData: '1 days ago', logisticsInfo: 'Wish is tracking', deliverGoods: '5 days ago', drawback: '2018年4月18日', spentTime: '20-26 Days' }
  ]
  productDetails = [
    { img: '12', productId: '5508464adfa1313', SKU: 'KUI22', size: 'XXXXL', color: 'black', cost: '$18.70', fee: '$1.70', num: '1', totalMoney: '$20.76', city: 'Nevada'}
  ]
  drawbackDetails = [
    { data: '01-18-2018 10:58 UTC', num: '1', cost: '$20.04', reason: 'shipment beyond latest deliver date'}
  ]
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  ngDoCheck() {
    
  }
  ngAfterContentInit() {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    
  }
  ngAfterContentChecked() {
    
  }
  ngAfterViewInit() {
    
  }
  ngAfterViewChecked() {
  }
  scrollBottom() {
    // 让滚动条固定在消息窗口底部
    let _this = document.getElementById('scrollbar')
    _this.scrollTop = _this.scrollHeight
    console.log(_this.scrollTop + 'ok')
    console.log(_this.scrollHeight )
  }
  sendInfo(newInfo: string) {
    this.scrollBottom()
    let len = this.infos.length  
    if (len%2 === 0) {
      let arr = []
      arr.push(newInfo)
      this.infos.push(arr)
    } else {
      this.infos[len-1].push(newInfo)
    }
  }
  changeShowInfo() {
    $('.info-container')[0].offsetHeight > 780
  }
  closeModal() {
    this.activeModal.close()
  }
}
