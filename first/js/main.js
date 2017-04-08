/**
 * Created by hanmiao on 2017/4/8.
 */
//1.搜索框提示信息的隐藏与显示
//2.轮播图：通过改变图片透明度实现
//3.下拉列表
//4.无缝切换
window.onload=function () {
    mv.app.toTip();
    mv.app.toBanner();
    mv.app.toSel();
    mv.app.toRun();
}
var mv={ };  //命名空间
mv.tools={ };
//获取类名
mv.tools.getByClass=function (oParent,sClass) {
    var aEle=oParent.getElementsByTagName('*');
    var arr=[];
    for(var i=0;i<aEle.length;i++){
        if (aEle[i].className==sClass){
            arr.push(aEle[i]);
        }
    }
    return arr;
}
mv.tools.getStyle=function (obj,attr) {
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }
    else{
        return getComputedStyle(obj,false)[attr];
    }

}
mv.ui={ };
mv.ui.textChange=function (obj,str) {
    obj.onfocus=function () {
        if(this.value==str){
            this.value='';
        }
    }
    obj.onblur=function () {
        if(this.value==''){
            this.value=str;
        }
    }
};
//淡入：透明度由0--100
mv.ui.fadeIn=function (obj) {
    var iCur=mv.tools.getStyle(obj,'opacity');
    if(iCur==1){
        return false;
    }
    var value=0;
    clearInterval(obj.timer)
    obj.timer=setInterval(function () {
        var iSpeed=5;
        if(value==100){
            clearInterval(obj.timer);
        }
        else{
            value+=iSpeed;
            obj.style.opacity=value/100;
            obj.style.filter='alpha(opacity='+value+')';
        }

    },30)
}
//淡出：透明度由100--0
mv.ui.fadeOut=function (obj) {
    var iCur=mv.tools.getStyle(obj,'opacity');
    if(iCur==0){
        return false;
    }
    var value=100;
    clearInterval(obj.timer)
    obj.timer=setInterval(function () {
        var iSpeed=-5;
        if(value==0){
            clearInterval(obj.timer);
        }
        else{
            value+=iSpeed;
            obj.style.opacity=value/100;
            obj.style.filter='alpha(opacity='+value+')';
        }

    },30)
}
//向左移动:非匀速移动
mv.ui.moveLeft = function(obj,old,now){

    clearInterval(obj.timer);
    obj.timer = setInterval(function(){

        var iSpeed = (now - old)/10;

        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

        if(now == old){
            clearInterval(obj.timer);
        }
        else{
            old += iSpeed;
            obj.style.left = old + 'px';
        }
        alert(old);

    },30);

};
mv.app={ };
//搜索框提示信息的隐藏与显示
mv.app.toTip=function () {
    var oText1=document.getElementById('text1');
    var oText2=document.getElementById('text2');

    mv.ui.textChange(oText1,'Search website');
    mv.ui.textChange(oText2,'Search website');

}
//轮播图
mv.app.toBanner=function () {
    var oDd=document.getElementById('ad');
    var aLi=oDd.getElementsByTagName('li');

    var oPrevBg=mv.tools.getByClass(oDd,'prev_bg')[0];
    var oNextBg=mv.tools.getByClass(oDd,'next_bg')[0];
    var oPrev=mv.tools.getByClass(oDd,'prev')[0];
    var oNext=mv.tools.getByClass(oDd,'next')[0];

    var iNow=0;

    var timer=setInterval(auto,3000);
    //自动播放
    function auto() {
        if(iNow==aLi.length-1){
            iNow=0;
        }else {
            iNow++;
        }
       for(var i=0;i<aLi.length;i++){
           mv.ui.fadeOut(aLi[i]);
       }
        mv.ui.fadeIn(aLi[iNow]);
    }

    function autoPrev() {
        if(iNow==0){
            iNow=aLi.length-1;
        }else {
            iNow--;
        }
        for(var i=0;i<aLi.length;i++){
            mv.ui.fadeOut(aLi[i]);
        }
        mv.ui.fadeIn(aLi[iNow]);
    }


    oPrevBg.onmouseover=oPrev.onmouseover=function () {
        oPrev.style.display='block';
        clearInterval(timer);
    }
    oNextBg.onmouseover=oNext.onmouseover=function () {
        oNext.style.display='block';
        clearInterval(timer);
    }
    oPrevBg.onmouseout=oPrev.onmouseout=function () {
        oPrev.style.display='none';
        timer=setInterval(auto,3000);
    }
    oNextBg.onmouseout=oNext.onmouseout=function () {
        oNext.style.display='none';
        timer=setInterval(auto,3000);
    }
    oPrev.onclick=function () {
        autoPrev();
    };
    oNext.onclick=function () {
        auto();
    }
}
//下拉列表
mv.app.toSel=function () {
    var oSort=document.getElementById('sort');
    var aDd=oSort.getElementsByTagName('dd');
    var aUl=oSort.getElementsByTagName('ul');
    var aH2=oSort.getElementsByTagName('h2');

    for(var i=0;i<aDd.length;i++){
        aDd[i].index=i;
        aDd[i].onclick=function (ev) {
            var ev=ev||window.event;
            var This=this;
            for(var i=0;i<aUl.length;i++){
                aUl[i].style.display='none';
            }
            aUl[this.index].style.display='block';

            document.onclick=function () {
                aUl[This.index].style.display='none';
            }
            ev.cancelBubble=true;
        }
    }
    for(var i=0;i<aUl.length;i++){
        aUl[i].index=i;
        (function (ul) {
            var aLi=ul.getElementsByTagName('li');
            for(var i=0;i<aLi.length;i++){
                aLi[i].onmouseover=function () {
                    this.className='active';
                };
                aLi[i].onmouseout=function () {
                    this.className='';
                };
                aLi[i].onclick=function (ev) {
                    var ev=ev||window.event;
                    ev.cancelBubble=true;

                    aH2[this.parentNode.index].innerHTML=this.innerHTML;
                    this.parentNode.style.display='none';
                }
            }
        })(aUl[i]);
    }
}
//无缝切换
mv.app.toRun=function () {
    var oRun = document.getElementById('run1');
    var oUl = oRun.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');

    var oPrev = mv.tools.getByClass(oRun,'prev')[0];
    var oNext = mv.tools.getByClass(oRun,'next')[0];

    var iNow=0;

    oUl.innerHTML += oUl.innerHTML;  //复制一份ul

    oUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';

    oPrev.onclick = function(){

        if(iNow == 0){
            iNow = aLi.length/2;
            oUl.style.left = -oUl.offsetWidth/2 + 'px';
        }

        mv.ui.moveLeft(oUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);

        iNow--;

    };

    oNext.onclick = function(){

        if(iNow == aLi.length/2){
            iNow = 0;
            oUl.style.left = 0;
        }

        mv.ui.moveLeft(oUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);

        iNow++;
    };
}