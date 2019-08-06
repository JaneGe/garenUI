import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { siteMailService } from "../../amazon-services/siteMail.service";
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateManagementComponent } from 'app/pages/customer-services/components/modals/template-management/template-management.component';
import { RootComponent } from "../../../../../shared/component/root.component";
import { ReasonModalComponent } from 'app/pages/customer-services/components/modals/reason-modal/reason-modal.component';
import { OrderDetailModalComponent } from 'app/pages/order/components/modals/order-detail-modal/order-detail-modal.component';
import { PackageModalComponent } from "../../../../order/components/modals/packageModal/packageModal.component";

@Component({
  selector: 'app-mail-detail-modal',
  templateUrl: './mail-detail-modal.component.html',
  styleUrls: ['../../style.scss', './mail-detail-modal.component.scss'],
  providers: [siteMailService]
})
export class MailDetailModalComponent extends RootComponent implements OnInit {
  @Input()
  mailId: number;
  @Input()
  mailIdItem: Array<any>;
  public value = [];
  public current = [];
  emaildetail: any = {};
  subjectText: string = '';
  shippmentTypes = [{ id: '-1', text: '请选择模板', content: '' }];
  mailCate: number;
  mailContent;
  mailNote: string = '';

  templateParams: Array<any> = [];

  onChanged(data: { value: string }) {
    this.ckeditorContent = this.genterReplyMail(this.shippmentTypes.find(f => f.id == data.value).content).replace(/<\/br>/g, '\n').replace(/<br\/>/g, '\n');
    console.log(this.ckeditorContent);
  }

  ckeditorContent: string = '';

  isReply: boolean = false;

  constructor(private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private routeInfo: ActivatedRoute,
    private _siteMailService: siteMailService) {
    super();
  }

  ngOnInit() {
    //this.mailId = this.routeInfo.snapshot.params['id'];
    this.onLoad();
  }

  loadTemplateParam() {
    this.templateParams.push({ key: 'buyer', value: this.emaildetail.buyerName });
    this.templateParams.push({ key: 'paidtime', value: this.emaildetail.payTimeDesc });
    this.templateParams.push({ key: 'expresstime', value: this.emaildetail.expressTimeDesc });
    this.templateParams.push({ key: 'tracknumber', value: this.emaildetail.trackNumber });
    this.templateParams.push({ key: 'buyer_address', value: this.emaildetail.buyerAddress });
    this.templateParams.push({ key: 'sku', value: this.emaildetail.sku });
  }

  SetEmailReadById() {
    this._siteMailService.SetOnlyEmailSeen(this.mailId).subscribe(data => {
    });
  }

  setEmailStar(id) {
    let readIds = [];
    readIds.push(id);
    this._siteMailService.SetEmailStarByIds(readIds).subscribe(data => {
      $('.content-detail').html('');
      this.onLoad();
    });
  }

  setEmailException(id) {
    let readIds = [];
    readIds.push(id);
    this._siteMailService.SetEmailExceptionByIds(readIds).subscribe(data => {
      $('.content-detail').html('');
      this.onLoad();
    });
  }

  SaveNoteCate(id) {
    if ((!this.mailNote) || this.mailNote.trim() === '') {
      this.warnMessage('请先填写客服备注!');
      return;
    }
    this._siteMailService.SaveNoteCate(id, this.mailCate, this.mailNote).subscribe(data => {
      this.alertMessage('保存成功!');
    });
  }

  onLoad() {
    let readIds = [];
    readIds.push(this.mailId);
    this._siteMailService.SetEmailReadByIds(readIds).subscribe(data => {
    }, this.handleError);

    this.presentId = this.mailIdItem.indexOf(this.mailId);
    this._siteMailService.GetEmailDetailById(this.mailId).subscribe(data => {
      this.emaildetail = data.content;
      this.subjectText = 'Re:' + data.content.subject;
      this.mailCate = data.content.businessTypeInt;
      this.mailNote = data.content.note;
      this.mailContent = '<div>' + this.emaildetail.contentDesc + '</div>';
      $('.content-detail').append(this.mailContent);
      this.loadTemplateParam();



      //this.ckeditorContent = this.genterReplyMail('');
      this.getEnableTemplate();
    });

  }

  getEnableTemplate() {
    this._siteMailService.GetTemplateByAccount(this.mailId).subscribe(data => {
      this.shippmentTypes = [{ id: '-1', text: '请选择模板', content: '' }];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.id;
        item.text = c.name;
        item.content = c.content;
        this.shippmentTypes.push(item);
      }
    }, this.handleError);

  }

  sendMail() {
    let data = {
      EmailId: this.mailId,
      Subject: this.subjectText,
      RecieveEmailAddress: this.emaildetail.sendMailAddress,
      Content: this.ckeditorContent
    };

    this._siteMailService.SendEmail(data).subscribe(data => {
      this.alertMessage('发送信息成功!');
      this.subjectText = '';
      this.ckeditorContent = '<p></p>';
    }, this.handleError);
    this.onLoad();

  }

  genterReplyMail(message: string) {
    //针对message参数进行过滤
    for (let i = 0; i < this.templateParams.length; i++) {
      message = message.replace('{{' + this.templateParams[i].key + '}}', this.templateParams[i].value);
    }
    const mess = '</br>' + message + '</br>';
    return mess;
  }

  replyMail() {
    this.isReply = !this.isReply;
    if (this.isReply) {
      $('.theme-detail').append(this.mailContent);
    } else {
      $('.theme-detail').html('');
    }
  }

  enterReply() {
    this.replyMail();
    this.onLoad();
  }

  openTemplateManagementModal(id) {
    const modal = this.modalService.open(TemplateManagementComponent,
      { size: 'sm', backdrop: 'static' });
    modal.result.then(result => {
      this.getEnableTemplate();
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  presentId;
  mailChange(type: boolean) {
    $('.content-detail').html('');
    if (type) {
      this.mailId = this.mailIdItem[this.mailIdItem.indexOf(this.mailId) - 1];
      this.onLoad();
    } else {
      this.mailId = this.mailIdItem[this.mailIdItem.indexOf(this.mailId) + 1];
      this.onLoad();
    }
  }

  mailCategory() {
    // if (this.mailCate === 'other') {
    //   const modal = this.modalService.open(ReasonModalComponent,
    //     { size: 'sm', backdrop: 'static' });
    // }
  }

  openOrderDetailModal(orderId: number) {
    const searchModal = this.modalService.open(OrderDetailModalComponent, { size: 'sm', backdrop: 'static' });
    searchModal.componentInstance.modalHeader = '编辑订单';
    searchModal.componentInstance.orderId = orderId;
    searchModal.result.then(result => {
      if (result === 1) {
        this.onLoad();
      }
    }, reason => {
    })
  }

  openPackageDetailModal(packageId: string, ordernumber: string, status: string) {
    const searchModal = this.modalService.open(PackageModalComponent, { size: 'lg', backdrop: 'static' });
    searchModal.componentInstance.modalHeader = '包裹详情';
    searchModal.componentInstance.packageId = packageId;
    searchModal.componentInstance.ordernumber = ordernumber;
    searchModal.componentInstance.status = status;
    searchModal.result.then(result => {
      this.onLoad();
    }, reason => {
    })
  }
}
