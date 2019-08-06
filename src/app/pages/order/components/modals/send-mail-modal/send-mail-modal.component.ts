import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from "../../../../../shared/services/order-service";
import { RootComponent } from "../../../../../shared/component/root.component";

@Component({
  selector: 'app-send-mail-modal',
  templateUrl: './send-mail-modal.component.html',
  styleUrls: ['./send-mail-modal.component.scss'],
  providers: [OrderService]
})
export class SendMailModalComponent extends RootComponent implements OnInit {
  public value = [];
  public current = [];
  shippmentTypes = [{ id: '-1', text: '请选择模板', content: '' }];
  orderId: any;
  ckeditorContent: string = '';

  subject: string = '';
  mailAddress: string = '';
  sendAddress: string = '';
  accountId: number;
  templateParams: Array<any> = [];
  emaildetail: any = {};
  constructor(private _modal: NgbActiveModal, private orderService: OrderService) {
    super();
  }

  ngOnInit() {
    this.onLoad();
  }

  onChanged(data: { value: string }) {
    this.ckeditorContent = this.genterReplyMail(this.shippmentTypes.find(f => f.id == data.value).content).replace(/<\/br>/g, '\n').replace(/<br\/>/g, '\n');
    console.log(this.ckeditorContent);
  }
  onLoad() {
    this.orderService.getOrderEmailDetail(this.orderId).subscribe(data => {
      this.shippmentTypes = [{ id: '-1', text: '请选择模板', content: '' }];
      this.emaildetail = data.content;
      this.subject = this.emaildetail.subject;
      this.mailAddress = this.emaildetail.recieveEmailAddress;
      this.sendAddress = this.emaildetail.sendEmailAddress;
      this.accountId = this.emaildetail.accountId;
      for (let c of data.content.templates) {
        const item = <any>{};
        item.id = c.id;
        item.text = c.name;
        item.content = c.content;
        this.shippmentTypes.push(item);
      }
    }, this.handleError);
  }

  genterReplyMail(message: string) {
    //针对message参数进行过滤
    for (let i = 0; i < this.templateParams.length; i++) {
      message = message.replace('{{' + this.templateParams[i].key + '}}', this.templateParams[i].value);
    }
    const mess = '</br>' + message + '</br>';
    return mess;
  }

  loadTemplateParam() {
    this.templateParams.push({ key: 'buyer', value: this.emaildetail.buyerName });
    this.templateParams.push({ key: 'paidtime', value: this.emaildetail.payTimeDesc });
    this.templateParams.push({ key: 'expresstime', value: this.emaildetail.expressTimeDesc });
    this.templateParams.push({ key: 'tracknumber', value: this.emaildetail.trackNumber });
    this.templateParams.push({ key: 'buyer_address', value: this.emaildetail.buyerAddress });
    this.templateParams.push({ key: 'sku', value: this.emaildetail.sku });
  }

  sendEmail() {

    var data = {
      Subject: this.subject,
      BuyName: this.emaildetail.buyerName,
      AccountId: this.emaildetail.accountId,
      RecieveEmailAddress: this.mailAddress,
      SendEmailAddress: this.sendAddress,
      OrderNumber: this.emaildetail.orderNumber,
      Content: this.ckeditorContent
    };

    this.orderService.sendEmailByOrder(data).subscribe(data => {
      this.alertMessage("发送邮件成功!");
      this._modal.close();
    }, this.handleError);
  }
  closeModal() {
    this._modal.close();
  }
}
