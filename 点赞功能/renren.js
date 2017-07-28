window.onload=function(){
	var  olist=document.getElementById("list");
	var  obox=olist.children;
	/**
	 * 删除节点函数
	 */
	function removeNode(node){
		node.parentNode.removeChild(node);//先向上找到父节点 再调用removechild方法 传入自己本身 进行删除
	}
	//点赞函数
	function praise(box,el){//box  指该分享所在的父元素容器 需要向上取三次父元素
		var praiseElement=box.getElementsByClassName("praises-total")[0];//取第0 个元素
		var lasttotal=parseInt(praiseElement.getAttribute("total"));//通过获取元素属性 取得上一次的total值
		var txt=el.innerHTML;  //获取触发元素的内容（赞 或者取消赞）
		var  newtotal;
		if(txt=="赞"){
			newtotal=lasttotal+1;
			praiseElement.innerHTML=(newtotal==1)?"我觉得很赞":"我和"+lasttotal+"个人觉得很赞";
			el.innerHTML="取消赞";

		}else{
			newtotal=lasttotal-1;
			praiseElement.innerHTML=(newtotal==0)?"  ":newtotal+"个人觉得很赞";
			el.innerHTML="赞";
		}
		praiseElement.setAttribute("total",newtotal);	//将更新后的点赞人数赋值给total
		praiseElement.style.display=(newtotal==0)?"none":"block";

	}
	//格式化日期函数
	function  formateDate(){
		var date=new Date();
		var y=date.getFullYear();
		var m=date.getMonth()+1;
		var d=date.getDate();
		var h=date.getHours();
		var mi=date.getMinutes();
		//若小于9 则在前面加0
		mi=mi<9? '0'+mi:mi;
		m=m<9? '0'+m:m;
		h=h<9? '0'+h:h;
		d=d<9? '0'+d:d;

		return y+"-"+m+"-"+d+"  "+ h+":"+mi;
	}
	//发评论
	function replay(box){
		  var  ocomment=box.getElementsByClassName("comment")[0];//获取到输入框
		  var  ocommentlist=box.getElementsByClassName("comment-list")[0];//获取到评论列表

		  var  commentBox=document.createElement("div");//创建一个新评论盒子
		  commentBox.className="comment-box clearfix";
		  commentBox.setAttribute("user","self");
		  commentBox.innerHTML='<img class="myhead" src="images/my.jpg" alt=""/>'+
		                     '<div class="comment-content">'+
		                     '<p class="comment-text"><span class="user">我：</span>'+ocomment.value+'</p>'+
		                      '<p class="comment-time">'+
		                      formateDate()+
		                      '<a href="javascript:;" class="comment-praise" total="0" my="0" style=""> 赞</a>'+
		                       '<a href="javascript:;" class="comment-operate">删除</a>'+
		                      '</p></div>';
		 ocommentlist.appendChild(commentBox);
		 ocomment.value="";
		 ocomment.onblur();

	}
	//操作评论函数
	function operationreply(el){
		var contentBox=el.parentNode.parentNode.parentNode;//获取评论容器
		var bbx=contentBox.parentNode.parentNode.parentNode;//获取整个分享的容器 
		var user=contentBox.getElementsByClassName("user")[0].innerHTML;
		var ocomment=bbx.getElementsByClassName("comment")[0];
		if(el.innerHTML=="回复"){
			ocomment.onfocus();
			ocomment.value="回复"+user;
			ocomment.onkeyup();
		}else{
			removeNode(contentBox);
		}

	}
	//回复点赞函数
	function commentpraise(el){
		var ltotal=parseInt(el.getAttribute("total"));
		var my=parseInt(el.getAttribute("my"));
		var ntotal;
		if(my==0){
			ntotal=ltotal+1;
			my=1;
			el.innerHTML=ntotal+"取消赞";
		}else{
			ntotal=ltotal-1;
			my=0;
			el.innerHTML=ntotal==0? "赞":ntotal +"赞";
		}
		el.setAttribute("total",ntotal);
		el.setAttribute("my",my);
		el.style.display=ntotal==0? "":"inline-block";
	}

	//给每个子元素加上事件代理
	for(var i=0;i<obox.length;i++){
		obox[i].onclick=function(e){
			e=e||window.event  //处理兼容性
			var el=e.srcElement||e.target;  //IE支持srcElement  Firefox 支持e.target   获取触发元素
			switch(el.className){
				case "close": removeNode(el.parentNode); //关闭分享
				break;
				case "praise":praise(el.parentNode.parentNode.parentNode,el); //点赞分享
				break;
				case "btn":replay(el.parentNode.parentNode.parentNode);//发评论
				break;
				case "comment-operate":operationreply(el);
				break;
				case "comment-praise":commentpraise(el);
				break;

			}
		}
			//输入框的实现
		        var  ocomment=obox[i].getElementsByClassName("comment")[0];
		        	ocomment.onfocus=function(){
		        	this.parentNode.className="text-box  text-box-on";
		        	  this.value = this.value == '评论…' ? '' : this.value;	        
		       	 }
		        ocomment.onblur=function(){
		        	if(this.value==""){
		        		this.parentNode.className="text-box ";
		        		this.value='评论…';
		        	    }
		        	
		    	}
		    ocomment.onkeyup=function(){//按键松开计算字数
		    	var len=this.value.length;
		    	var p=this.parentNode;//获得父元素
		    	var  btn=p.children[1];
		    	var word=p.children[2];
		    	if(len==0||len>140){
		    		btn.className="btn btn-off";
		    	}else{
		    		btn.className="btn";
		    	}
		    	word.innerHTML=len+"/140";
		    }

		
	}
	
}