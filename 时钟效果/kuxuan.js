//定义canvas的宽高
var window_width=1024;
var window_height=568;
//定义小圆球的半径
var radius=8;
//定义数字距离画布边框的间距
var margin_left=30;
var margin_top=60;


//定义倒计时截止的时间
const endTime=new Date();
endTime.setTime(endTime.getTime()+3600*1000);
//当前需要倒计时的秒数
var curSeconds=0;


var balls=[];//声明一个小球的数组
//颜色数组存放小球颜色
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];



window.onload=function(){
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	canvas.width=window_width;
	canvas.height=window_height;

	curSeconds=getCurrentSeconds();
	
	setInterval(function(){
		if(!document.hidden){ //当页面离开 继续保持刷新页面 解决小球堆积问题
		render(context)//图形绘制函数
		update(); 
		}

	},50);

}
function getCurrentSeconds(){
	var curTime=new Date();
	//倒计时效果
/*	var ret=endTime.getTime()-curTime.getTime();//计算时间差
	ret=Math.round(ret/1000);//将ret 转换成秒数 再取整
	return  ret>=0?ret:0;  //判断返回的ret是不是大于或等于0 */

	//时钟效果
	var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
	return ret;

	 
}
function update(){
	var nextSeconds= getCurrentSeconds();

	var nexthours=parseInt(nextSeconds/3600);
	var nextminutes=parseInt((nextSeconds-nexthours*3600)/60);
	var nseconds=nextSeconds%60;


	var curhours=parseInt(curSeconds/3600);
	var curminutes=parseInt((curSeconds-curhours*3600)/60);
	var cseconds=curSeconds%60;

	if(nseconds!=cseconds){
		if(parseInt(curhours/10)!=parseInt(nexthours/10)){
			addBalls(margin_left,margin_top,parseInt(curhours/10));
		}
		if(parseInt(curhours%10)!=parseInt(nexthours%10)){
			addBalls(margin_left+15*(radius+1),margin_top,parseInt(curhours%10));
		}
		if(parseInt(curminutes/10)!=parseInt(nextminutes/10)){
			addBalls(margin_left+39*(radius+1),margin_top,parseInt(curminutes/10));
		}
		if(parseInt(curminutes%10)!=parseInt(nextminutes%10)){
			addBalls(margin_left+54*(radius+1),margin_top,parseInt(curminutes%10));
		}
		if(parseInt(cseconds/10)!=parseInt(nseconds/10)){
			addBalls(margin_left+78*(radius+1),margin_top,parseInt(cseconds/10));
		}
		if(parseInt(cseconds%10)!=parseInt(nseconds%10)){
			addBalls(margin_left+93*(radius+1),margin_top,parseInt(cseconds%10));
		}

		curSeconds=nextSeconds;//更换时间
	}
	updateballs();//更改小球的运动位置
	console.log(balls.length);

}
function updateballs(){//更新小球的位置 产生移动效果
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
		if(balls[i].y>=window_height-radius){
			balls[i].y=window_height-radius;
			balls[i].vy=-balls[i].vy*0.75;

		}
	}
	/**
	 * 判断小球是否在界内  如果在就保存在count数组内
	 */ 
	//方法一
/*	var count=0;
	for (var i=0; i<balls.length; i++) {
		if(balls[i].x+radius>0&&balls[i].x-radius<window_width){
			balls[count++]=balls[i];
		}
		
	}
	while(balls.length>count){
			balls.pop();
		}*/
	//方法二
	var count=[]//定义新一个数组
	for(var i=0;i<balls.length;i++){
		if(balls[i].x+radius>0&&balls[i].x-radius<window_width){
			count.push(balls[i]);
		}
	}
	balls=count;
	
}
function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
			var aball={
				x:x+j*2*(radius+1)+(radius+1), //生成小球的X轴坐标
				y:y+i*2*(radius+1)+(radius+1),//生成小球的Y轴坐标
				g:1.5+Math.random(),		//生成小球的加速度（1.5~2.5之间）
				vx:Math.pow(-1, Math.ceil(Math.random()*100))*6,//小球在X轴上的速度 （-4~4之间）Math.pow-1的多少次方
				vy:-5,
				colors:colors[Math.floor(Math.random()*colors.length)]//Math.floor下取整

			}
			balls.push(aball);//将小球添加到数组中去
		}
	     }
	
	}


}
function render(cxt){   //绘制函数
	cxt.clearRect(0,0,window_width,window_height);
	//数字的绘制 
	var hours=parseInt(curSeconds/3600);
	var minutes=parseInt((curSeconds-hours*3600)/60);
	var seconds=curSeconds%60;


	renderDigit(margin_left,margin_top,parseInt(hours/10),cxt);
	renderDigit(margin_left+15*(radius+1),margin_top,parseInt(hours%10),cxt);
	renderDigit(margin_left+30*(radius+1),margin_top,10,cxt);
	renderDigit(margin_left+39*(radius+1),margin_top,parseInt(minutes/10),cxt);
	renderDigit(margin_left+54*(radius+1),margin_top,parseInt(minutes%10),cxt);
	renderDigit(margin_left+69*(radius+1),margin_top,10,cxt);
	renderDigit(margin_left+78*(radius+1),margin_top,parseInt(seconds/10),cxt);
	renderDigit(margin_left+93*(radius+1),margin_top,parseInt(seconds%10),cxt);

	//小球的绘制
	for(var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].colors;

		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,radius,0,2*Math.PI,true);
		cxt.closePath();


		cxt.fill();
	}

}
function renderDigit(x,y,num,cxt){
	cxt.fillStyle="blue";
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI);
				cxt.closePath();

				cxt.fill();
			}
		}
	}

}