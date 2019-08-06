import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class MenuCollapseService{
  private subject = new Subject<any>();
  constructor(){}
  sendMessage(val){
    this.subject.next(val);
  }
  getMessage(){
    return this.subject.asObservable();
  }
}
