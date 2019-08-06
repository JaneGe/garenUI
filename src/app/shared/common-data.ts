import { CurrentUserInfoModel } from "app/shared";

export class CommonData {
  public static CurrentUserInfo: CurrentUserInfoModel;
  public static PAGES_MENU: any;
  public static PAGES_ROLE: any;
  public static IsAdmin: string;


  public static GetCurrentPageMenu() {
    if (window.localStorage['PageMenu']) {
      return JSON.parse(window.localStorage['PageMenu']);
    }
  }

  public static GetCurrentPageRole() {
    if (window.localStorage['PageRole']) {
      return JSON.parse(window.localStorage['PageRole']);
    }
  }

  public static GetIsAdmin() {
    if (window.localStorage['IsAdmin']) {
      return window.localStorage['IsAdmin'];
    }
  }
}
