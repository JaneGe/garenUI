import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RootComponent} from "../../../../shared/component/root.component";
import {RoleService} from "app/shared/services/role.service";
import {RoleListModel} from "../../../../shared/models/roles/role-list.model";
import {RoleModalComponent} from "./role-modal.component";
import swal from 'sweetalert2';
import { RoleEditComponent } from 'app/pages/settings/components/modals/role-edit/role-edit.component';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../../shared/component/authority.component";

@Component({
  selector: 'app-rolelist',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  providers: [RoleService]
})
export class RoleListComponent extends AuthorityComponent implements OnInit {

  pageSize: number = 10;
  pageNumber: number = 1;
  total: number = 100;
  items: RoleListModel[] = [];


  constructor(private modalService: NgbModal,
              private roleService: RoleService,public activerouter: ActivatedRoute,public  router:Router
  ) {
    super(activerouter,router);
  }

  ngOnInit() {


    this.loadData();
  }


  openAddRoleModal() {
    const activeModal = this.modalService.open(RoleModalComponent,
      {size: 'lg', windowClass: 'large-lmt-modal', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '添加角色';
    activeModal.result.then((result) => {
      if (result === 1) {
        this.reloadData();
      }
    }, (reason) => {
      console.info(`Dismissed ${reason}`);
    });
  }


  openEditRoleModal(roleId: number) {
    const activeModal = this.modalService.open(RoleModalComponent,
      {size: 'lg', windowClass: 'large-lmt-modal', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '编辑角色';
    activeModal.componentInstance.roleId = roleId;
    activeModal.result.then((result) => {
      if (result === 1) {
        this.reloadData();
      }
    }, (reason) => {
      console.info(`Dismissed ${reason}`);
    });
  }


  deleteRole(roleId: number) {
    this.confirm("确定删除角色",() => {
      this.roleService.deleteRole(roleId).subscribe(data => {
        this.reloadData();
        //this.alertMessage("删除成功");
        swal({
          title: '成功!',
          text: "删除成功",
          type: 'success',
          confirmButtonText: '关闭'
        })
      }, this.handleError);
    });
  }

  pageChanged(pN: number): void {
    this.loadData(pN);
  }

  loadData(pageNumber: number = 1) {

    this.roleService.getRoleList(pageNumber, this.pageSize).subscribe(data => {
      const pageData = data.content;
      this.items = pageData.items;
      this.pageNumber = pageData.pageInfo.pageIndex + 1;
      this.pageSize = pageData.pageInfo.pageSize;
      this.total = pageData.pageInfo.totalCount;


    }, this.handleError);
  }

  reloadData() {
    this.loadData(this.pageNumber);
  }

  addRole(roleId:any) {
    const modal = this.modalService.open(RoleEditComponent,
      { size: 'lg', backdrop: 'static' });
    modal.componentInstance.roleId = roleId;
    modal.result.then((result) => {
        this.reloadData();
    }, (reason) => {
    });
  }

}
