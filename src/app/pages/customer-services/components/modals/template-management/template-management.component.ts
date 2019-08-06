import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RootComponent } from "../../../../../shared/component/root.component";
import { TemplateEditComponent } from '../template-edit/template-edit.component';
import {siteMailService} from "../../amazon-services/siteMail.service";

@Component({
  selector: 'app-template-management',
  templateUrl: './template-management.component.html',
  styleUrls: ['./template-management.component.scss'],
  providers: [siteMailService]
})

export class TemplateManagementComponent extends RootComponent implements OnInit {
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };
  data = [];
  constructor(private activeModal: NgbActiveModal,
    private modalService: NgbModal,private _siteMailService: siteMailService) {
    super();
  }

  ngOnInit() {
  this.onQuery();
  }

  closeModal() {
    this.activeModal.close();
  }

  openTemplateEditModal(id) {
    const modal = this.modalService.open(TemplateEditComponent,
      { size: 'sm', backdrop: 'static' });
    modal.componentInstance.templateId = id;
    modal.componentInstance.modalHeader = "模板编辑";
    modal.result.then(result=>{
      this.onQuery();
    });
  }

  deleteTemplate(id) {
    this.confirm("确定删除该模板？", () =>{
      this._siteMailService.EmailTemplateDeleteById(id).subscribe(data => {
        this.alertMessage('删除成功！');
        this.onQuery();
      }, this.handleError);
    });
  }
  enableTemplate(id:any,status:number) {
    this.confirm("确定禁用该模板？", () =>{
      if(status==1){
        status=0;
      }else{
        status=1;
      }
      this._siteMailService.EmailTemplateEnableById(id,status).subscribe(data => {
        this.alertMessage('禁用除成功！');
        this.onQuery();
      }, this.handleError);
    });
  }


  pageChanged(pN: number): void {
    this.onQuery(pN);
  }
  onQuery(pageNumber: number = 1) {
    this._siteMailService.GetEmailTemplateQuery(pageNumber - 1, this.PageInfo.pageSize).subscribe(data => {
      this.data = data.content.items;
      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
    });
  }

}

