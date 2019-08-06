export function toggleSingleClass(target:any){
    var siblings=function (target) {
    var a = [];
    var b = target.parentNode.children;
    for(var i=0;i<b.length;i++) {
      if(b[i] !== target) a.push(b[i]);
    }
    return a;
  }
    var a=siblings(target);
    for(var i=0;i<a.length;i++){
      a[i].style.cssText="background:none;color:white";
    }
    target.style.cssText="background:#fff;color:#2389F2;";
}
