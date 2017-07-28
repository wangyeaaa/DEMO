var canvas_width=Math.min(500,$(window).width()-30);
var canvas_height=canvas_width;
var canvas=document.getElementById("canvas");
var cxt=canvas.getContext("2d");

canvas.width=canvas_width;
canvas.height=canvas_height;

var isMouseDown=false;
var lastLoc={x:0,y:0};
var lastTimestamp=0;//定义一个时间戳
var lastlinewidth=-1;

var strokecolor="black";
  
  drawGrid();

$("#controller").css("width",canvas_width+"px");
 $("#clear_btn").click(function(){
	cxt.clearRect(0,0,canvas.width,canvas.height);
	cxt.lineCap="butt";//绘制圆形的结束线帽 	
	  drawGrid();

});
 $(".color_btn").click(function(){
 	$(".color_btn").removeClass("color_btn_selected");
 	$(this).addClass("color_btn_selected");
 	strokecolor=$(this).css("background-color");

 });
 function beginStroke(point){//封装开始绘制函数
 	isMouseDown=true;
  	lastLoc=windowTocanvas(point.x,point.y);
  	lastTimestamp=new Date().getTime();//记录鼠标按下的时间点
 }
 function endStroke(){//结束函数
 	isMouseDown=false;
 }
 function moveStroke(point){//绘制函数
 	var curLoc=windowTocanvas(point.x,point.y);
  		var  s=calcDistance(curLoc,lastLoc);
  		var curTimestamp=new Date().getTime();
  		var t=curTimestamp-lastTimestamp;

  		var lineWidth=calclineWidth(t,s);
  		//字体绘制
  		cxt.beginPath();
  		cxt.moveTo(lastLoc.x,lastLoc.y);
  		cxt.lineTo(curLoc.x,curLoc.y);
  		cxt.lineWidth=lineWidth;
  		cxt.strokeStyle=strokecolor;
  		cxt.stroke();
  		cxt.lineCap="round";//绘制圆形的结束线帽 
  		cxt.lineJoin="round";//当两条线条交汇时，创建圆形边角


  		lastLoc=curLoc;
  		lastTimestamp=curTimestamp;
  		lastlinewidth=lineWidth;

 }


  canvas.onmousedown=function(e){
  	e.preventDefault();//阻止默认响应
  	beginStroke({x:e.clientX,y:e.clientY});//将坐标封装在一个类中 返回给point 	
  };
    canvas.onmouseup=function(e){
  	e.preventDefault();
  	endStroke();
  };
    canvas.onmouseout=function(e){
  	e.preventDefault();
  	endStroke();
  };
     canvas.onmousemove=function(e){
  	e.preventDefault();
  	if(isMouseDown){//执行写一个字
  		moveStroke({x:e.clientX,y:e.clientY});
  	}
  };
  /**
   * 移动端的手写适配
   */
  //注册三个监听器
  canvas.addEventListener("touchstart",function(e){//开始绘制
  	e.preventDefault();
  	touch=e.touches[0]  //获取触碰点第一个元素（防止用户多个手指头触碰屏幕）
  	beginStroke({x:touch.pageX,y:touch.pageY});
  });
    canvas.addEventListener("touchmove",function(e){//绘制
  	e.preventDefault();
  	if(isMouseDown){
  	touch=e.touches[0]  //获取触碰点第一个元素（防止用户多个手指头触碰屏幕）
  	moveStroke({x:touch.pageX,y:touch.pageY});
  	}	
  });
      canvas.addEventListener("touchend",function(e){//结束绘制
  	e.preventDefault();
  	endStroke();
  
  });
  function calclineWidth(t,s){
  	var v=s/t;		//速度
  	var linewidth;
  	if(v<=0.1){
  		linewidth=20
  	}else if(v>=10){
  		linewidth=1
  	}else{
  		linewidth=20-(v-0.1)/(10-0.1)*(20-1);//当速度在1到10 之间的时候 取平均差值
  	}
  	if(lastlinewidth==-1){
  		return  linewidth
  	}else{
  		return  lastlinewidth*2/3+linewidth*1/3;
  	}
  	

  }
  function calcDistance(loc1,loc2){//计算两点之间的距离
  	return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y));
  }
function windowTocanvas(x,y){//屏幕坐标转换为画布坐标
	var bbox=canvas.getBoundingClientRect();//获得画布包围盒各边与屏幕间距
	return {x:Math.round(x-bbox.left),y:Math.round(y-bbox.top)};
}
 function drawGrid(){
 	cxt.strokeStyle="rgb(230,11,9)";
 	cxt.beginPath();
 	cxt.moveTo(3,3);
 	cxt.lineTo(canvas_width-3,3);
 	cxt.lineTo(canvas_width-3,canvas_height-3);
 	cxt.lineTo(3,canvas_height-3);
 	cxt.closePath();
 	cxt.setLineDash([]);
 	cxt.lineWidth=6;
 	cxt.stroke();

 	//画虚线米字格
 	cxt.beginPath();
 	
 	cxt.moveTo(6,6);
 	cxt.lineTo(canvas_width-6,canvas_height-6);

 	cxt.moveTo(canvas_width-6,6);
 	cxt.lineTo(6,canvas_height-6);

 	cxt.moveTo(6,canvas_height/2);
 	cxt.lineTo(canvas_width-6,canvas_height/2);

 	cxt.moveTo(canvas_width/2,6);
 	cxt.lineTo(canvas_width/2,canvas_height-6);

 	cxt.closePath();

 	cxt.setLineDash([6,3]);
 	cxt.strokeStyle="pink";
 	cxt.stroke();

 }
