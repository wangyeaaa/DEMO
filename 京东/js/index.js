function change(city){
	var bj=document.getElementById("bj");
	bj.innerHTML=city;
	var city1=document.getElementsByName("city");
	for(var i=0;i<city1.length;i++){
		if(city1[i].innerHTML==bj.innerHTML){
			city1[i].style.backgroundColor="red";
			city1[i].style.color="#fff";
		}
		else{
			city1[i].style.backgroundColor="#fff";
			city1[i].style.color="#ccc";
		}
	}
}
//轮播
 	 var imgArr=["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg"];
 	var num=0;
 	var timer;
function slider(){
	if(num==7){
	      num=0;
	}else{
		num++;
	}
	var img=document.getElementById("myimg");
	img.src="../images/"+imgArr[num];
	var li=document.getElementsByName("li");
	for(var i=0;i<li.length;i++){
	    	li[i].className=" ";
	    	li[num].className="active";
	}
}
	function next1(){
		slider();
	}
	function forward1(){
		if(num==0){
			num=7;
		}else{
			num--;
		}
	var img=document.getElementById("myimg");
	img.src="../images/"+imgArr[num];
	var li=document.getElementsByName("li");
	for(var j=0;j<li.length;j++){
		li[j].className=" ";
		li[num].className="active";
	}
	}
//window onload函数
	window.onload=function(){
		var  slider=document.getElementById("slider");
		slider.onmouseover=function(){
			clearInterval(timer);
			var left=document.getElementById("left");
			left.style.display="block";
			var right=document.getElementById("right");
			right.style.display="block";
		}
		slider.onmouseout=function(){
			timer=setInterval("slider()",1000);
			var left=document.getElementById("left");
			left.style.display="none";
			var right=document.getElementById("right");
			right.style.display="none";
		}
//第二个轮播
	var  banner32=document.getElementById("banner3-2");
   	var left2=document.getElementById("left2");
   	var right2=document.getElementById("right2");
   	banner32.onmouseover=function(){
   		left2.style.display="block";
   		right2.style.display="block";
   		clearInterval(timer3);
   	}
   	banner32.onmouseout=function(){
   		left2.style.display="none";
   		right2.style.display="none";
   		 timer3=setInterval("lunbo2()",1000);
   	}
}
	function show(a){
		var img=document.getElementById("myimg");
		img.src="../images/"+imgArr[a];
		var li=document.getElementsByName("li");
		for(var i=0;i<li.length;i++){
			li[i].className=" ";
			li[a].className="active";
		}

	}
timer=setInterval("slider()",1000);
//计时器
   var hour=1;var minute=40;var second=60;
  var timer1;
function timeout(){
	var h=document.getElementById("hour");
	var m=document.getElementById("minute");
	var s=document.getElementById("second");
	second--;
	if(hour<10){
	h.innerHTML="0"+hour;
}else{
	h.innerHTML=hour;
}
if(minute<10){
	m.innerHTML="0"+minute;
}else{
	m.innerHTML=minute;
}
if(second<10){
	s.innerHTML="0"+second;
}else{
	s.innerHTML=second;
}
	if(second==0){
		minute--;
		second=60;

	}
	if(minute==0){
		hour--;
		minute=60;
	}
	if(hour==0&&minute==0&&second==0){
		clearInterval(timer1);
	}  
 }
timer1=setInterval("timeout()",1000);	
//京东秒杀菜单滑动
	var banner_ul=document.getElementById("banner_ul");
	var next2=document.getElementById("next2");
	var forward2=document.getElementById("forward2");
	var ul=document.getElementById("ul1")
	banner_ul.onmouseover=function(){
		next2.style.display="block";
		forward2.style.display="block";
	}
	banner_ul.onmouseout=function(){
		next2.style.display="none";
		forward2.style.display="none";
	}
	var n1=0;
	function forward(){
	  	n1=n1-1013;
	  	ul.style.marginLeft=n1+"px";
	  	ul.style.transition="all 0.6s linear";
	  	if(n1==-5065){
	  		n1=0;
	  	ul.style.marginLeft=n1+"px";
	  	ul.style.transition="none ";
	  	}
	}
	function next(){
	  	n1=n1+1013;
	  	ul.style.marginLeft=n1+"px";
	  	ul.style.transition="all 0.6s linear";
	  	if(n1==1013){
	  		n1=-4052;
	  		ul.style.marginLeft=n1+"px";
	  		ul.style.transition="none ";
	  	}
	}

  //轮播2
   var  num2=0;
   var timer3;
   function lunbo2(){
   	var b1=document.getElementById("banner3-2-21");
   	var b2=document.getElementById("banner3-2-22");
   	var b3=document.getElementById("banner3-2-23");
   	num2++;
   	if(num2>2){
   		num2=0;
   	}
   	if(num2==0){
   		b1.style.display="block";
   		b2.style.display="none";
   		b3.style.display="none";
   	}
   	if(num2==1){
   		b1.style.display="none";
   		b2.style.display="block";
   		b3.style.display="none";
   	}
   	if(num2==2){
   		b1.style.display="none";
   		b2.style.display="none";
   		b3.style.display="block";
   	}
   	var li2=document.getElementsByName("li2");
   	for(var i=0;i<li2.length;i++){
   		li2[i].className=" ";
   		li2[num2].className="active1";
   	}
   }
 
       function right2(){
       	lunbo2();
       }
       function left2(){
       	var b1=document.getElementById("banner3-2-21");
   	var b2=document.getElementById("banner3-2-22");
   	var b3=document.getElementById("banner3-2-23");  	
   	if(num2==0){
   		num2=2;
   	}else{
   		num2--;
   	}
   	
   	if(num2==0){
   		b1.style.display="block";
   		b2.style.display="none";
   		b3.style.display="none";
   	}
   	if(num2==1){
   		b1.style.display="none";
   		b2.style.display="block";
   		b3.style.display="none";
   	}
   	if(num2==2){
   		b1.style.display="none";
   		b2.style.display="none";
   		b3.style.display="block";
   	}
   	var li2=document.getElementsByName("li2");
   	for(var i=0;i<li2.length;i++){
   		li2[i].className=" ";
   		li2[num2].className="active1";
   	}

       }
       function show2(a){
       	var b1=document.getElementById("banner3-2-21");
   	var b2=document.getElementById("banner3-2-22");
   	var b3=document.getElementById("banner3-2-23");  
       	if(a==0){
   		b1.style.display="block";
   		b2.style.display="none";
   		b3.style.display="none";
   	}
   	if(a==1){
   		b1.style.display="none";
   		b2.style.display="block";
   		b3.style.display="none";
   	}
   	if(a==2){
   		b1.style.display="none";
   		b2.style.display="none";
   		b3.style.display="block";
   	}
   	var li2=document.getElementsByName("li2");
   	for(var i=0;i<li2.length;i++){
   		li2[i].className=" ";
   		li2[a].className="active1";
   	}
       }
   timer3=setInterval("lunbo2()",1000);
   //排行榜
var  ht=document.getElementById("hongtiao");
var phone=document.getElementById("phone");
var yingliao=document.getElementById("yingliao");
var dianqi=document.getElementById("dianqi");
var chufang=document.getElementById("chufang");
var huangjin=document.getElementById("huangjin");
var li1=document.getElementById("li1");
var li2=document.getElementById("li2");
var li3=document.getElementById("li3");
var li4=document.getElementById("li4");
var li5=document.getElementById("li5");
li1.onmouseover=function(){
	phone.style.display="block";
	yingliao.style.display="none";
	dianqi.style.display="none";
	chufang.style.display="none";
	huangjin.style.display="none";
	ht.style.transform="translateX(0px)";
}
li2.onmouseover=function(){
	phone.style.display="none";
	yingliao.style.display="block";
	dianqi.style.display="none";
	chufang.style.display="none";
	huangjin.style.display="none";
	ht.style.transform="translateX(70px)";
}
li3.onmouseover=function(){
	phone.style.display="none";
	yingliao.style.display="none";
	dianqi.style.display="block";
	chufang.style.display="none";
	huangjin.style.display="none";
	ht.style.transform="translateX(140px)";
}
li4.onmouseover=function(){
	phone.style.display="none";
	yingliao.style.display="none";
	dianqi.style.display="none";
	chufang.style.display="block";
	huangjin.style.display="none";
	ht.style.transform="translateX(210px)";
}
li5.onmouseover=function(){
	phone.style.display="none";
	yingliao.style.display="none";
	dianqi.style.display="none";
	chufang.style.display="none";
	huangjin.style.display="block";
	ht.style.transform="translateX(280px)";
}
//图片弹出
 var banner42=document.getElementById("banner4-2");
var myimg=document.getElementById("img");
banner42.onmouseover=function(){
	myimg.style.transform="translateX(20px)";
	myimg.style.transition="all 0.5s linear ";
}
banner42.onmouseout=function(){
	myimg.style.transform="translateX(0px)";
	myimg.style.transition="all 0.5s linear ";	
}
// 爱生活底部菜单滑动
var  ash15=document.getElementById("ash1-5");
var left4=document.getElementById("left4");
var right4=document.getElementById("right4");
var ul2=document.getElementById("ul2");
ash15.onmouseover=function(){
	left4.style.display="block";
	right4.style.display="block";
}
ash15.onmouseout=function(){
	left4.style.display="none";
	right4.style.display="none";
}
var n=0;
function forward4(){
	if(n==-593){
		n=-593;
		ul2.style.marginLeft=n+"px";
	}
	else{
		n=n-593;
		ul2.style.marginLeft=n+"px";
		ul2.style.transition="all 0.3s linear";
	}
}
function next4(){
	if(n==0){
		n=0;
		ul2.style.marginLeft=n+"px";
	}
	else{
		n=n+593;
		ul2.style.marginLeft=n+"px";
		ul2.style.transition="all 0.3s linear";
	}
}
//顶部搜索框弹出
function final(){
	var  sctop=document.documentElement.scrollTop||document.body.scrollTop;//兼容火狐
	var  topsearch=document.getElementById("top-search");
	var  leftnav=document.getElementById("leftnav");
    if(sctop>=700){
	topsearch.style.display="block";
	}else{
	topsearch.style.display="none";	
	}
	if(sctop>=1800){
	leftnav.style.display="block";
	}
	else{
	leftnav.style.display="none";
	}
}
 window.onscroll=final;


