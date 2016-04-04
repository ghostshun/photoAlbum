/**
 * Created by Administrator on 2016/3/31.
 */
/**
 * Created by Administrator on 2016/3/25.
 */
window.onload = function(){
    var iWidth = document.documentElement.clientWidth/3;
    document.getElementsByTagName('html')[0].style.fontSize = iWidth + 'px';

    var aData = [];
    var removeLi = [];
    var str = '<div><div style="background-position: -0.1rem 0; "><div style="background-position: -0.2rem 0; "><div style="background-position: -0.3rem 0; "><div style="background-position: -0.4rem 0; "><div style="background-position: -0.5rem 0; "><div style="background-position: -0.6rem 0; "><div style="background-position: -0.7rem 0; "><div style="background-position: -0.8rem 0; "><div  style="background-position: -0.9rem 0; "><div id="insertPicBox" style="background-position: -1rem 0; "></div></div></div></div></div></div></div></div></div></div></div>';
    var nextStep = true;
    for( var i=1; i<=16; i++ ){
        aData[i-1] = 'video/' + i + '.jpg';
    }
    function create(aData){
        var oPage = document.getElementById('page');
        var oList = document.getElementById('picList');
        var aLi = oList.getElementsByTagName('li');
        var aBtns = oPage.getElementsByClassName('btn');
        var aRecycle = oPage.getElementsByClassName('recycle');
        var sHtml = "";
        var onOff = true;
        for( var i=0; i<aData.length; i++ ){
            sHtml += "<li style='background-image:url(" + aData[i] +")'></li>";
        }
        oList.innerHTML = sHtml;
        function changePosition(){
            for( var i=0; i<aLi.length; i++ ){
                aLi[i].style.left = i%3 + "rem";
                aLi[i].style.top = Math.floor(i/3) + "rem";
            }
        }
        changePosition();
        aBtns[0].addEventListener( "touchstart", fnRemove, false );
        aBtns[1].addEventListener( "touchstart", fnEnd, false );
        function fnEnd(){
            if(onOff){
                this.innerHTML = "取消";
                for( var i = 0; i < aLi.length; i++ ){
                    aLi[i].index = i;
                    aLi[i].addEventListener( "touchend", fnSelected, false );
                }
            }else{
                this.innerHTML = "选择";
                aBtns[0].style.display = "none";
                for( var i = 0; i < aLi.length; i++ ){
                    aLi[i].style.borderColor = "#000";
                    aLi[i].removeEventListener( "touchend", fnSelected, false );
                    removeLi = [];
                }
            }
            onOff = !onOff;
        }
        function fnSelected(){
            removeLi.push(this.index);
            this.style.borderColor = "#fff";
            aBtns[0].style.display = "block";
        }
        function fnRemove(){
            removeLi = removeLi.sort(function(a, b){
                return a - b;
            });
            aRecycle[0].style.top = aRecycle[1].top = "calc(100% - 0.6rem)";
            for( var i = 0; i<aRemove.length; i++ ){
                fnDle(i);
            }
            var popLi = removeLi.pop();
            create3D(aLi[popLi]);
            oList.removeChild( aLi[popLi] );

            for( var i = 0; i < aLi.length; i++ ){
                aLi[i].index = i;
            }
            changePosition();
        }
        function create3D(obj){
            var oldImg = obj.style.backgroundImage;
            nextStep = false;
            obj.style.background = '#000';
            obj.style.border = 'none';
            //obj.innerHTML = str;
            replaceImg();
            var oPicBox = document.getElementsByClassName('picBox')[0];
            var aDiv = oPicBox.getElementsByTagName('div');
            var aRecycle = document.getElementsByClassName('recycle');
            for( var i=0; i<aDiv.length; i++ ){
                aDiv[i].style.backgroundImage = oldImg;
            }


            //replaceImg();
            function show3D(callback){
                var aDiv = oPicBox.getElementsByTagName('div');
                aRecycle[0].style.top = "calc(100% - 0.4rem)";
                aRecycle[1].style.top = "calc(100% - 0.4rem)";
                for( var i=0; i < aDiv.length; i++ ){
                    aDiv[i].style.transition = '0.5s';
                    aDiv[i].className = 'show';
                }
                callback();
            }
            function movePhoto(){
                /*var downWidth = (aRecycle[0].offsetLeft - obj.offsetLeft)/iWidth + 0.3;
                 var downHeight = (aRecycle[0].offsetTop - obj.offsetTop)/iWidth - 0.8;
                 oPicBox.style.webkitTransition = ".3s left,5s 0.5s top";
                 oPicBox.style.transform = 'translateX(' + downWidth + 'rem) translateY(' + downHeight + 'rem)';*/
                //oPicBox.style.transition = ".5s left, .8s 0.3s top";
                oPicBox.style.transition = '1s';
                oPicBox.style.left = "calc(50% - 0.5rem)";
                oPicBox.style.top = "100%";
            }

            function replaceImg(){
                var oPicBox1 = document.createElement('div');
                var divData = getOffset(obj);
                oPicBox1.className = 'picBox';
                oPicBox1.style.left += divData.l + 'px';
                oPicBox1.style.top += divData.t + 'px';
                oPicBox1.innerHTML = str;
                oPage.appendChild(oPicBox1);
            }
            function getOffset(obj1){
                var l = 0;
                var t = 0;
                while(obj1){
                    l += obj1.offsetLeft;
                    t += obj1.offsetTop;
                    obj1 = obj1.offsetParent;
                }
                return {l: l,t:t};
            }
            setTimeout(function(){
                show3D(movePhoto);
            }, 100);
            setTimeout(listenPicBox(function(){
                listenPicBox();
            }), 500);
        }
        function listenPicBox(ev){
            var ev = ev || window.event;

            var insertPicBox = document.getElementById('insertPicBox');
            var oPicBox = document.getElementsByClassName('picBox')[0];
            oPicBox.addEventListener('transitionend', function(ev){
                nextStep = true;
                oPage.removeChild(oPicBox);
                var ev = ev || window.event;
                insertPicBox.id = '';
                ev.stopPropagation();
            },false);
        }

        function fnDle(i){
            var oBj = aPicBox[i];
            oBj.style.transition = '.3s left, .5s 0.3s top';
            oBj.style.left = 'calc(50% - 0.5rem)';
            oBj.style.top = '100%';
        }
    }
    create(aData);
};
