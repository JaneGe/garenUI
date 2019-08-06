// 获取的节点参数   this.node=document.getElementById('form').parentNode.parentNode.parentNode;
var getSceenWidth=function (){
    return document.body.clientWidth;
};
var getSceenHight=function (){
  return document.body.clientHeight;
};
export function slideIn(node:any,size?:any){
  var height=getSceenHight();
  if(size=="sm"){node.style.cssText+='top:100px;animation:show .3s linear;';}
  else{node.style.cssText+='top:50px;animation:show .3s linear;';}
  let sheet:any= document.styleSheets[0];
  let rule:string=`@keyframes show { 0%{transform: translateY(-${height}px)} 100%{transform: translateY(0)} }`;
  try {
    sheet.insertRule(rule,0);
  } catch (e) {
  };
}
//取消按钮动画
export function slideLeft(node:any,_this:any,size?:any){
  var width=getSceenWidth();
  node.style.cssText+='animation:outcancel .5s linear;';
  let sheet:any= document.styleSheets[0];
  sheet.deleteRule(sheet[0]);
  let rule:string=`@keyframes outcancel { 0%{transform: translateX(0)} 100%{transform: translateX(-${width}px)} }`;
  try {
    sheet.insertRule(rule,0);
  } catch (e) {
  };
  //动画结束后关闭弹窗
  var out=function () {
    _this.activeModal.close();
  }
  setTimeout(out,450);
}
//确定按钮动画
export function slideRight(node:any,_this:any,value:any,size?:any):any{
  var width=getSceenWidth();
  node.style.cssText+='animation:outconfirm .5s linear;';
  let sheet:any= document.styleSheets[0];
  sheet.deleteRule(sheet[0]);
  let rule:string=`@keyframes outconfirm { 0%{transform: translateX(0)} 100%{transform: translateX(${width}px)} }`;
  try {
    sheet.insertRule(rule,0);
  } catch (e) {
  };
  //动画结束后关闭弹窗
  var out=function () {
    _this.activeModal.close(value);
  }
  setTimeout(out,450);
}
