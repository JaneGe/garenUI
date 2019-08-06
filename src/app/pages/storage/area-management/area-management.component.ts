import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WarehouseService} from "../../../shared/services/warehouse-service";
import {RootComponent} from "../../../shared/component/root.component";
import {WarehouseAreaListModel} from "../../../shared/models/warehouses/warehouse-area-list-model";

@Component({
  selector: 'app-area-management',
  templateUrl: './area-management.component.html',
  styleUrls: ['./area-management.component.scss'],
  providers: [WarehouseService]
})
export class AreaManagementComponent extends RootComponent implements OnInit {

  areaItem = [
    {name: 'N区', id: 18, types: ['爆款区'], isLock: false},
    {name: 'M区', id: 18, types: ['爆款区'], isLock: false},
    {name: 'L区', id: 18, types: ['爆款区', '新品区'], isLock: false},
    {name: 'K区', id: 18, types: ['爆款区'], isLock: false},
    {name: 'J区', id: 18, types: ['爆款区'], isLock: false},
    {name: 'I区', id: 18, types: ['爆款区'], isLock: false},
    {name: 'H区', id: 18, types: ['爆款区'], isLock: false},
    {name: 'G区', id: 18, types: ['爆款区'], isLock: false},
    {name: 'F区', id: 18, types: ['爆款区'], isLock: false},
    {name: 'E区', id: 18, types: ['爆款区'], isLock: false},
    {name: 'D区', id: 18, types: ['爆款区'], isLock: false},
    {name: 'C区', id: 18, types: ['爆款区'], isLock: false},
    {name: 'B区', id: 18, types: ['爆款区'], isLock: false},
    {name: 'A区', id: 18, types: ['爆款区'], isLock: false},
  ];
  areas: WarehouseAreaListModel[] = [];
  warehouseId;

  constructor(private routeInfo: ActivatedRoute,
              private warehouyseService: WarehouseService) {
    super();
  }

  ngOnInit() {
    this.warehouseId = this.routeInfo.snapshot.params['id'];
    this.loadAreas();
  }

  loadAreas() {
    if (this.warehouseId == null) {
      return;
    }
    this.warehouyseService.getWarehouseAreas(this.warehouseId).subscribe(data => {
      this.areas = data.content;
    }, this.handleError);
  }

  lockArea(item: WarehouseAreaListModel) {
    console.info(item);
    this.warehouyseService.lockArea(item.warehouseId, item.id).subscribe(res => {
      this.alertMessage("锁定成功");
      this.loadAreas();
    }, this.handleError);
  }

  unlockArea(item: WarehouseAreaListModel) {
    this.warehouyseService.unlockArea(item.warehouseId, item.id).subscribe(res => {
      this.alertMessage("解锁成功");
      this.loadAreas();
    }, this.handleError);
  }
}
