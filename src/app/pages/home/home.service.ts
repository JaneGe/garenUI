import { Injectable } from '@angular/core';
import { Jsonp } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {
    static times = 0;
    private baseUrl: string = 'http://open.iciba.com/dsapi/?date=';

    constructor(private jsonp: Jsonp) { }

    getJSON() {
        let callback = "&callback=" + "__ng_jsonp__.__req" + HomeService.times + ".finished";
        HomeService.times++;
        let url = this.baseUrl + callback;
        return this.jsonp.get(url).map(res => res.json());
    }
}