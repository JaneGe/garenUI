import { NgModule } from "@angular/core";
import { NoticeModalComponent } from "app/pages/index/modals/noticeModal/noticeModal.component";
@NgModule({
    declarations: [
        NoticeModalComponent
    ],
    entryComponents: [
        NoticeModalComponent
    ],
    exports: [
        NoticeModalComponent
    ]
})
export class ModalModule { }
