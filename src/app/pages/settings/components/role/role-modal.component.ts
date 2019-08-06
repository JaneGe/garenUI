import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../../../shared/services/role.service";
import {RoleModel} from "../../../../shared/models/roles/role.model";
import {PermissionService} from "../../../../shared/services/permission.service";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../../../../shared/models/api.response.basemodel";
import {ResourceModel, PermissionModel} from "../../../../shared/models/roles/permission.list.model";
import {RootComponent} from "../../../../shared/component/root.component";
import swal from 'sweetalert2';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss'],
  providers: [RoleService, PermissionService]
})
export class RoleModalComponent extends RootComponent implements OnInit {
  @Input()
  roleId?: number;

  form: FormGroup;
  roleInfo: RoleModel;

  submitted: boolean = false;

  allResources: ResourceModel [] = [];
  selectedPermissionIds: number[] = [];
  selectedResourceIds: number[] = [];
  allResourceList: ResourceModel[] = [];

  constructor(private activeModal: NgbActiveModal,
              fb: FormBuilder,
              private roleService: RoleService,
              private permissionService: PermissionService) {
    super();

    this.roleInfo = new RoleModel();

    this.form = fb.group({
      'roleName': ['', Validators.compose([Validators.required, Validators.maxLength(16)])],
      'description': ['', Validators.compose([Validators.maxLength(256)])],
    });

    this.permissionService.getAllPermissions().subscribe(data => {
      this.allResources = data.content;
      console.log(this.allResources);
      
      for (const resource of this.allResources) {
        this.allResourceList.push(resource);
        this.addChildrenResourceToList(resource);
      }


      if (this.roleId > 0) {
        this.roleService.getOneRole(this.roleId).subscribe(roleData => {
          this.roleInfo.name = roleData.content.name;
          this.roleInfo.description = roleData.content.description;

          this.form.controls['roleName'].setValue(this.roleInfo.name);
          this.form.controls['description'].setValue(this.roleInfo.description);

          for (const operation of roleData.content.operations) {
            if (this.selectedPermissionIds.indexOf(operation.id) < 0) {
              this.selectedPermissionIds.push(operation.id);
            }
            if (this.selectedResourceIds.indexOf(operation.resourceId) < 0) {
              this.selectedResourceIds.push(operation.resourceId);

              const theRes = this.allResourceList.filter(m => m.id === operation.resourceId)[0];
              this.updateParentResouceSelected(theRes);
            }
          }

          console.info()

        }, error => {
          if (error.error) {
            //this.alertMessage(error.error.message);
            swal({
              title: '错误!',
              text: error.error.message,
              type: 'error',
              confirmButtonText: '关闭'
            })
          } else {
            //this.alertMessage("网络连接出错");
            swal({
              title: '错误!',
              text: "网络连接出错",
              type: 'error',
              confirmButtonText: '关闭'
            })
          }
        });
      }
    });
  }

  ngOnInit() {

  }


  private addChildrenResourceToList(res: ResourceModel): void {
    for (const resource of res.childrens) {
      this.allResourceList.push(resource);
      this.addChildrenResourceToList(resource);
    }
  }


  closeModal() {
    this.activeModal.close();
  }

  isPermissionChecked(permissionId: number): boolean {
    return this.selectedPermissionIds.indexOf(permissionId) >= 0;
  }

  isResourceChecked(resourceId: number): boolean {
    return this.selectedResourceIds.indexOf(resourceId) >= 0;
  }


  onSubmit(value: any) {
    this.submitted = true;
    this.roleInfo.name = value.roleName;
    this.roleInfo.description = value.description;


    this.roleInfo.operationIds = this.selectedPermissionIds;

    if (this.roleId > 0) {
      this.roleInfo.id = this.roleId;

      this.roleService.updateRole(this.roleInfo).subscribe(data => {
          //this.alertMessage("保存成功");
          swal({
            title: '成功!',
            text: "保存成功",
            type: 'success',
            confirmButtonText: '关闭'
          })
          this.activeModal.close(1);
        },
        error => {
          this.submitted = false;
          if (error.error) {
            //this.alertMessage(error.error.message);
            swal({
              title: '错误!',
              text: error.error.message,
              type: 'error',
              confirmButtonText: '关闭'
            })
          }
          else {
            //this.alertMessage("网络连接出错");
            swal({
              title: '错误!',
              text: "网络连接出错",
              type: 'error',
              confirmButtonText: '关闭'
            })
          }
        });
    }
    else {
      this.roleService.addRole(this.roleInfo).subscribe(data => {
        //this.alertMessage("保存成功");
        swal({
          title: '成功!',
          text: "保存成功",
          type: 'success',
          confirmButtonText: '关闭'
        })
        this.activeModal.close(1);
      }, error => {
        this.submitted = false;

        if (error.error) {
          //this.alertMessage(error.error.message);
          swal({
            title: '错误!',
            text: error.error.message,
            type: 'error',
            confirmButtonText: '关闭'
          })
        }
        else {
          //this.alertMessage("网络连接出错");
          swal({
            title: '错误!',
            text: "网络连接出错",
            type: 'error',
            confirmButtonText: '关闭'
          })
        }
      });
    }

  }

  onPermissionChanged(isChecked: boolean, permission: PermissionModel): void {
    if (isChecked) {
      const isExists = this.selectedPermissionIds.indexOf(permission.id) >= 0;
      if (!isExists) {
        this.selectedPermissionIds.push(permission.id);
      }
    } else {
      const dataIndex = this.selectedPermissionIds.indexOf(permission.id);
      if (dataIndex >= 0) {
        this.selectedPermissionIds.splice(dataIndex, 1);
      }
    }

    const res = this.allResourceList.filter(m => m.id === permission.resourceId)[0];
    let isAllPermissionCheck = true;
    for (const p of res.permissions) {
      if (this.selectedPermissionIds.indexOf(p.id) < 0) {
        isAllPermissionCheck = false;
        break;
      }
    }

    if (isAllPermissionCheck) {
      if (this.selectedResourceIds.indexOf(res.id) > 0) {
        return;
      }
      this.selectedResourceIds.push(res.id);
    } else {
      const resIndex = this.selectedResourceIds.indexOf(res.id);
      if (resIndex >= 0) {
        this.selectedResourceIds.splice(resIndex, 1);
      } else {
        return;
      }
    }
    this.updateParentResouceSelected(res);
  }

  updateParentResouceSelected(res: ResourceModel) {
    if (!res.parentId) {
      return;
    }
    const parentRes = this.allResourceList.filter(m => m.id === res.parentId)[0];

    let isAllChildrenResChecked = true;

    for (const child of parentRes.childrens) {
      if (this.selectedResourceIds.indexOf(child.id) < 0) {
        isAllChildrenResChecked = false;
        break;
      }
    }
    if (isAllChildrenResChecked) {
      if (this.selectedResourceIds.indexOf(parentRes.id) < 0) {
        this.selectedResourceIds.push(parentRes.id);
      }
    } else {
      const resIndex = this.selectedResourceIds.indexOf(parentRes.id);
      if (resIndex >= 0) {
        this.selectedResourceIds.splice(resIndex, 1);
      }
    }
    this.updateParentResouceSelected(parentRes);
  }


  onResouceChanged(isChecked: boolean, resource: ResourceModel) {
    if (isChecked) {
      this.checkAllPermissions(resource);
      this.selectedResourceIds.push(resource.id);
    } else {
      this.unCheckAllPermissions(resource);

      const index = this.selectedResourceIds.indexOf(resource.id);
      this.selectedResourceIds.splice(index, 1);
    }
  }

  private checkAllPermissions(resource: ResourceModel): void {
    for (const permission of resource.permissions) {
      if (this.selectedPermissionIds.indexOf(permission.id) < 0) {
        this.selectedPermissionIds.push(permission.id);
      }
    }
    for (const child of resource.childrens) {
      if (this.selectedResourceIds.indexOf(child.id) < 0) {
        this.selectedResourceIds.push(child.id);
      }
      this.checkAllPermissions(child);
    }
  }

  private unCheckAllPermissions(resource: ResourceModel): void {
    for (const permission of resource.permissions) {
      const findIndex = this.selectedPermissionIds.indexOf(permission.id);
      if (findIndex >= 0) {
        this.selectedPermissionIds.splice(findIndex, 1);
      }
    }
    for (const child of resource.childrens) {
      const childIndex = this.selectedResourceIds.indexOf(child.id)
      if (childIndex >= 0) {
        this.selectedResourceIds.splice(childIndex, 1);
      }


      this.unCheckAllPermissions(child);
    }
  }
}
