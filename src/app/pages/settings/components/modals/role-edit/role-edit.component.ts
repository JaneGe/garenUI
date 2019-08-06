import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TreesService } from 'app/pages/settings/components/modals/role-edit/trees.service';
import { GlobalService } from 'app/shared/services/global.service';
import {RootComponent} from "../../../../../shared/component/root.component";

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss'],
  providers: [TreesService]
})
export class RoleEditComponent extends RootComponent implements OnInit {
  menu: Array<any> = [];
  operationMenu: Array<any> = [];
  pageDetail;
  isNextStep: number = 0;
  roleId:any;
  allCheck:false;

  constructor(private activeModal: NgbActiveModal,
    private _TreesService: TreesService,
    public _globalService: GlobalService) {
    super();
  }


  ngOnInit() {
    this._pageDetail();
    this.getMenus();
    if(this.roleId){
      this.GetRoleById();
    }
  }

  getMenus() {
    this._TreesService.ResourceQuery(this.roleId).subscribe(data => {
      this.menu = data.content;
      this.getOperationbyMenu();
    }, this.handleError);
  }

  checkAll(target:any){
    for(let i=0;i<this.pageDetail.items.length;i++){
      this.pageDetail.items[i].hasPermission=target.checked;
    }
  }

  // deleteMenus() {
  //   this._TreesService.DeleteRoleInfoById(this.roleId).subscribe(data => {
  //     this.menu = data.content;
  //     this.getOperationbyMenu();
  //   }, this.handleError);
  // }

  GetRoleById() {
    this._TreesService.GetRoleById(this.roleId).subscribe(data => {
      this.roleName = data.content.name;
      this.roleDetail = data.content.description;
      this.getOperationbyMenu();
    }, this.handleError);
  }

  getOperationbyMenu() {
    let data={
      Resources:this.menu,
      RoleId:this.roleId
    };
    this._TreesService.GetOperationByResource(data).subscribe(data => {
      this.operationMenu = data.content;
    }, this.handleError);
  }

  _pageDetail() {
    this._globalService.permission$.subscribe(permission => {
      this.pageDetail = permission;
    }, error => {
      console.log('Error: ' + error);
    });
  }

  closeModal() {
    this.activeModal.close();
  }


  saveRole(){
    var datas={
      RoleId:this.roleId,
      RoleName:this.roleName,
      RoleDescription:this.roleDetail,
      Resources:this.menu,
      Opearations:this.operationMenu
    };
    this._TreesService.SaveRoleAndResource(datas).subscribe(data => {
     this.alertMessage("保存成功!");
     this.closeModal();
    }, this.handleError);
  }
  prevStep() {
    if (this.isNextStep > 0)
      this.isNextStep--
  }

  nextStep(item) {
    if (this.isNextStep < 2)
      this.isNextStep++
    // for (let index in item) {
    //   if (!item[index].isChecked) {
    //     item.splice(item.indexOf(item[index]), 1);
    //     this.nextStep(item);
    //     break;
    //   }
    //   if (item[index].children) {
    //     this.nextStep(item[index].children);
    //   }
    // }
    this.getOperationbyMenu();
    console.log(this.menu);//点击下一步的json数据
  }

  roleName: string = '';
  roleDetail: string = '';
}
