// JavaScript Document
function id(obj) {
    return document.getElementById(obj);
}
function bind(obj, ev, fn) { 
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
function addClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

function fnLoad()
{
	var iTime=new Date().getTime();
	var oW=id("welcome");
	var arr=[""];
	var bImgLoad=true;
	var bTime=false;
	var oTimer=0;
	bind(oW,"webkitTransitionEnd",end);
	bind(oW,"transitionend",end);
	oTimer=setInterval(function(){
		if(new Date().getTime()-iTime>=5000)
		{
			bTime=true;
		}	
		if(bImgLoad&&bTime)
		{
			clearInterval(oTimer);
			oW.style.opacity=0;
		}
	},1000);
	function end()
	{
		removeClass(oW,"pageShow");
		fnTab();
	}
	/*for(var i=0;i<arr.length;i++)
	{
		var oImg=new Image();
		oImg.src=arr[i];
		oImg.onload=function()
		{
			
		}
		
	}*/
}

function fnTab()
{
	var oTab=id("tabPic");
	var oList=id("picList");
	var aNav=oTab.getElementsByTagName("nav")[0].children;
	var iNow=0;
	var iX=0;
	var iW= view().w;
	// alert(iW);
	var oTimer=0;
	var iStartTouchX=0;
	var iStartX=0;
	bind(oTab,"touchstart",fnStart);
	bind(oTab,"touchmove",fnMove);
	bind(oTab,"touchend",fnEnd);
	auto();
	if(!window.BfnScore)
	{
		fnScore();
		window.BfnScore=true;
	}
	function auto()
	{
		oTimer=setInterval(function(){
			iNow++;	
			iNow=iNow%aNav.length;
			tab();
		},2000);
	}
	function fnStart(ev)
	{
		oList.style.transition="none";
		ev=ev.changedTouches[0];
		iStartTouchX=ev.pageX;
		iStartX=iX;
		clearInterval(oTimer);
	}
	function fnMove(ev)
	{
		ev=ev.changedTouches[0];
		var iDis=ev.pageX-iStartTouchX;
		iX=iStartX+iDis;
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
	}
	function fnEnd()
	{
		iNow=iX/iW;
		iNow=-Math.round(iNow);
		if(iNow<0)
		{
			iNow=0;
		}
		if(iNow>aNav.length-1)
		{
			iNow=aNav.length-1;
		}
		tab();
		auto();
	}
	function tab()
	{
		iX=-iNow*iW;
		oList.style.transition="0.5s";
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
		for(var i=0;i<aNav.length;i++)
		{
			removeClass(aNav[i],"active");
		}
		addClass(aNav[iNow],"active");
	}
}
function fnScore()
{
	var oScore=id("score");
	var aLi=oScore.getElementsByTagName("li");
	for(var i=0;i<aLi.length;i++)
	{	
		fn(aLi[i]);
	}
	function fn(oLi)
	{
		var aNav=oLi.getElementsByTagName("a");
		var oInput=oLi.getElementsByTagName("input")[0];
		for(var i=0;i<aNav.length;i++)
		{
			aNav[i].index=i;
			bind(aNav[i],"click",function(){
				for(var i=0;i<aNav.length;i++)
				{
					if(i<=this.index)
					{
						addClass(aNav[i],"active");
					}					
					else
					{
						removeClass(aNav[i],"active");
					}
				}
				oInput.value=this.index+1;
			});
		}
	}

	fnIndex();
}
function fnInfo(oInfo,sInfo)
{
	oInfo.innerHTML=sInfo;
	oInfo.style.WebkitTransform="scale(1)";
	oInfo.style.opacity=1;
	setTimeout(function(){
		oInfo.style.WebkitTransform="scale(0)";
		oInfo.style.opacity=0;
	},1000);
}
function fnIndex()
{
	var oIndex=id("index");
	var oBtn=oIndex.getElementsByClassName("btn")[0];
	var oInfo=oIndex.getElementsByClassName("info")[0];
	var bScore=false;
	bind(oBtn,"click",fnEnd);
	function fnEnd()
	{
		bScore=fnScoreChecked();
		if(bScore)
		{
			if(bTag())
			{
				var arr = calculate();
				var input = id('average');
				input.value = arr;
				fnIndexOut();
			}
			else
			{
				fnInfo(oInfo,"给歌曲添加标签");	
			}
		}
		else
		{
			fnInfo(oInfo,"给歌曲评分");
		}
	}
	function calculate(){
		var oScore=id("score");
		var aInput=oScore.getElementsByTagName("input");
		var arr,sum = 0;
		for(var i =0;i < aInput.length;i++){
			sum+=Number(aInput[i].value);
			
		}
		arr = sum/3;
		return arr;
	}

	function fnScoreChecked()
	{
		var oScore=id("score");
		var aInput=oScore.getElementsByTagName("input");
		for(var i=0;i<aInput.length;i++)
		{
			if(aInput[i].value==0)
			{
				return false;
			}
		}
		return true;
	}
	function bTag()
	{
		var oTag=id("indexTag");
		var aInput=oTag.getElementsByTagName("input");
		for(var i=0;i<aInput.length;i++)
		{
			if(aInput[i].checked)
			{
				return true;
			}
		}
		return false;
	}
}
function fnIndexOut()
{
	var oMask=id("mask");
	var oIndex=id("index");
	// var oNew=id("news");
	addClass(oMask,"pageShow");
	// addClass(oNew,"pageShow");
		// fnNews();
	setTimeout(function(){
		oMask.style.opacity=1;	
		oIndex.style.WebkitFilter=oIndex.style.filter="blur(5px)";
	},14);
	setTimeout(function(){
		// oNew.style.transition="0.5s";
		oMask.style.opacity=0;	
		oIndex.style.WebkitFilter=oIndex.style.filter="blur(0px)";	
		// oNew.style.opacity=1;
		removeClass(oMask,"pageShow");
	},3000);
}
