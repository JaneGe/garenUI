import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DepartmentModalComponent } from "./department/department-modal.component";
import { DepartmentService } from "../../../../shared/services/department.service";
import { RootComponent } from "../../../../shared/component/root.component";
import { DepartmentListModel } from "../../../../shared/models/departments/department-list.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../../shared/component/authority.component";

@Component({
  selector: 'department-tree-view',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
  providers: [DepartmentModalComponent, DepartmentService],
})

export class DepartmentListComponent extends AuthorityComponent implements OnInit {
  pageSize: number = 100;
  pageNumber: number = 1;
  total: number = 100;
  items: DepartmentListModel[] = [];

  treesItem = [];
  departmentState: string;

  constructor(private modalService: NgbModal,
    private departmentService: DepartmentService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
  }

  ngOnInit() {
    this.loadData();
  }

  getTreesState(info) {
    if (info) {
      this.reloadData();
    }
  }

  openAddDepartmentModal() {
    const activeModal = this.modalService.open(DepartmentModalComponent,
      { size: 'lg', windowClass: 'large-lmt-modal', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = '添加部门';
    activeModal.result.then((result) => {
      if (result === 1) {
        this.reloadData();
      }
    }, (reason) => {
      console.info(`Dismissed ${reason}`);
    });
  }


  /* openEditDepartmentModal(departmentId: number) {
    const activeModal = this.modalService.open(DepartmentModalComponent,
      { size: 'lg', windowClass: 'large-lmt-modal', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = '编辑部门';
    activeModal.componentInstance.departmentId = departmentId;
    activeModal.result.then((result) => {
      if (result === 1) {
        this.reloadData();
      }
    }, (reason) => {
      console.info(`Dismissed ${reason}`);
    });
  } */


  /* deleteDepartment(departmentId: number) {
    alert('sas');
    this.departmentService.deleteDepartment(departmentId).subscribe(data => {
      this.reloadData();
      this.alertMessage('删除成功');
    }, this.handleError)
  }
 */

  /* pageChanged(v): void {
    this.loadData(v);
  } */

  loadData(pageNumber: number = 1) {
    this.departmentService.getAllDepartmentList().subscribe(data => {
      this.items = data.content;
      
      this.mergeDepartment(this.items);
      for (let index of this.items) {
        if (index.name === '董事长') {
          this.treesItem = [];
          this.treesItem.push(index);
        }
      }
    }, this.handleError);
  }

  reloadData() {
    this.loadData(this.pageNumber);
  }

  mergeDepartment(item: Array<any>) {
    for (let index of item) {
      let parentId = index.parentId;
      for (let i of item) {
        if (i.id === parentId) {
          i.children.push(index);
        }
      }
    }
  }
}
