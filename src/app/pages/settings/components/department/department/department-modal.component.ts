import { AfterContentInit, Component, Input, Output, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DepartmentService } from "../../../../../shared/services/department.service";
import { DepartmentModel, DepartmentOptionModel } from "../../../../../shared/models/departments/department.model";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RootComponent } from 'app/shared/component/root.component';

@Component({
  selector: 'app-department',
  templateUrl: './department-modal.component.html',
  styleUrls: ['./department-modal.component.scss'],
  providers: [DepartmentService]
})
export class DepartmentModalComponent extends RootComponent implements OnInit {

  @Input()
  departmentId?: number;

  departmentInfo: DepartmentModel;
  allDepartments: DepartmentOptionModel[] = [];

  public submitted: boolean = false;

  public form: FormGroup;
  // public departmentName: AbstractControl;
  // public description: AbstractControl;
  // public parentDeaprtment: AbstractControl;

  constructor(private activeModal: NgbActiveModal,
    fb: FormBuilder,
    private departmentService: DepartmentService) {
    super();

    this.form = fb.group({
      'departmentName': ['', Validators.compose([Validators.required, Validators.maxLength(16)])],
      'description': ['', Validators.compose([Validators.maxLength(256)])],
      'parentDeaprtment': [''],
    });
    // this.departmentName = this.form.;
    // this.description: AbstractControl;
    // this.parentDeaprtment: AbstractControl;
    this.departmentInfo = new DepartmentModel();
  }

  ngOnInit() {
    this.departmentService.getAllDepartmentOptionList().subscribe(data => {
      this.allDepartments = data.content;
    });
    if (this.departmentId > 0) {
      //todo
      this.departmentService.getOneDepartment(this.departmentId).subscribe(data => {
        this.form.controls['departmentName'].setValue(data.content.name);
        this.form.controls['parentDeaprtment'].setValue(data.content.parentId);
        this.form.controls['description'].setValue(data.content.description);
      });
    }

  }

  closeModal() {
    this.activeModal.close();
  }

  deleteDepartment() {
    this.departmentService.deleteDepartment(this.departmentId).subscribe(data => {
      this.alertMessage('删除成功');
      this.activeModal.close(1);
    }, this.handleError)
  }

  onSubmit(value: any) {
    this.submitted = true;
    this.departmentInfo.name = value.departmentName;
    this.departmentInfo.parentId = value.parentDeaprtment;
    this.departmentInfo.description = value.description;
    if (this.departmentId > 0) {
      this.departmentInfo.id = this.departmentId;
      this.departmentService.updateDepartment(this.departmentInfo).subscribe(data => {

        this.alertMessage('保存成功');

        this.activeModal.close(1);
      },
        error => {
          this.submitted = false;
          if (error.error) {
            this.error(error.error.message);
          }
          else {
            this.error('网络连接出错');
          }
        });
    }
    else {
      this.departmentService.addDepartment(this.departmentInfo).subscribe(data => {

        this.alertMessage('保存成功');
        this.activeModal.close(1);
      }, error => {
        this.submitted = false;
        if (error.error) {
          this.error(error.error.message);
        }
        else {
          this.error('网络连接出错');
        }
      });
    }

  }
}

