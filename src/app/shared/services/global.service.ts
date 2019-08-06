import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class GlobalService {
    private permissionSource = new Subject<any>();

    permission$ = this.permissionSource.asObservable();

    _permission(permission: any) {
        this.permissionSource.next(permission);
    }

    private isParentCheckedSource = new Subject<any>();

    isParentChecked$ = this.isParentCheckedSource.asObservable();

    _isParentChecked(isParentChecked: any) {
        this.isParentCheckedSource.next(isParentChecked);
    }

}