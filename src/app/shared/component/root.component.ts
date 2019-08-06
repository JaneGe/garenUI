import swal from 'sweetalert2';
import { UserService, CurrentUserInfoModel } from 'app/shared';
import { CommonData } from 'app/shared/common-data';
export class RootComponent {
  currentUser:CurrentUserInfoModel;
  constructor(){
    /*console.info( "constructor")
    this.currentUser = CommonData.CurrentUserInfo;
    console.info( this.currentUser)*/
  }

  closeAlert(){
    swal.close();
  }
   handleError(error,onClose?:any): void {

    if (error.error) {
      if (!error.error.message) {
        error.error.message = '错误，请重试'
      }
      swal({
        title: '错误!',
        text: error.error.message,
        type: 'error',
        confirmButtonText: '关闭',
        onClose:onClose
      })
    }
    else {
      swal({
        title: '错误!',
        text: "网络连接出错",
        type: 'error',
        confirmButtonText: '关闭',
        onClose:onClose
      })
    }
  }

  error(message: string): void {
    swal({
      title: '错误!',
      text: message,
      type: 'error',
      confirmButtonText: '关闭'
    })
  }

  alertMessage(message: string, closeTimer: number = null): void {
    swal({
      title: '成功',
      text: message,
      type: 'success',
      timer: closeTimer,
      confirmButtonText: '关闭',
    })
  }
  warnMessage(message: string, closeTimer: number = null): void {
    swal({
      title: '提示!',
      text: message,
      type: 'warning',
      timer: closeTimer,
      confirmButtonText: '关闭',
    })
  }

  confirm(message: string, callBack: () => any, cancelCallBack: () => any = null) {
    const result = swal({
      title: "是否确定？",
      text: message,
      type: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      cancelButtonText: '取消',
      confirmButtonText: '确定'
    }).then(function () {
      callBack();
    }, function (dismiss) { // Error Uncaught (in promise): cancel解决方法
      if (dismiss === 'cancel') {
        if (cancelCallBack != null) {
          cancelCallBack();
        }
      } else {
        throw dismiss;
      }
    })
  }

  prompt(title: string, callBack: (value: any) => any, initValue?: string) {
    //const result =  window.prompt(title, initValue);
    const result = initValue;
    swal({
      title: title,
      input: 'password',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: function (initValue) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            if (initValue === '') {
              reject('请输入密码！')
            } else {
              resolve()
              console.log(initValue);
            }
          }, 2000)
        })

      },
      allowOutsideClick: false
    }).then(function (initValue) {
      callBack(result);
    })
  }

  isNullOrEmpty(s: string): boolean {
    return !s;
  }
}
