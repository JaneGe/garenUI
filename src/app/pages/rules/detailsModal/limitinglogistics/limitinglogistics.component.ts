import {Component, OnInit} from '@angular/core';
import {OptionsService} from "../../options.Service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {forEach} from "@angular/router/src/utils/collection";

class LogisticInfoModel { platform: string; stations: string; logistics: string; id: number; }

@Component({
  selector: 'app-limitinglogistics',
  templateUrl: './limitinglogistics.component.html',
  styleUrls: ['./limitinglogistics.component.scss', '../../public.scss']
})
export class LimitinglogisticsComponent implements OnInit {
  PlatformStations: Array<any>=[];
  Stations: string[] = [];
  Platforms: string[] = [];
  Logistics: string[] = [];
  selectedPlatform: string = 'Amazon';
  selectedStation: string='';
  selectedLogistics: string='';
  modalHeader:string='';
  limitinglogistics: LogisticInfoModel[] = [];



  constructor(private _optionsService: OptionsService,
              private activeModal: NgbActiveModal) {
    _optionsService.GetChannelShipppingMethods();
    this.PlatformStations = this._optionsService.PlatformStations;
  }

  ngOnInit() {
    this._optionsService.GetChannelShipppingMethods().subscribe(data => {
      this.PlatformStations = data.content;

      for (const platformInfo of this.PlatformStations){

        const logistics = platformInfo.logisticses;
        this.Platforms.push(platformInfo.platform);     //读取平台
        if (platformInfo.platform == this.selectedPlatform) {    //初始化值
          this.Stations = platformInfo.stations;
          this.selectedStation = this.Stations[0];     //根据平台初值，初始化站点值
          for (const siteShippingMethod of logistics){
            if (this.selectedStation == siteShippingMethod.station) { //根据站点，初始化物流
              this.Logistics = siteShippingMethod.logistics;
            }
          }
        }
      }
      //console.log(this.Platforms);
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  platformChange(value: any) {        //平台改变初始化站点和物流
    this.selectedPlatform = value;
    //console.log(value);
    for (var i = 0; i < this.PlatformStations.length; i++) {
      var obj = this.PlatformStations[i];
      if (obj.platform == value) {
        this.Stations = obj.stations;
      }
    }
    if (this.Stations.length != 0) {    //根据平台判断有没有站点
      this.selectedStation = this.Stations[0];
    }
    else {
      this.selectedStation = 'Amazon';  //没有站点的用平台判断初始化
    }
    this.stationChange(this.selectedStation);
  }

  stationChange(value: any) {     //站点改变初始化物流
    this.selectedStation = value;
    this.Logistics=[];
    this.PlatformStations.forEach(v=>{
      if(v.platform==this.selectedPlatform){
        let arr:Array<any>=v.logisticses;
        arr.forEach(v1=>{
          if(v1.station==this.selectedStation){
            this.Logistics=v1.logistics;
          }
        })
      }
    });
    // this.PlatformStations.filter(v=>v.platform=this.selectedPlatform).forEach(v=>{
      // let logistics:Array<any>=v.logisticses;
      // logistics.forEach(v1=>{
      //   if(v1.station==this.selectedStation){
      //     this.Logistics=v1.logistics;
      //     console.log(v1.logistics);
      //   }
      // });
      // console.log(v);
    // });
    // for (var i = 0; i < this.PlatformStations.length; i++) {
    //   var obj = this.PlatformStations[i];
    //   var logistics = obj.logisticses;
    //   if (obj.platform == 'Amazon') {               //直接根据平台初始化物流
    //     this.Logistics = obj.logisticses;
    //   }
    //   for (var a = 0; a < logistics.length; a++) {
    //     if (this.selectedStation == logistics[a].station) {
    //       this.Logistics = logistics[a].logistics;
    //     }
    //   }
    //   this.selectedLogistics = '';
    // }
    //console.log(this.Logistics);
  }

  choose(value: any) {
    const tempobj: LogisticInfoModel = {
      platform: '123',
      stations: '123',
      logistics: '123',
      id: 0
    };
    if (value != '请选择') {
      const temp = value.split('+');
      tempobj.platform = temp[0];
      tempobj.stations = temp[1];
      tempobj.logistics = temp[2];
      tempobj.id = temp[3];


      let existItem = this.limitinglogistics.filter(m=>m.id == tempobj.id);

      if(existItem.length == 0){
        this.limitinglogistics.push(tempobj);
      }
    }
  }

  del(item: any) {
    for (var i = 0; i < this.limitinglogistics.length; i++) {
      let obj = this.limitinglogistics[i];
      if (obj.platform == item.platform && obj.stations == item.stations && obj.logistics == item.logistics) {
        this.limitinglogistics.splice(i, 1);
      }
    }
  }

  OnSubmit() {
    this.activeModal.close(this.limitinglogistics);
  }
}

