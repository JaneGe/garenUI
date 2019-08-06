import { Component, OnInit } from '@angular/core';
import { MemberService } from "../../../../shared/services/member.service";
import { RoleService } from "../../../../shared/services/role.service";
import { RootComponent } from "../../../../shared/component/root.component";
import { MemberListModel, MemberListRoleModel, UserStatus } from "../../../../shared/models/members/member-list.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MemberModalComponent } from './member-modal.component';
import { SettingPasswordComponent } from '../modals/settingPassword/settingPassword.component';

import { RoleOptionModel } from "../../../../shared/models/roles/role.model";
import * as publicFunction from '../../../../shared/publicFunction/publicFunction';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthorityComponent } from "../../../../shared/component/authority.component";


@Component({
  selector: 'app-members',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
  providers: [MemberService, RoleService]
})
export class MemberListComponent extends AuthorityComponent implements OnInit {
  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;
  items: MemberListModel[] = [];
  userRoles: RoleOptionModel[] = [];
  selectID: number[] = [];
  selectKind: string = 'WorkNo';
  selectStatus: string = '';
  searchContent: string = '';

  types = [{ id: 0, name: '全部' }, { id: 1, name: '正常' }, { id: 2, name: '禁用' }];
  searchType = [{ id: 0, name: '工号' }, { id: 1, name: '姓名' }];

  constructor(private modalService: NgbModal,
    private memberService: MemberService,
    private roleService: RoleService,
    public activerouter: ActivatedRoute, public router: Router
  ) {
    super(activerouter, router);
  }

  ngOnInit() {
    this.loadData();
    this.roleService.getAllRoleOptionList().subscribe(data => {
      this.userRoles = data.content;
      this.userRoles.unshift({ id: null, name: '全部' });
    });
  }

  pageChanged(pN: number): void {
    this.loadData(pN);
  }

  cleanSelected() {
    this.selectKind = '';
    this.searchContent = '';
    this.selectID = [];
    var rolepart = document.getElementById('rolepart').children;
    var kindpart = document.getElementById('kindpart').children;
    for (var i = 0; i < rolepart.length; i++) {
      rolepart[i].setAttribute('style', 'background:none;');
    }
    for (var i = 0; i < kindpart.length; i++) {
      kindpart[i].setAttribute('style', 'background:none;');
    }
    this.reloadData();
  }

  Gosearch() {
    this.reloadData();
  }

/*   addClass(target: any, roleID: number) {
    var index = this.selectID.indexOf(roleID);
    if (index == -1) {
      this.selectID.push(roleID);
      target.style.cssText = "background:#fff;color:#2389F2;";
    }
    else {
      this.selectID.splice(index, 1);
      target.style.cssText = "background:none;";
    }
    this.reloadData();
  }

  addClass1(target: any) {
    publicFunction.toggleSingleClass(target);
    var selectKindName = target.innerText;
    if (selectKindName == '工号') { this.selectKind = 'WorkNo'; }
    if (selectKindName == '姓名') { this.selectKind = 'UserName'; }
    if (selectKindName == '全部') { this.selectStatus = ''; }
    if (selectKindName == '正常') { this.selectStatus = 'Actived'; }
    if (selectKindName == '禁用') { this.selectStatus = 'Disabled'; }
    this.reloadData();
  } */

  loadData(pageNumber: number = 1) {
    this.memberService.getMemberList(pageNumber, this.pageSize, this.selectStatus, this.searchContent, this.selectKind, this.selectID)
      .subscribe(data => {
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

  openAddMemberModal() {
    const activeModal = this.modalService.open(MemberModalComponent,
      { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = '添加成员';
    activeModal.result.then((result) => {
      if (result === 1) {
        this.reloadData();
      }
    }, (reason) => {
      console.info(`Dismissed ${reason}`);
    });
  }

  openEditMemberModal(memberId: number) {
    const activeModal = this.modalService.open(MemberModalComponent, { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.memberId = memberId;
    activeModal.componentInstance.modalHeader = '编辑成员';

    activeModal.result.then((result) => {
      if (result === 1) {
        this.reloadData();
      }
    }, (reason) => {
      console.info(`Dismissed ${reason}`);
    });
  }

  openSettingPasswordModal(memberId: number, workerNo: number, name: string) {
    const activeModal = this.modalService.open(SettingPasswordComponent,
      { size: 'sm', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = '修改密码';
    activeModal.componentInstance.memberId = memberId;
    activeModal.componentInstance.workerNo = workerNo;
    activeModal.componentInstance.name = name;
    activeModal.result.then((result) => {
      if (result === 1) {
        this.reloadData();
      }
    }, (reason) => {
      console.info(`Dismissed ${reason}`);
    });
  }

  setMemberDisable(id: number) {
    this.confirm("确定停用该成员", () => { this.setMemberStatus(id, UserStatus.Disabled); });
  }

  setMemberEnable(id: number) {
    this.confirm("确定启用该成员", () => { this.setMemberStatus(id, UserStatus.Actived); });
  }

  setMemberStatus(memberId: number, newStatus: UserStatus) {
    this.memberService.setMemberStatus(memberId, newStatus).subscribe(data => {
      this.alertMessage("设置成功");
      this.reloadData();
    }, error => {
      if (error.error) {
        this.error(error.error.message);
      } else {
        this.error("网络连接出错");
      }
    });
  }

  getRoleNames(roles: MemberListRoleModel[]) {
    let roleNames: string[] = [];
    for (let role of roles) {
      roleNames.push(role.name);
    }
    return roleNames.join(",");
  }

  onSelect(name, type, value) {
    if (type === 'userRoles') {
      if (value === null) {
        let index = this.selectID.indexOf(value);
        this.selectID.splice(index, 1);
      } else {
        this.selectID = [];
        this.selectID.push(value);
      }
      this.reloadData();
    } else {
      switch (name) {
        case "工号":
          this.selectKind = 'WorkNo';
          break;
        case "姓名":
          this.selectKind = 'UserName';
          break;
        case "全部":
          this.selectStatus = '';
          break;
        case "正常":
          this.selectStatus = 'Actived';
          break;
        case "禁用":
          this.selectStatus = 'Disabled';
          break;
      }
      this.reloadData();
    }
  }
}
