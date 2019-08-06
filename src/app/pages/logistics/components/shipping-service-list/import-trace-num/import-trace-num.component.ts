import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../../../../../environments/environment";
import {NgUploaderOptions} from "ngx-uploader/src/classes/ng-uploader-options.class";
import {JwtService} from "../../../../../shared/services/jwt.service";
import {RootComponent} from "../../../../../shared/component/root.component";
import {PackageService} from "../../../../../shared/services/package-search-service";


export class CreateTruckingNumber {
  trackingNumbers: string;
}

@Component({
  selector: 'app-import-trace-num',
  templateUrl: './import-trace-num.component.html',
  styleUrls: ['./import-trace-num.component.scss'],
  providers: [PackageService]
})

export class ImportTraceNumComponent extends RootComponent implements OnInit {
  modalHeader: string;
  pageInfo = {pageSize: 1, pageNumber: 1, total: 10};
  TraceNumByManual: string;

  ssId: number
  item: any[] = [];
  pageSize: number = 5;
  pageNumber: number = 1;
  total: number;
  errormes:string='';

  public fileUploaderOptions: NgUploaderOptions = {
    //url: `${environment.api_url}/api/v1/package/truckingNumberImports`,
    // url: `${environment.api_url}/api/v1/package/truckingNumberImports?ssId=${ CommonOptionModel.ssId}`,
    url: ` `,
  };

  constructor(private activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private jwtService: JwtService,
              private packageService: PackageService) {
    super();
  }

  ngOnInit() {
    this.loadData();
    this.fileUploaderOptions.authToken = this.jwtService.getToken().toString();
    this.fileUploaderOptions.cors = true;
    this.fileUploaderOptions.url = `${environment.api_url}/api/v1/package/truckingNumberImports?ssId=${ this.ssId}`;
  }

  closeModal() {
    this.activeModal.close();
  }

  pageChanged(pn) {
    this.loadData(pn);
  }

  loadData(pageNumber: number = 1) {
    this.packageService.getTrackingNumbers(this.ssId, pageNumber, this.pageSize).subscribe(data => {

      this.item = data.content.items;
      console.log(this.item);
      const pageInfo = data.content.pageInfo;
      this.pageSize = pageInfo.pageSize;
      this.pageNumber = pageInfo.pageIndex + 1;
      this.total = pageInfo.totalCount;
    }, this.handleError);
  }

  DoImport() {
    var trackingNumber = $('#TraceNumByManual').val();
    $('#succes').attr('hidden','true');
    $('#filed').attr('hidden','true');
    console.log(this.ssId);
    console.log(trackingNumber);

    var trackingNumberModel = new CreateTruckingNumber();
    trackingNumberModel.trackingNumbers = trackingNumber;

    var data = {
      ssId: this.ssId,
      trackingNumbers: [trackingNumber],
    }
    console.log(data);

    this.packageService.createCustomTruckingNumbers(data).subscribe(data => {

      var relsut = data.content;
      console.log(relsut);
      if (relsut.successes > 0) {
        //this.alertMessage("添加成功");

        $('#succes').removeAttr('hidden');


        this.loadData();
      }
      else {
        //this.error("添加失败");
        this.errormes=relsut.errors[0];
        $('#filed').removeAttr('hidden');
      }
      $('#TraceNumByManual').val('');
      $('#TraceNumByManual')[0].focus();

    }, this.handleError);


  }

  openAddTraceNumBymanual(content) {
    const modal = this.modalService.open(content, {size: 'lg', backdrop: 'static'});
  }

  openImportModal(importContent) {
    const modal = this.modalService.open(importContent, {size: 'lg', backdrop: 'static'});
  }

  uploadCompleted(res: any) {
    let response = JSON.parse(res.response);

    if (response.content == null && !response.success) {
      this.error(response.error.message);
      return;
    }
    let data = response.content;
    let message = "";
    if (data.totalCount > 0 && data.errorMessages.length < 0) {
      message += `总数:${data.totalCount},成功:${data.succeedCount},失败:${data.failedCount}.`;
    }
    if (data.failedCount > 0 || data.errorMessages.length > 0) {
      message += `错误信息如下:\r\n ${data.errorMessages.join(";\r\n")}`;
      this.error(message);
    }
    else {
      this.alertMessage(message);
      this.activeModal.close();
      this.loadData();
    }
  }
}
