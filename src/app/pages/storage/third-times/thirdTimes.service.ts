import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {EndPointsConfig} from "../../../shared/Config";
import {ApiResponseBaseModel} from "../../../shared/models/api.response.basemodel";
import {ApiService} from "../../../shared/services/api.service";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class ThirdTimesService{
  constructor(private apiService: ApiService) {
  }
  PackageDate=[
    {skuinfo:this.getPackage(1,'http://p6.qhmsg.com/t01f19a83edd601f295.jpg')},
    {skuinfo:this.getPackage(2,'http://img3.100bt.com/upload/ttq/20121202/1354443812118.png')},
    {skuinfo:this.getPackage(3,'http://img4.imgtn.bdimg.com/it/u=3738784537,1490332951&fm=27&gp=0.jpg')},
    {skuinfo:this.getPackage(4,'http://p6.qhmsg.com/t01f19a83edd601f295.jpg')},
    {skuinfo:this.getPackage(5,'http://img3.100bt.com/upload/ttq/20121202/1354443812118.png')},
    {skuinfo:this.getPackage(6,'http://p6.qhmsg.com/t01f19a83edd601f295.jpg')},
  ];
  SearchPackageProductQuery(pageindex:number,pagesize:number,searchCode:string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('SearchCode', searchCode.toString());
    searchParams.set('PageIndex', pageindex.toString());
    searchParams.set('PageSize', pagesize.toString());

    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_SearchPackagePageQuery,searchParams);
  }

  UpdatePackageStatusQuery(packageId:number,isException:boolean): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('PackageId', packageId.toString());
    searchParams.set('IsException', isException.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_UpdatePackageStatusQuery,searchParams);
  }
  UpdatePackageItemStatusQuery(packageItemId:any,isException:any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('PackageItemId', packageItemId);
    searchParams.set('IsException', isException);
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_UpdatePackageItemStatusQuery,searchParams);
  }
  getPackage(id:number,pic:string):SKUinfo{
    var P=new SKUinfo();
    P.id=id;
    P.pic=pic;
    P.SkuName=String.fromCharCode(parseInt((Math.random()*(26)+97).toFixed(0)));
    P.SkuCode=String.fromCharCode(parseInt((Math.random()*(26)+97).toFixed(0)));
    P.Num=5;
    return P;
  }

}
export class SKUinfo{
  id:number;
  pic:string;
  SkuName:string;
  SkuCode:string;
  Num:number;
}
