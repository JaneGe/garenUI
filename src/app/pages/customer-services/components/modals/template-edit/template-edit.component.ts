import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RootComponent } from "../../../../../shared/component/root.component";
import { siteMailService } from "../../amazon-services/siteMail.service";

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.scss'],
  providers: [siteMailService]
})

export class TemplateEditComponent extends RootComponent implements OnInit {
  templateName: string = '';
  templateContent: string = '';
  templateId?: number;
  channelId:any;
  channelName:string='';
  platformModel;
  language:any;


  public value = [];
  public current = [];
  accounts = [];

  constructor(private activeModal: NgbActiveModal, private _siteMailService: siteMailService) {
    super();
  }

  ngOnInit() {
    this.onLoad();
  }

  onLoad() {
    if (this.templateId) {
      this._siteMailService.GetEmailTemplateById(this.templateId).subscribe(data => {
        this.templateName = data.content.name;
        this.templateContent = data.content.content.replace(/<br\/>/g, '\n');
        this.language = data.content.languageNum;
        this.platformModel=data.content.channelTypeNum;
        //this.value = data.content.channelId;
          this.channelId=data.content.channelId;
        this.GetChannelAccount();
      }, this.handleError);
    }
  }

  GetChannelAccount(){
    let datas={
      currentChannelType:this.platformModel,
      ChannelIds:null
    };
    this.accounts=[];
    this._siteMailService.GetChannelAccount(datas).subscribe(data => {
      this.accounts=[{id:'-1',text:'请选择'}];
      for(let i=0;i<data.content.length;i++){
        let _tempData = {
          id:data.content[i].id,
          text:data.content[i].displayName
        };
        this.accounts.push(_tempData);
      }
      this.value=this.channelId;
    });
  }

  saveTemplate() {
    //this.templateContent = this.templateContent.replace(/\n/g, '<br/>');
    if(this.templateName.trim()==''){
      this.warnMessage("模板名称必须填写!");
      return;
    }
    if(this.templateContent.trim()==''){
      this.warnMessage("模板内容必须填写!");
      return;
    }
    if(!this.platformModel){
      this.warnMessage("请选择当前所属平台!");
      return;
    }
    if(!this.language){
      this.warnMessage("请选择当前模板所属语言!");
      return;
    }

    let datas = {
      Id: this.templateId,
      Name: this.templateName,
      Content: this.templateContent,
      ChannelAccountName:this.channelName,
      ChannelType:this.platformModel,
      Language:this.language,
      ChannelId:this.channelId
    };
    this._siteMailService.EmailTemplateOperation(datas).subscribe(data => {
      this.closeModal();
    }, this.handleError);
  }

  closeModal() {
    this.activeModal.close();
  }

  checkTags(event) {
    let r = /\[(.+?)\]/;
    let templateF = event.innerText.match(r)[1]
    this.templateContent = this.templateContent + '{{' + templateF + '}}';
  }

  onChanged(data: { value: string }) {
    if(data.value=='-1'){
      return;
    }
    this.channelId = data.value;
    let account= this.accounts.find(f=>f.id==this.channelId);
    if(account) {
      this.channelName = account.text;
    }
    console.log(data.value);
  }

  checkPlatform() {
    this.GetChannelAccount();
    console.log(this.platformModel);
  }
}

